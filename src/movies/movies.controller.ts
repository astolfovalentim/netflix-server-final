import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/utils/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { deleteGenreDTO } from './dto/delete-genre.dto';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
    summary: 'Create a Movie',
  })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @LoggedUser() user: User) {
    return this.moviesService.create(createMovieDto, user);
  }

  @ApiOperation({
    summary: 'Get a list of all Movies from the database',
  })
  @Get(':skip')
  findAll(@Param('skip') skip: number) {
    return this.moviesService.findAll(+skip);
  }

  @ApiOperation({
    summary: 'Get a list of all favorite Movies from Profile on database',
  })
  @Get('/favorites/:id')
  findAllFavorites(@Param('id') id: string) {
    return this.moviesService.findAllFavorites(id);
  }

  @ApiOperation({
    summary: 'Get a Movie by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({
    summary: 'get a movie',
  })
  @Get('/imdbUpdate/:id')
  imdbUpdate(@Param('id') id: string) {
    return this.moviesService.imdbUpdate(id);
  }

  @ApiOperation({
    summary: 'Use to update partial or total a Movie by ID',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @LoggedUser() user: User,
  ) {
    return this.moviesService.update(id, updateMovieDto, user);
  }

  @ApiOperation({
    summary: 'Remove genres by IDs',
  })
  @Delete('/deleteGenre/')
  removeGenre(@Body() deleteGenreDTO: deleteGenreDTO) {
    return this.moviesService.removeGenre(deleteGenreDTO);
  }

  @ApiOperation({
    summary: 'Remove a Movie by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.moviesService.remove(id, user);
  }
}
