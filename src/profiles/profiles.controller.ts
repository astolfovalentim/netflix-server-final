import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedUser } from 'src/utils/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { addMovieDto } from './dto/add-movie.dto';
import { UpdateProfileMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({
    summary: 'Create a Profile',
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @LoggedUser() user: User) {
    createProfileDto.userId = user.id;
    return this.profilesService.create(createProfileDto);
  }

  @ApiOperation({
    summary: 'Get a list of all Profiles from the database',
  })
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Profile by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a movie on my profile',
  })
  @Patch('/updateMovie')
  updateMovie(@Body() updateMovie: UpdateProfileMovieDto) {
    return this.profilesService.updateMovie(updateMovie);
  }

  @ApiOperation({
    summary: 'Use to update partial or total a Profile by ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @ApiOperation({
    summary: 'Remove a Profile by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }

  @ApiOperation({
    summary: 'Add a movie/s to my profile',
  })
  @Post('/addMovie')
  addMovie(@Body() addMovie: addMovieDto) {
    return this.profilesService.addMovie(addMovie);
  }

  @ApiOperation({
    summary: 'Get a list of all movies with a profile ID',
  })
  @Get('/listMovies/:id')
  listMovies(@Param('id') id: string) {
    return this.profilesService.listMovies(id);
  }

  @ApiOperation({
    summary: 'delete a movie from a profile  with an ID',
  })
  @Delete('/DeleteMovie/:id')
  deleteMovie(@Param('id') id: string) {
    return this.profilesService.deleteMovie(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
