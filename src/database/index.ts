import { DataSource } from "typeorm";
import "reflect-metadata"
import { User } from "../entities/user";
import { BankAccount } from "../entities/account";
import { Bank } from "../entities/bank";
import { Category } from "../entities/category";
import { Expenses } from "../entities/expenses";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, BankAccount, Bank, Category, Expenses],
    migrations:[
        "./src/database/migrations"
    ],
    subscribers: []
})

