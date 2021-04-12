import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Form } from "src/forms/form.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column()
    salt:string;    

    @Column()
    group:string;

    @OneToMany(type=>Form, form => form.user, {eager:true})
    forms:Form[];

    async validatePassword(password:string):Promise<boolean>{
        const hashedPassword = await bcrypt.hash(password,this.salt)
        return this.password === hashedPassword
    }
}