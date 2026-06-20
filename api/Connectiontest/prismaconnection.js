const prisma = require('...@@client../config/prisma');

async function main() {
  try {
    await prisma.$connect();

    console.log('✅ Connected successfully');

    const result = await prisma.$queryRaw`SELECT NOW()`;

    console.log('Database Time:', result);

  } catch (error) {
    console.error('❌ Connection failed');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();