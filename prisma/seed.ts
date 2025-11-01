import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample project types
  const projectTypes = [
    {
      name: 'Web Development',
      description: 'Full-stack web applications, frontend, backend, and APIs',
      order: 1,
    },
    {
      name: 'Mobile App Development',
      description: 'iOS, Android, React Native, Flutter applications',
      order: 2,
    },
    {
      name: 'UI/UX Design',
      description: 'User interface design, user experience research, prototyping',
      order: 3,
    },
    {
      name: 'DevOps & Infrastructure',
      description: 'Cloud infrastructure, CI/CD, Docker, Kubernetes',
      order: 4,
    },
    {
      name: 'Data Science & AI',
      description: 'Machine learning, data analysis, artificial intelligence projects',
      order: 5,
    },
    {
      name: 'Content Writing',
      description: 'Technical writing, documentation, blog posts, articles',
      order: 6,
    },
    {
      name: 'Digital Marketing',
      description: 'SEO, social media marketing, content marketing campaigns',
      order: 7,
    },
    {
      name: 'Quality Assurance',
      description: 'Testing, automation, QA processes, bug tracking',
      order: 8,
    },
  ]

  for (const type of projectTypes) {
    const created = await prisma.projectType.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    })
    console.log(`✓ Created project type: ${created.name}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
