import { IsIn, IsOptional, IsString } from "class-validator";
import { channels } from "../form.enums";

export class GetFormsFilterDto{
    @IsOptional()
    id: string;

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsIn(Object.values(channels))
    @IsString({ each: true })
    channels: string[];

    @IsOptional()
    @IsString({ each: true })
    frequencies: string[];

    @IsOptional()
    search:string;
}
// export class GetFormsFilterDto {
//   search: string;
// }
