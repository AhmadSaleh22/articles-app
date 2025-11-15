import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  console.log('Starting migration for OpenCall and Trip models...')

  // Check and update OpenCall records
  const openCalls = await prisma.openCall.findMany()
  console.log(`Found ${openCalls.length} OpenCall records`)

  for (const openCall of openCalls) {
    const slug = slugify(openCall.title)
    let uniqueSlug = slug
    let counter = 1

    // Ensure slug is unique
    while (await prisma.openCall.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    await prisma.openCall.update({
      where: { id: openCall.id },
      data: {
        slug: uniqueSlug,
        status: 'published',
        publishedAt: openCall.createdAt,
      },
    })
    console.log(`Updated OpenCall: ${openCall.title} -> ${uniqueSlug}`)
  }

  // Check and update Trip records (they already have slugs, just need to add status)
  const trips = await prisma.trip.findMany()
  console.log(`Found ${trips.length} Trip records`)

  for (const trip of trips) {
    await prisma.trip.update({
      where: { id: trip.id },
      data: {
        status: 'published',
        publishedAt: trip.publishedAt || trip.createdAt,
        heroImage: trip.coverImage, // Copy coverImage to heroImage
      },
    })
    console.log(`Updated Trip: ${trip.title}`)
  }

  console.log('Migration completed successfully!')
}

main()
  .catch((e) => {
    console.error('Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
