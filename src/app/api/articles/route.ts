import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const articles = await prisma.article.findMany({
      where: status ? { status } : undefined,
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create a new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, coverImage, status, topicId } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Get the highest order value for this topic
    const lastArticle = await prisma.article.findFirst({
      where: { topicId: topicId || null },
      orderBy: { order: 'desc' },
    })

    const article = await prisma.article.create({
      data: {
        title,
        content: content || '{}',
        coverImage,
        status: status || 'draft',
        topicId: topicId || null,
        order: (lastArticle?.order || 0) + 1,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
