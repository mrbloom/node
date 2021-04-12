import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
  
  @IsString({ each: true })
  channels: string[];

  @IsString({ each: true })
  frequencies: string[];
}
