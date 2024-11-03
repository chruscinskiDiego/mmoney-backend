import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Category } from "./category";
import { BankAccount } from "./account";

@Entity()
export class Expenses {

    @PrimaryGeneratedColumn()
    id?:string;

    @Column({type: 'decimal'})
    value?: number;

    @Column({type: 'text'})
    obs?:string;

    @Column({type: 'date'})
    date?:Date;

    @ManyToOne(() => User)
    @JoinColumn()
    fk_user?:User;

    @ManyToOne(() => Category)
    @JoinColumn()
    fk_category?:Category;

    @ManyToOne(() => BankAccount)
    @JoinColumn()
    fk_bank_account?:BankAccount;

    constructor(value:number, obs:string, date:Date, user:User, category:Category, bankAccount:BankAccount){
        this.value = value;
        this.obs = obs;
        this.date = date;
        this.fk_user = user;
        this.fk_category = category;
        this.fk_bank_account = bankAccount;
    }
}