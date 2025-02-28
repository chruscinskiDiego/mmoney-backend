import { string } from "zod";
import { AppDataSource } from "../database";
import { Category } from "../entities/category";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {


    categoryRepository: CategoryRepository;

    constructor(categoryRepository = new CategoryRepository(AppDataSource.manager)) {
        this.categoryRepository = categoryRepository;
    }

    createCategory = async (name: string, user:string): Promise<Category | null> => {

        try {

            const category = new Category(name, user);

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

    getCategoryByUser = async(categoryName:string):Promise<Category[]> =>{

        try{

            return this.categoryRepository.getCategoriesByUser(categoryName);

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

    deleteCategory = async(categoryId:string):Promise<Category | null> => {
        try {
            return await this.categoryRepository.deleteCategory(categoryId);
        }
        catch(error){
            throw new Error ('Ocorreu um erro ao tentar remover a categoria!');
        }
    }
}