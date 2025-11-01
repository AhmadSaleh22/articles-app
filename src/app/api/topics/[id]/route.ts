import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/topics/[id] - Get a single topic with articles
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        articles: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(topic)
  } catch (error) {
    console.error('Error fetching topic:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topic' },
      { status: 500 }
    )
  }
}

// PUT /api/topics/[id] - Update a topic
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, icon, color, order } = body

    const topic = await prisma.topic.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(topic)
  } catch (error) {
    console.error('Error updating topic:', error)
    return NextResponse.json(
      { error: 'Failed to update topic' },
      { status: 500 }
    )
  }
}

// DELETE /api/topics/[id] - Delete a topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Delete the topic (articles will have topicId set to null due to onDelete: SetNull)
    await prisma.topic.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Topic deleted successfully' })
  } catch (error) {
    console.error('Error deleting topic:', error)
    return NextResponse.json(
      { error: 'Failed to delete topic' },
      { status: 500 }
    )
  }
}
