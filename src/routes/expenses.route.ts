import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.controller";

const expensesRouter = Router();

const expensesController = new ExpensesController();

expensesRouter.post('/create', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpensesById);
expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/user/:user', expensesController.getExpensesByUser);
expensesRouter.put('/update/:id', expensesController.updateExpense);
expensesRouter.delete('/delete/:id', expensesController.deleteExpense);
expensesRouter.get('/categories/:user', expensesController.getExpensesCategoriesResumeByUser);
expensesRouter.get('/resume-by-year/:user', expensesController.getExpensesResumeInYearByUser);
export default expensesRouter;