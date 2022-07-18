import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Name for the movie',
    example: 'Speed',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Cover image URL of the movie',
    example:
      'https://upload.wikimedia.org/wikipedia/pt/d/db/Speed_poster_promocional.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  coverImageURL: string;

  @ApiProperty({
    description: 'Description of the movie history',
    example:
      'O filme segue a história de Jack, um policial que tenta a todo custo desarmar uma bomba em um ônibus urbano com passageiros preparada por um terrorista; o veículo deve permanecer em movimento pois se o ônibus atingir uma velocidade abaixo de 80 km/h, ele irá explodir.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Release year (just numbers YYYY)',
    example: '1994',
  })
  @Min(1900)
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Rated score 0 - 10',
    example: '7',
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  @IsNotEmpty()
  imdbScore?: number;

  @ApiProperty({
    description: 'Trailer URL of the movie on YOUTUBE',
    example: 'https://www.youtube.com/watch?v=8piqd2BWeGI',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Matches(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/,
    {
      message: 'the link must be a valid youtube link',
    },
  )
  trailerYouTubeUrl: string;

  @ApiProperty({
    description: 'Movie review URL of the movie on YOUTUBE',
    example: 'https://www.youtube.com/watch?v=mOKn_4El_p0&feature=emb_logo',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Matches(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/,
    {
      message: 'the link must be a valid youtube link',
    },
  )
  moviereviewYouTubeUrl: string;

  @IsUUID('all', { each: true })
  @IsOptional()
  genres?: string[];
}
