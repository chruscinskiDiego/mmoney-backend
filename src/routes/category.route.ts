import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.get('/user/:user', categoryController.getCategoriesByUser);
categoryRouter.put('/update/:id', categoryController.updateCategory);
categoryRouter.delete('/delete/:id', categoryController.deleteCategory);

export default categoryRouter;