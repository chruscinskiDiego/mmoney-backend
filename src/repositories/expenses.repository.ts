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

    getExpensesCategoriesResumeByUser = async (expenseUser: number): Promise<any[]> => {

        return this.manager.query(
            `
            SELECT 
                c.name AS category, 
                SUM(COALESCE(e.value, 0)) AS total
            FROM 
                expenses e
            INNER JOIN 
                CATEGORY c 
            ON 
                e.fkCategoryId = c.id
            WHERE 
                e.fkUserId = ?
            GROUP BY 
                c.name
            `,
            [expenseUser] // Parâmetro seguro para o ID do usuário
        );
    };

    getExpensesResumeInYearByUser = async (expenseUser: number): Promise<any[]> => {
        return this.manager.query(
            `
            SELECT 
                CASE strftime('%m', e.date)
                    WHEN '01' THEN 'Janeiro'
                    WHEN '02' THEN 'Fevereiro'
                    WHEN '03' THEN 'Março'
                    WHEN '04' THEN 'Abril'
                    WHEN '05' THEN 'Maio'
                    WHEN '06' THEN 'Junho'
                    WHEN '07' THEN 'Julho'
                    WHEN '08' THEN 'Agosto'
                    WHEN '09' THEN 'Setembro'
                    WHEN '10' THEN 'Outubro'
                    WHEN '11' THEN 'Novembro'
                    WHEN '12' THEN 'Dezembro'
                END AS name,
                SUM(COALESCE(e.value, 0)) AS pv
            FROM 
                expenses e
            WHERE 
                e.fkUserId = ? AND strftime('%Y', e.date) = strftime('%Y', 'now')
            GROUP BY 
                strftime('%m', e.date)
            ORDER BY 
                strftime('%m', e.date)
            `,
            [expenseUser]
        );
    };
    

    updateExpense = async(expenseId:string, updatedData:Partial<Expenses>):Promise<Expenses | null> => {

        const expense = await this.getExpenseById(expenseId);

        if(!expense){
            return null;
        }

        Object.assign(expense, updatedData);

        return this.manager.save(expense);
    }

    deleteExpense = async(expenseId:string) => { 

        const expense = await this.getExpenseById(expenseId);

        if(!expense){
            return null;
        }

        return await this.manager.remove(expense);
    }

}