import { EntityManager, Equal } from "typeorm";
import { Expenses } from "../entities/expenses";

export class ExpensesRepository{

    private manager: EntityManager;

    constructor (manager: EntityManager){
        this.manager = manager;
    }

    createExpense = async(expense:Expenses):Promise<Expenses> => {
        return this.manager.save(expense);
    }

    getExpenses = async():Promise<Expenses[]> => {
        return this.manager.find(Expenses);
    }

    getExpenseById = async(expenseId:string):Promise<Expenses | null> => {
        return this.manager.findOne(Expenses, {
            where:{
                id: expenseId
            },
            relations: ['fk_category', 'fk_bank_account']
        })
    }

    getExpensesByUser = async(expenseUser:string):Promise<Expenses[] | null> => {
        return this.manager.find(Expenses, {
            where: {
                fk_user: {id: Equal(expenseUser)}
            },
            relations: ['fk_category', 'fk_bank_account']
        })
    }

    updateExpense = async(expenseId:string, updatedData:Partial<Expenses>):Promise<Expenses | null> => {

        const expense = await this.getExpenseById(expenseId);

        if(!expense){
            return null;
        }

        Object.assign(expense, updatedData);

        return this.manager.save(expense);
    }


}