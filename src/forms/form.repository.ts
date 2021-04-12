import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { CreateFormDto } from "./dto/create-form.dto";
import { GetFormsFilterDto } from "./dto/get-forms-filter.dto";
import { Form } from "./form.entity";

@EntityRepository(Form)
export class FormRepository extends Repository<Form>{
    private logger = new Logger("FormRepository")

    async getForms(filterDto:GetFormsFilterDto,user:User):Promise<Form[]>{
        const { title, description, channels, frequencies, search } = filterDto;
        const query = this.createQueryBuilder('form')

        query.where('form.userId = :userId',{userId:user.id})

        if(title){
            query.andWhere("form.title = :title",{title})

        }

        if(search){
            query.andWhere("form.title LIKE :search OR form.description LIKE :search",{search:`%${search}%`})
        }

        if(channels){

        }

        if(frequencies){

        }
        try {
            const forms = await query.getMany()
            return forms
            
        } catch (error) {
            this.logger.error(`User ${user.username} can't take forms.DTO ${JSON.stringify(filterDto)}`,error.stack)
            throw new InternalServerErrorException()        
        }
    }

    async createForm(
            createFormDto: CreateFormDto,
            user:User)
        : Promise<Form> {
        const form = new Form();
        Object.assign(form,createFormDto)
        form.user = user
        try{
            await form.save()
        }catch(error){
            this.logger.error(`${user.username} can't save form ${JSON.stringify(createFormDto)}`,error.stack)
            throw new InternalServerErrorException()
        }

        delete form.user
        return form
      }

    deleteFormById(id: number): Promise<DeleteResult> {
        const deleted = this.delete(id)
        return deleted;
    }
}