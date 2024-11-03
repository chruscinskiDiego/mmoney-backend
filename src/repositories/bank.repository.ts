import { EntityManager } from "typeorm";
import { Bank } from "../entities/bank";

export class BankRepository{

    private manager: EntityManager;

    constructor(manager:EntityManager){
        this.manager = manager;
    }

    createBank = async(bank:Bank):Promise <Bank | null > => {
        return this.manager.save(bank);
    }

    getBanks = async() => {

        return this.manager.find(Bank);

    }

    getBankById = async(bankId:string) => {

        return this.manager.findOne(Bank, {
            where:{
                id:bankId
            }
        })
    }

    getBankByName = async(bankName:string):Promise<boolean> => {

        const bank = await this.manager.findOne(Bank, {
            where: {
                name: bankName,
            }
        });

        return bank !== null;
    }

    updateBank = async(bankId:string, updatedData:Partial<Bank>) :Promise<Bank | null> => {

        const bank = await this.getBankById(bankId);

        if(!bank){
            return null;
        }

        Object.assign(bank, updatedData);

        return this.manager.save(bank);
    }

    deleteBank = async(bankId:string) => {

        const bank = await this.getBankById(bankId);

        if(!bank){
            return null;
        }

        return this.manager.remove(bank);

    }
}