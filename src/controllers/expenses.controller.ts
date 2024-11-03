import { Request } from "express";
import { ExpensesService } from "../services/expenses.service";
import { expensesSchema } from "../schemas/expenses.schema";

export class ExpensesController {

    expensesService: ExpensesService;

    constructor(
        expensesService = new ExpensesService()
    ) {
        this.expensesService = expensesService;
    }

    createExpense = async (req: Request, res: any) => {

        try {

            const expense = expensesSchema.parse(req.body);

            await this.expensesService.createExpense(
                expense.value,
                expense.obs,
                expense.date,
                expense.userId,
                expense.categoryId,
                expense.bankAccountId
            )

            return res.status(200).json({ message: 'Despesa criada com sucesso!' });

        }
        catch (error) {
            return res.status(400).json({ message: 'Não foi possível criar a Despesa!' });
        }

    }

    getExpenses = async (req: Request, res: any) => {
        try {
            const expenses = await this.expensesService.getExpenses();

            return res.status(200).json(expenses);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    getExpensesById = async (req: Request, res: any) => {

        const { id } = req.params;

        if (!id) {

            return res.status(400).json({ message: "Informe o campo ID" });

        }
        try {

            const expense = await this.expensesService.getExpenseById(id);

            return res.status(200).json(expense);
        }
        catch (error) {

            return res.status(400).json({ message: error });
        }
    }

    getExpensesByUser = async (req: Request, res: any) => {

        const { id } = req.params;

        if (!id) {

            return res.status(400).json({ message: "Informe o campo ID" });

        }
        try {

            const expense = await this.expensesService.getExpenseByUser(id);

            return res.status(200).json(expense);
        }
        catch (error) {

            return res.status(400).json({ message: error });
        }
    }

    updateExpense = async (req: Request, res: any) => {

        const { id } = req.params;
        const updatedData = req.body;

        const updatedDTO = {
            value: updatedData.value,
            obs: updatedData.obs,
            date: updatedData.date,
            fk_user: updatedData,
            fk_category:updatedData.categoryId,
            fk_bank_account:updatedData.bankAccountId,
        }

        if (!id) {
            return res.status(400).json({ message: "Informe o campo ID" });
        }

        try {
            const updatedExpense = await this.expensesService.updateExpense(id, updatedDTO);

            if (!updatedExpense) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.status(200).json(updatedExpense);
        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível atualizar a despesa!' });
        }
    }
}