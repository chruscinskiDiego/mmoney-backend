import { EntityManager } from "typeorm";
import { Category } from "../entities/category";

export class CategoryRepository {

    private manager: EntityManager;

    constructor (manager: EntityManager){
        this.manager = manager;
    }

    createCategory = async(category:Category):Promise<Category | null> => {
        return this.manager.save(category);
    }

    getCategories = async():Promise<Category[]> => {
        return this.manager.find(Category);
    }

    getCategoryById = async(categoryId:string):Promise<Category | null> => {
        return this.manager.findOne(Category,{
            where: {
                id: categoryId
            }
        })
    }

    getCategoryByName = async(categoryName:string):Promise<boolean> => {
        
        const category = await this.manager.findOne(Category, {
            where:{
                name: categoryName,
            }
        });

        return category !== null;
    }

    updateCategory = async(categoryId: string, updatedData: Partial<Category>) : Promise<Category | null> => {

        const category = await this.getCategoryById(categoryId);

        if(!category){
            return null;
        }

        Object.assign(category, updatedData);

        return this.manager.save(category);
        
    }    
}