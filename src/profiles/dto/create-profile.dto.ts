import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Title of profile',
    example: 'astolfo',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Image URL of profile',
    
    example: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @ApiProperty({
    description: 'User`s id (UUID) profile`s owner',
    example: 'c1bb3e14-7fb1-4cf7-9afe-864143c419b1',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
