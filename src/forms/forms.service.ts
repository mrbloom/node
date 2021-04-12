import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FormRepository } from 'src/forms/form.repository';
import { CreateFormDto } from './dto/create-form.dto';
import { GetFormsFilterDto } from './dto/get-forms-filter.dto';
import { Form } from './form.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FormRepository) 
    private formRepository:FormRepository
  ){}

  getForms(filterDto: GetFormsFilterDto,user:User){
    return this.formRepository.getForms(filterDto,user)
  }

  

  async createForm(createFormDto: CreateFormDto, user:User): Promise<Form> {
    return this.formRepository.createForm(createFormDto,user)
  }

  async getFormById(id:number,user:User):Promise<Form>{
    const found = await this.formRepository.findOne({where:{id,userId:user.id}})
    if (!found) {
        throw new NotFoundException(`Form with id = ${id}`);
    }
    return found;      
  }


  async deleteFormById(id: number,user:User): Promise<Form> {
    const found = await this.getFormById(id,user);
    if (found){
      const deleted = await this.formRepository.delete(id); //{"id":id,"userId":user.id});
      if(deleted.affected===0){
        throw new InternalServerErrorException(`Server cannot delete form with id ${id}`)
      }
      return found;
    }
  }

  async updateFormById(id:number, key:string, value,user:User): Promise<Form> {
    const findForm = await this.getFormById(id,user);
    findForm[key] = value;
    const form_update_result = await findForm.save();
    return findForm;
  }
}
