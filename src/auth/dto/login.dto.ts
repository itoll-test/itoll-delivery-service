import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'business',
    description: 'username',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    example: 'itoll',
    description: 'password',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  constructor(partial: Partial<LoginDto>) {
    Object.assign(this, partial);
  }
}
