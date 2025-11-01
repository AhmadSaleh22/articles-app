import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/topics - List all topics with their articles
export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        articles: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(topics)
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    )
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, icon, color } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Topic name is required' },
        { status: 400 }
      )
    }

    // Get the highest order value
    const lastTopic = await prisma.topic.findFirst({
      orderBy: { order: 'desc' },
    })

    const topic = await prisma.topic.create({
      data: {
        name,
        icon: icon || '📁',
        color: color || '#3b82f6',
        order: (lastTopic?.order || 0) + 1,
      },
    })

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    console.error('Error creating topic:', error)
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    )
  }
}
