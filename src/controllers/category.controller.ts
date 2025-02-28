import { Request } from "express";
import { CategoryService } from "../services/category.service";
import { categorySchema } from "../schemas/category.schema";
export class CategoryController {

    categoryService: CategoryService;

    constructor(categoryService = new CategoryService()) {
        this.categoryService = categoryService;
    }

    createCategory = async (req: Request, res: any) => {

        try {

            const category = categorySchema.parse(req.body);

           // const alreadyRegistered = await this.categoryService.getCategoryByUser(category.name);

           /* if(alreadyRegistered){
                return res.status(400).json({message:'Categoria já cadastrada no sistema!'});
            }*/

            await this.categoryService.createCategory(category.name, category.user);
            
            return res.status(200).json({ message: 'Categoria criada com sucesso!' });

        }
        catch (error) {
            return res.status(400).json({ message: 'Não foi possível criar o banco!' });
        }

    }

    getCategories = async (req: Request, res: any) => {

        try {

            const categories = await this.categoryService.getCategories();

            return res.status(200).json(categories);
        }
        catch (error) {

            return res.status(400).json({ message: 'Não foi possível buscar as categorias!' });
        }
    }

    getCategoryById = async (req: Request, res: any) => {

        const { id } = req.params

        if (!id) {

            return res.status(400).json({ message: "Informe o campo ID" });

        }

        try {

            const category = await this.categoryService.getCategoryById(id);

            return res.status(200).json(category);
        }
        catch {

            return res.status(400).json({ message: "Categoria não encontrada!" });
        }
    }

    getCategoriesByUser = async (req: Request, res: any) => {

        const { user } = req.params

        if (!user) {

            return res.status(400).json({ message: "Usário não informado!" });

        }

        try {

            const category = await this.categoryService.getCategoryByUser(user);

            return res.status(200).json(category);
        }
        catch {

            return res.status(400).json({ message: "Categoria não encontrada!" });
        }
    }

    updateCategory = async(req:Request, res:any) => {

        const {id} = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: "Informe o campo ID" });
        }

        try{
            
            const updatedCategory = await this.categoryService.updateCategory(id, updatedData );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Categoria não encontrada!" });
            }

            return res.status(200).json(updatedCategory);

        }
        catch(error){
            return res.status(400).json({message: 'Não foi possível atualizar a Categoria!'});
        }

    }

    deleteCategory = async(req:Request, res: any) => {
        const {id} = req.params;

        try{
            await this.categoryService.deleteCategory(id);

            return res.status(200).json({message: 'Categoria removida com sucesso!'});

        }catch(error){
            return res.status(400).json({message: 'Não foi possível deletar a categoria!'});
        }
    }

}