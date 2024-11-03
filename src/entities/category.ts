import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {


    @PrimaryGeneratedColumn()
    id?:string;

    @Column({type: 'text'})
    name?:string;

    constructor(name:string){
        this.name = name;
    }
}