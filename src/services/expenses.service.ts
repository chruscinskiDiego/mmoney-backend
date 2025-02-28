import { date } from "zod";
import { AppDataSource } from "../database";
import { Expenses } from "../entities/expenses";
import { User } from "../entities/user";
import { BankAccountRepository } from "../repositories/account.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { ExpensesRepository } from "../repositories/expenses.repository";
import { UserRepository } from "../repositories/user.repository";

export class ExpensesService {


    userRepository: UserRepository;
    categoryRepository: CategoryRepository;
    expensesRepository: ExpensesRepository;
    bankAccountRepository: BankAccountRepository;

    constructor(
        expensesRepository = new ExpensesRepository(AppDataSource.manager),
        userRepository = new UserRepository(AppDataSource.manager),
        categoryRepository = new CategoryRepository(AppDataSource.manager),
        bankAccountRepository = new BankAccountRepository(AppDataSource.manager)
    ) {
        this.expensesRepository = expensesRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.bankAccountRepository = bankAccountRepository;
    }

    createExpense = async (value: number, situation: string, obs: string, date: Date, userEmail: string, categoryId: string, bankAccountId: string): Promise<Expenses> => {

        try {

            const userId = await this.userRepository.getUserIdByEmail(userEmail);

            if(!userId){
                throw new Error('Usuário não encontrado.');
            }
            
            const user = await this.userRepository.getUserById(userId);
            const category = await this.categoryRepository.getCategoryById(categoryId);
            const bankAccount = await this.bankAccountRepository.getAccountById(bankAccountId);


            if (!user) {
                throw new Error('Usuário não cadastrado no sistema!');
            }
            if (!category) {
                throw new Error('Categoria não cadastrada no sistema!');
            }
            if (!bankAccount) {
                throw new Error('Banco não registrado no sistema!');
            }

            const expense = new Expenses(value, situation, obs, date, user, category, bankAccount);

            return await this.expensesRepository.createExpense(expense);


        }
        catch (error) {
            throw new Error('Não foi possível criar a Despesa');
        }
    }

    getExpenses = async (): Promise<Expenses[] | null> => {

        return await this.expensesRepository.getExpenses();
    }

    getExpenseById = async (id: string): Promise<Expenses | null> => {

        try {
            const expense = await this.expensesRepository.getExpenseById(id);

            if(!expense){
                return null;
            }

            const expenseDTO = {
                id: expense.id,
                situation: expense.situation,
                value: expense.value,
                obs: expense.obs,
                date: expense.date,
                category: expense.fk_category,
                bank_account: expense.fk_bank_account,
            }

            return expenseDTO;
        }
        catch (error) {
            throw new Error('Não foi possível buscar a Despesa');
        }

    }

    getExpenseByUser = async (userEmail: string): Promise<Expenses[] | null> => {
        try {

            const userId = await this.userRepository.getUserIdByEmail(userEmail);

            if (!userId) {
                throw new Error('Usuário não encontrado.');
            }

            const expenses = await this.expensesRepository.getExpensesByUser(userId);
    
            if (!expenses || expenses.length === 0) {
                return null;
            }
            
            const expensesDTO = expenses.map(expense => ({
                id: expense.id,
                situation: expense.situation,
                value: expense.value,
                obs: expense.obs,
                date: expense.date,
                category: expense.fk_category,
                bank_account: expense.fk_bank_account,
            }));
    
            return expensesDTO;
        } catch (error) {
            throw new Error('Não foi possível buscar as Despesas');
        }
    }

    getExpensesCategoriesResumeByUser = async (userEmail: string): Promise<any[]> => {

        try {

            const userId = await this.userRepository.getUserIdByEmail(userEmail);


            if (!userId) {
                throw new Error('Usuário não encontrado.');
            }

            return await this.expensesRepository.getExpensesCategoriesResumeByUser(parseInt(userId));

        } catch (error) {
            throw new Error('Não foi possível buscar as Despesas');
        }
    }

    getExpensesResumeInYearByUser = async (userEmail:string): Promise<any[]> => {

        try {

            const userId = await this.userRepository.getUserIdByEmail(userEmail);

            if (!userId) {
                throw new Error('Usuário não encontrado.');
            }

            return await this.expensesRepository.getExpensesResumeInYearByUser(parseInt(userId));

        }
        catch (error) {
            throw new Error('Não foi possível buscar as Despesas');
        }
    }
    

    updateExpense = async (expenseId: string, updatedData: Partial<Expenses>): Promise<Expenses | string> => {

        try {

            const updatedExpense = await this.expensesRepository.updateExpense(expenseId, updatedData);

            if (!updatedExpense) {
                throw new Error('Despesa não encontrada.');
            }

            const expenseDTO = {
                id: updatedExpense.id,
                value: updatedExpense.value,
                situation: updatedExpense.situation,
                obs: updatedExpense.obs,
                date: updatedExpense.date,
                category: updatedExpense.fk_category,
                bank_account: updatedExpense.fk_bank_account,
            }

            return expenseDTO;
        } catch (error) {
            throw new Error('Ocorreu um erro ao tentar atualizar a despesa.');
        }

    }

    deleteExpense = async (expenseId: string): Promise<Expenses | null> => {
        
        try {

            return await this.expensesRepository.deleteExpense(expenseId);

        } catch (error) {
            throw new Error('Ocorreu um erro ao tentar deletar a despesa.');
        }

    }
}