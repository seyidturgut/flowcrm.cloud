import prisma from "./prisma";

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({
    where: { id }
  });
}

export async function verifyUser(email: string, password: string) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = await prisma.user.findUnique({
    where: { email },
    include: { company: true }
  });

  if (!user || user.password !== password) {
    return null;
  }

  if (user.company && !user.company.isActive && !user.isGlobalAdmin) {
    return { error: "Hesabınız askıya alınmıştır. Lütfen sistem yöneticisiyle iletişime geçin." };
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isGlobalAdmin: user.isGlobalAdmin,
    companyId: user.company_id,
  };
}
