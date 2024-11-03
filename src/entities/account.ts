import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Bank } from "./bank";

@Entity()
export class BankAccount {

    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: 'text' })
    number?: string;

    @Column({ type: 'text' })
    type?: string;

    @ManyToOne(() => User) // Define o relacionamento com a entidade User
    @JoinColumn() // JoinColumn é necessário no lado "dono" da relação OneToOne
    fk_user?: User;

    @ManyToOne(() => Bank)
    @JoinColumn()
    fk_bank?:Bank;

    constructor(number: string, type: string, user: User, bank: Bank) {
        this.number = number;
        this.type = type;
        this.fk_user = user;
        this.fk_bank = bank;
    }
}
