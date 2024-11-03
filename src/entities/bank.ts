import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {


    @PrimaryGeneratedColumn()
    id?: string;

    @Column({type: 'text'})
    name?: string;

    @Column({type: 'text'})
    code?: string;

    constructor(name:string, code:string){
        
        this.name = name;
        this.code = code;

    }
}