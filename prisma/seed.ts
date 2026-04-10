import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Create a Company
  const company = await prisma.company.upsert({
    where: { id: "seed_comp_1" },
    update: {},
    create: {
      id: "seed_comp_1",
      name: "Acme CRM Corp",
    },
  });

  // 2. Create a User / SalesRep
  const user = await prisma.user.upsert({
    where: { email: "sales@acme.com" },
    update: {},
    create: {
      name: "John Salesman",
      email: "sales@acme.com",
      password: "password123",
      role: "sales_rep",
      company_id: company.id,
    },
  });

  const salesRep = await prisma.salesRep.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      company_id: company.id,
    },
  });

  // 3. Create some Contacts and Leads
  const contactsData = [
    { firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phone: "555-0101" },
    { firstName: "Bob", lastName: "Smith", email: "bob@example.com", phone: "555-0102" },
    { firstName: "Charlie", lastName: "Brown", email: "charlie@gmail.com", phone: "555-0103" },
    { firstName: "Diana", lastName: "Prince", email: "diana@amazon.com", phone: "555-0104" },
    { firstName: "Edward", lastName: "Norton", email: "edward@fightclub.com", phone: "555-0105" },
  ];

  for (const c of contactsData) {
    const contact = await prisma.contact.create({
      data: {
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phone: c.phone,
        company_id: company.id,
      },
    });

    await prisma.lead.create({
      data: {
        contact_id: contact.id,
        company_id: company.id,
        sales_rep_id: Math.random() > 0.5 ? salesRep.id : null,
        status: ["NEW", "CONTACTED", "QUALIFIED", "WON"][Math.floor(Math.random() * 4)] as any,
        source: ["Website", "Direct", "Webhook", "Ads"][Math.floor(Math.random() * 4)],
      },
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
