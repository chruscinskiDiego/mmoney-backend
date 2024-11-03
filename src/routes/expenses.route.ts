import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.controller";

const expensesRouter = Router();

const expensesController = new ExpensesController();

expensesRouter.post('/create', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpensesById);
expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/user/:id', expensesController.getExpensesByUser);
expensesRouter.put('/update/:id', expensesController.updateExpense);

export default expensesRouter;