import { Prisma, PrismaClient } from '@prisma/client';

export const profiles: Prisma.ProfileCreateInput[] = [
  {
    title: 'astolfo',
    imageURL: 'https://avatars.githubusercontent.com/u/97894808?v=4',
    user: {
      connect: {
        email: 'astolfo@blue.com.br',
      },
    },
  },
  {
    title: 'astolfo2',
    imageURL: 'https://avatars.githubusercontent.com/u/97894808?v=4',
    user: {
      connect: {
        email: 'astolfo2@blue.com.br',
      },
    },
  },
  {
    title: 'astolfo3',
    imageURL: 'https://avatars.githubusercontent.com/u/97894808?v=4',
    user: {
      connect: {
        email: 'astolfo3@blue.com.br',
      },
    },
  },
  {
    title: 'astolfo4',
    imageURL: 'https://avatars.githubusercontent.com/u/97894808?v=4',
    user: {
      connect: {
        email: 'astolfo4@blue.com.br',
      },
    },
  },
  {
    title: 'astolfo5',
    imageURL: 'https://avatars.githubusercontent.com/u/97894808?v=4',
    user: {
      connect: {
        email: 'astolfo5@blue.com.br',
      },
    },
  },
];

export const profile = async (prisma: PrismaClient) => {
  for (const obj of Object.values(profiles)) {
    await prisma.profile.upsert({
      where: { title: obj.title },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
