const { PrismaClient } = require('../src/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Test database connection first
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.log('💡 Make sure your DATABASE_URL is correct and the database is accessible')
    process.exit(1)
  }

  // Create 3 test users with different email domains
  const users = [
    {
      name: 'Admin User',
      email: 'admin@ireplyats.com',
      password: 'admin123'
    },
    {
      name: 'John Neil',
      email: 'john@example.com',
      password: 'password123'
    },
    {
      name: 'Jane Smith',
      email: 'jane@test.com',
      password: 'password123'
    }
  ]

  console.log('👥 Creating users...')
  
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    try {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          name: userData.name,
          email: userData.email,
          hashedPassword: hashedPassword,
        },
      })
      console.log(`✅ Created user: ${user.email}`)
    } catch (error) {
      console.log(`❌ Error creating user ${userData.email}:`, error.message)
      if (error.message.includes('relation "User" does not exist')) {
        console.log('💡 Database tables not found. Run "npx prisma db push" first.')
      }
    }
  }

  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Test Login Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  users.forEach(user => {
    console.log(`Email: ${user.email}`)
    console.log(`Password: ${user.password}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  })
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 