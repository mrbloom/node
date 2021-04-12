import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('text', { array: true })
    channels: string[];//string[];

    @Column('text', { array: true })
    frequencies: string[]; //number[];

    @ManyToOne(type=>User,user=>user.forms,{eager:false})
    user:User;

    @Column()
    userId:number;
}