import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    || 'untitled'
}

// GET - Fetch single content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const content = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        type: true,
        heroImage: true,
        content: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    // Parse blocks from content JSON
    let blocks = []
    try {
      if (content.content) {
        const parsedContent = JSON.parse(content.content)
        blocks = parsedContent.blocks || []
      }
    } catch (e) {
      // If content is not JSON, ignore
    }

    return NextResponse.json({
      ...content,
      blocks,
      createdAt: content.createdAt.toISOString(),
      updatedAt: content.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new content
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params // We don't need id for POST, but await params anyway
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { type, title, heroImage, blocks, status } = body

    // Create content JSON from blocks
    const contentJSON = JSON.stringify({ blocks })

    // Generate slug from title
    const baseSlug = generateSlug(title || 'Untitled')
    let slug = baseSlug
    let counter = 1

    // Ensure slug is unique
    while (await prisma.article.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const article = await prisma.article.create({
      data: {
        title: title || 'Untitled',
        slug,
        type: type || 'standard',
        heroImage,
        content: contentJSON,
        status: status || 'draft',
        authorId: user.id,
      },
    })

    return NextResponse.json({
      id: article.id,
      message: 'Content created successfully',
    })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update existing content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, title, heroImage, blocks, status } = body

    // Create content JSON from blocks
    const contentJSON = JSON.stringify({ blocks })

    // Get current article to check if title changed
    const currentArticle = await prisma.article.findUnique({
      where: { id },
    })

    if (!currentArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Generate new slug if title changed
    let slug = currentArticle.slug
    if (title && title !== currentArticle.title) {
      const baseSlug = generateSlug(title)
      slug = baseSlug
      let counter = 1

      // Ensure slug is unique (excluding current article)
      while (true) {
        const existing = await prisma.article.findUnique({ where: { slug } })
        if (!existing || existing.id === id) break
        slug = `${baseSlug}-${counter}`
        counter++
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title: title || 'Untitled',
        slug,
        type: type || 'standard',
        heroImage,
        content: contentJSON,
        status: status || 'draft',
      },
    })

    return NextResponse.json({
      id: article.id,
      message: 'Content updated successfully',
    })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete content
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Content deleted successfully' })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
