import { Genre } from '@prisma/client';

export class Movie {
  id?: string;
  title: string;
  coverImageURL: string;
  description: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  moviereviewYouTubeUrl: string;
  genres?: Genre[];
  createdAt?: Date;
  updatedAt?: Date;
}
