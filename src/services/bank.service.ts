import { AppDataSource } from "../database";
import { Bank } from "../entities/bank";
import { BankRepository } from "../repositories/bank.repository";

export class BankService {

    private bankRepository: BankRepository;

    constructor(bankRepository = new BankRepository(AppDataSource.manager)) {
        this.bankRepository = bankRepository;
    }

    createBank = async (name: string, code: string): Promise<Bank | null> => {

        try {
            const bank = new Bank(name, code);

            return this.bankRepository.createBank(bank);
        }
        catch (error) {
            throw new Error('Não foi possível criar o banco');
        }

    }

    getBanks = async (): Promise<Bank[] | null> => {

        try {
            return this.bankRepository.getBanks();
        }
        catch (error) {
            throw new Error('Não foi possível buscar os bancos!')
        }


    }

    getBankById = async (bankId: string): Promise<Bank | null> => {

        try {
            return this.bankRepository.getBankById(bankId);
        }
        catch (error) {
            throw new Error('Não foi possível buscar o banco!');
        }

    }

    getBankByName = async(bankName: string):Promise<boolean | null> => {

        try{
            return this.bankRepository.getBankByName(bankName);
        }
        catch(error){
            throw new Error('Não foi possível buscar o banco!');
        }
    }

    updateBank = async(bankId:string, updatedData:Partial<Bank>):Promise<Bank | string> => {

        try{
            const updatedBank = await this.bankRepository.updateBank(bankId, updatedData);

            if(!updatedBank){
                throw new Error('Banco não encontrado!');
            }

            return updatedBank;
        }
        catch(error){

            throw new Error('Ocorreu um erro ao tentar atualizar o Banco!');

        }
    }

    deleteBank = async(bankId:string):Promise<Bank | null> => {

        try{
            return await this.bankRepository.deleteBank(bankId);
        }
        catch(error){
            throw new Error('Ocorreu um erro ao tentar remover o banco!');
        }
    }
}