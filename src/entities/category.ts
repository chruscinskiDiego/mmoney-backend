import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id?:string;

    @Column({type: 'text'})
    name?:string;

    @Column({type: 'text'})
    user?:string;

    constructor(name:string, user: string){
        this.name = name;
        this.user= user;
    }
}