import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Rate limit: 20 uploads per 15 minutes per user
const RATE_LIMIT_CONFIG = {
  maxRequests: 20,
  windowMs: 15 * 60 * 1000, // 15 minutes
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to upload files.' },
        { status: 401 }
      )
    }

    // Check rate limit (per user)
    const rateLimitKey = `upload:${session.user.id}`
    const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG)

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime)
      return NextResponse.json(
        {
          error: 'Too many uploads. Please try again later.',
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 413 }
      )
    }

    // Validate file type (SVG removed for security)
    const validTypes = {
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/webm', 'video/ogg'],
      audio: ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/webm']
    }

    let mediaType = 'other'
    for (const [type, mimes] of Object.entries(validTypes)) {
      if (mimes.includes(file.type)) {
        mediaType = type
        break
      }
    }

    // Create uploads directory outside public (more secure)
    const uploadsDir = join(process.cwd(), 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = join(uploadsDir, filename)

    // Write file
    await writeFile(filepath, buffer)

    // Save to database with user tracking
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        filepath: filename, // Store only filename, not full path
        mimetype: file.type,
        size: file.size,
        type: mediaType,
        userId: session.user.id,
      },
    })

    // Return media ID to be used with secure serving endpoint
    return NextResponse.json(
      {
        id: media.id,
        url: `/api/media/${media.id}`, // Use secure serving endpoint
        filename: file.name,
        type: mediaType,
        mimetype: file.type,
        size: file.size,
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// GET /api/upload - List all uploaded media (authenticated)
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to view media.' },
        { status: 401 }
      )
    }

    // Users can only see their own uploads, admins can see all
    const whereClause = session.user.role === 'admin'
      ? {}
      : { userId: session.user.id }

    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
