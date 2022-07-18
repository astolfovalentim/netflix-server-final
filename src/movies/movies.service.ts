import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { isAdmin } from 'src/utils/handle-admin.util';
import { handleError } from 'src/utils/handle-error.util';
import { CreateMovieDto } from './dto/create-movie.dto';
import { deleteGenreDTO } from './dto/delete-genre.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMovieDto, user: User) {
    isAdmin(user);
    const data: Prisma.MovieCreateInput = {
      ...dto,
      genres: {
        connect: dto.genres?.map((genresID) => ({
          id: genresID,
        })),
      },
    };

    return this.prisma.movie.create({ data }).catch(handleError);
  }

  async findAll(skip: number) {
    const MovieList = await this.prisma.movie.findMany({
      skip: skip,
      take: 10,
      select: {
        id: true,
        title: true,
        coverImageURL: true,
        description: true,
        year: true,
        genres: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    if (MovieList.length == 0) {
      return { message: 'nenhum filme cadastrado' };
    } else {
      return MovieList;
    }
  }
  findAllFavorites(id: string) {
    return this.prisma.profileMovie.findMany({
      where: { profileId: id, favorite: true },
      select: {
        id: true,
        movie: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: string, dto: UpdateMovieDto, user: User) {
    isAdmin(user);
    return this.prisma.movie
      .update({
        where: { id },
        data: {
          ...dto,
          genres: {
            connect: dto.genres?.map((genresID) => ({
              id: genresID,
            })),
          },
        },
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.movie.delete({ where: { id } }).catch(handleError);
    return { message: 'Movie successfully deleted' };
  }

  async imdbUpdate(id: string) {
    let imdbScore = 0;

    const movie = await this.prisma.movie
      .findUnique({ where: { id: id } })
      .catch(handleError);

    const movies = await this.prisma.profileMovie.findMany({
      where: { movieId: id },
    });

    movies.forEach((g) => {
      imdbScore += g.imdbScore;
    });
    imdbScore = imdbScore / movies.length;

    movie.imdbScore = +imdbScore.toFixed(2);
    return this.prisma.movie.update({
      where: { id: movie.id },
      data: movie,
    });
  }
  removeGenre(deleteGenreDTO: deleteGenreDTO) {
    return this.prisma.movie.update({
      where: {
        id: deleteGenreDTO.id,
      },
      data: {
        genres: {
          disconnect: deleteGenreDTO.genres.map((genresID) => ({
            id: genresID,
          })),
        },
      },
    });
  }
}
