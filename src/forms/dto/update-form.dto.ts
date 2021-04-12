import { IsString } from "class-validator";

export class UpdateFormDto {
  @IsString({ each: true })
  channels: string[];

  @IsString({ each: true })
  frequencies: string[];
}