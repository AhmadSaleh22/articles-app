import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrate() {
  try {
    // Get the article with type open_call
    const article = await prisma.article.findUnique({
      where: { id: 'e2ab74cf-147d-4de1-bf0a-d53f5b0ae39a' }
    })

    if (!article) {
      console.log('Article not found')
      return
    }

    console.log('Found article:', article.title)

    // Create in OpenCall table
    const openCall = await prisma.openCall.create({
      data: {
        id: article.id, // Keep same ID
        title: article.title,
        slug: article.slug,
        description: article.title,
        content: article.content,
        heroImage: article.heroImage,
        status: article.status,
        publishedAt: article.publishedAt || new Date(),
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      }
    })

    console.log('Created open call:', openCall.title)

    // Delete from Article table
    await prisma.article.delete({
      where: { id: article.id }
    })

    console.log('Deleted from Article table')
    console.log('✅ Migration complete!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrate()
