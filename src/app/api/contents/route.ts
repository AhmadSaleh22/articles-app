import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch all published content
    const contents = await prisma.article.findMany({
      where: { status: 'published' },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      contents: contents.map((content) => ({
        id: content.id,
        title: content.title,
        slug: content.slug,
        type: content.type,
        heroImage: content.heroImage,
        createdAt: content.createdAt.toISOString(),
        author: {
          name: `${content.author.firstName} ${content.author.lastName}`.trim() || 'Anonymous',
        },
      })),
    })
  } catch (error) {
    console.error('Error fetching published contents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
