import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ type: 'text', nullable: false})
  firstName?: string;

  @Column({ type: 'text' })
  lastName?: string;

  @Column({type: 'text', nullable: false})
  email?:string;

  @Column({type: 'text', nullable: false})
  password?: string;

  @Column({type: 'boolean', nullable:true})
  isActive?: boolean;

  constructor(firstName:string, lastName: string, email: string, password: string, isActive: boolean){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }
}
