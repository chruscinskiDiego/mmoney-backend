import { AppDataSource } from "../database";
import { Category } from "../entities/category";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {


    categoryRepository: CategoryRepository;

    constructor(categoryRepository = new CategoryRepository(AppDataSource.manager)) {
        this.categoryRepository = categoryRepository;
    }

    createCategory = async (name: string): Promise<Category | null> => {

        try {
            const category = new Category(name);

            return this.categoryRepository.createCategory(category);
        }
        catch (error) {
            throw new Error('Não foi possível criar a categoria!');
        }


    }

    getCategories = async (): Promise<Category[] | null> => {

        try {
            return this.categoryRepository.getCategories();
        }
        catch {
            throw new Error('Não foi possível buscar as categorias!');
        }

    }

    getCategoryByName = async(categoryName:string):Promise<boolean> =>{

        try{

            return this.categoryRepository.getCategoryByName(categoryName);

        }
        catch(error){
            throw new Error('Não foi possível buscar as categorias!');
        }
    }

    getCategoryById = async (id: string): Promise<Category | null> => {

        try {
            return this.categoryRepository.getCategoryById(id);
        }
        catch (error) {
            throw new Error('Não foi possível buscar as categorias!');
        }

    }

    updateCategory = async (categoryId:string, updatedData:Partial<Category>):Promise<Category | string> => {

        try{
            const updatedCategory = await this.categoryRepository.updateCategory(categoryId, updatedData);

            if(!updatedCategory){
                throw new Error('Categoria não encontrada!');
            }

            return updatedCategory;
        }
        catch(error){
            throw new Error('Ocorreu um erro ao tentar atualizar a categoria!');
        }
    }
}