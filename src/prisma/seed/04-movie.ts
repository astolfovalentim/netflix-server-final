import { Prisma, PrismaClient } from '@prisma/client';

export const movies: Prisma.MovieCreateInput[] = [
  {
    title: 'The Batman',
    coverImageURL:
      'https://upload.wikimedia.org/wikipedia/pt/3/38/The_Batman_poster.jpg',
    description:
      'Batman ventures into Gotham City underworld when a sadistic killer leaves behind a trail of cryptic clues.',
    moviereviewYouTubeUrl: 'https://www.youtube.com/watch?v=KwBtwTBcmcU',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=rsQEor4y2hg',
    year: 2022,
    genres: {
      connect: [
        {
          name: 'Drama',
        },
        {
          name: 'Action',
        },
      ],
    },
  },
  {
    title: 'The Godfather',
    coverImageURL:
      'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7d2081c07a6afa338191e68c73e1959f7761b53cf9b691d59926aa0ef89874e5._RI_V_TTW_.jpg',
    description:
      'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    moviereviewYouTubeUrl: 'https://www.youtube.com/watch?v=MjA69Yxz_Rk',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=UaVTIH8mujA',
    year: 1972,
    genres: {
      connect: [
        {
          name: 'Drama',
        },
        {
          name: 'Action',
        },
      ],
    },
  },
  {
    title: 'Spider-Man: No Way Home',
    coverImageURL:
      'https://upload.wikimedia.org/wikipedia/pt/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/250px-Spider-Man_No_Way_Home_poster.jpg',
    description:
      'Com a identidade do Homem-Aranha revelada, Peter pede ajuda ao Doutor Strange.',
    moviereviewYouTubeUrl: 'https://www.youtube.com/watch?v=Pu6cA2nueWg',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=CyiiEJRZjSU',
    year: 2022,
    genres: {
      connect: [
        {
          name: 'Adventure',
        },
        {
          name: 'Fantasy',
        },
      ],
    },
  },
];

export const movie = async (prisma: PrismaClient) => {
  for (const obj of Object.values(movies)) {
    await prisma.movie.upsert({
      where: { title: obj.title },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
