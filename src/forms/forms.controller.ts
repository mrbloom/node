import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { channels } from './form.enums';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { GetFormsFilterDto } from './dto/get-forms-filter.dto';
import { ChannelsValidation, FormFrequenciesValidation } from './pipes/form-valiation.pipe';
import { Form } from './form.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('forms')
@UseGuards(AuthGuard())
export class FormsController {
  private logger = new Logger('FormsController')
  constructor(private formsService: FormsService) {}

  @Get()
  getForms(
    @Query(ValidationPipe) filterDto: GetFormsFilterDto,
    @GetUser() user:User)
  :Promise<Form[]>{
    this.logger.verbose( `User witn name ${user.username} get all forms. Filter : ${JSON.stringify(filterDto)}`)
    return this.formsService.getForms(filterDto,user)
  }

  @Get('/:id')
  getFormById(
    @Param('id',ParseIntPipe)  id:number,
    @GetUser() user:User
  ): Promise<Form> {
    return this.formsService.getFormById(id,user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createForm(
    @Body() createFormDto: CreateFormDto,
    @GetUser() user:User
  ): Promise<Form> {
    this.logger.verbose(`User ${user.username} is creating form ${JSON.stringify(createFormDto)} `)
    return this.formsService.createForm(createFormDto,user);
  }

  @Delete('/:id')
    deleteFormById(@Param('id',ParseIntPipe) id: number,
    @GetUser() user:User)
  : Promise<Form> {
    return this.formsService.deleteFormById(id,user);
  }

  @Patch('/:id')
  async updateFormById(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateFormDto: UpdateFormDto,
    @GetUser() user:User,
  ):Promise<Form> {
    const {channels,frequencies} = updateFormDto
    
    let newForm:Form;

    if(channels) {
      const checkedChannels = (new ChannelsValidation()).transform(channels)
      newForm = await this.formsService.updateFormById(id, "channels", checkedChannels,user);
    }

    if(frequencies){
      const checkedFrequencies = (new FormFrequenciesValidation()).transform(frequencies)
      newForm = await this.formsService.updateFormById(id, "frequencies", checkedFrequencies,user);
    }
    
    return newForm
  }


}
