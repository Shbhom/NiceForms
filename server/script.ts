import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const newForm = await prisma.form.create({
    data: {
      name: "form 1",
      description: "testing prisma client",
    },
  });
  const allForms = await prisma.form.findMany();
  console.log(allForms);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
