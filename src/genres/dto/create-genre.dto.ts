import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre of the movie',
    example: 'Action',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
