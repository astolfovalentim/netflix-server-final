import { Injectable } from '@nestjs/common';
import { Prisma, ProfileMovie } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { addMovieDto } from './dto/add-movie.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileMovieDto } from './dto/update-movie.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: dto.title,
      imageURL: dto.imageURL,
      user: {
        connect: {
          id: dto.userId,
        },
      },
    };
    return this.prisma.profile.create({ data }).catch(handleError);
  }

  async findAll() {
    const ProfileList = await this.prisma.profile.findMany();
    if (ProfileList.length == 0) {
      return { message: 'nenhum perfil cadastrado' };
    } else {
      return ProfileList;
    }
  }

  findOne(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  update(id: string, dto: UpdateProfileDto) {
    const data: Partial<Profile> = { ...dto };
    return this.prisma.profile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string) {
    await this.prisma.profile.delete({ where: { id } });
    return { message: 'Profile successfully deleted' };
  }

  addMovie(addMovie: addMovieDto) {
    const transactions = addMovie.movies.map((movie) =>
      this.prisma.profileMovie.create({
        data: {
          profile: {
            connect: {
              id: addMovie.profile,
            },
          },
          movie: { connect: { id: movie.id } },
          favorite: movie.fav,
          imdbScore: movie.imdb,
        },
      }),
    );
    return this.prisma.$transaction(transactions);
  }

  listMovies(id: string) {
    return this.prisma.profileMovie
      .findMany({
        where: { profileId: id },
        select: {
          id: true,
          favorite: true,
          imdbScore: true,
          movie: {
            select: {
              id: true,
              title: true,
              coverImageURL: true,
              description: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  updateMovie(updateMovie: UpdateProfileMovieDto) {
    const data: Partial<ProfileMovie> = { ...updateMovie };
    return this.prisma.profileMovie
      .update({
        where: {
          profileId_movieId: {
            movieId: updateMovie.movieId,
            profileId: updateMovie.profileId,
          },
        },
        data,
      })
      .catch(handleError);
  }

  async deleteMovie(id: string) {
    await this.prisma.profileMovie.delete({ where: { id } });
    return { message: 'A movie was removed from profile sucessfully' };
  }
}
