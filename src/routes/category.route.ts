import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getCategoryByid);
categoryRouter.put('/update/:id', categoryController.updateCategory);

export default categoryRouter;