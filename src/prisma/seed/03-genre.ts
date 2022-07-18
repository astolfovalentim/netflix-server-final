import { Prisma, PrismaClient } from '@prisma/client';

export const genres: Prisma.GenreCreateInput[] = [
  {
    name: 'Action',
  },
  {
    name: 'Comedy',
  },
  {
    name: 'Drama',
  },
  {
    name: 'Fantasy',
  },
  {
    name: 'Romance',
  },
  {
    name: 'Thriller',
  },
];

export const genre = async (prisma: PrismaClient) => {
  for (const obj of Object.values(genres)) {
    await prisma.genre.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
