import { Request } from "express";
import { BankAccountService } from "../services/account.service";
import { bankAccountSchema } from "../schemas/account.schema";

export class BankAccountController {

    bankAccountService: BankAccountService;

    constructor(bankAccountService = new BankAccountService()){
        this.bankAccountService = bankAccountService;
    }

    createBankAccount = async(req:Request, res: any) => {

        try{
            
            const bankAccount = bankAccountSchema.parse(req.body);

            await this.bankAccountService.createBankAccount(bankAccount.number, bankAccount.type, bankAccount.userEmail, bankAccount.bankId);

            return res.status(200).json({message: 'Conta criada com sucesso!'});

        }
        catch(error){

            return res.status(400).json({message: 'Não foi possível criar a conta!' + error});
            
        }
    }

    getBankAccountByUser = async(req:Request, res:any) => {

        const {user} = req.params;

        if(!user){

            return res.status(400).json({message: "Informe o campo ID do Usuário!"});

        }

        try{

            const bankAccount = await this.bankAccountService.getBankAccountByUser(user);

            return res.status(200).json(bankAccount);

        }
        catch(error){

            return res.status(400).json({message: error});

        }
    }

    updateBankAccount = async(req:Request, res:any) => {

        const {id} = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: "Informe o campo ID" });
        }

        try{

            const objectConvert = {
                number: updatedData.number,
                type: updatedData.type,
                fk_user: updatedData.userId,
                fk_bank: updatedData.bankId,

            }

            const updatedBankAccount = await this.bankAccountService.updateBankAccount(id, objectConvert);

            if(!updatedBankAccount){

                return res.status(400).json({message: 'Conta bancária não encontrada!'});

            }

            return res.status(200).json(updatedBankAccount);
        }
        catch(error){

            return res.status(400).json({message: 'Não foi possível atualizar a Conta Bancária!'});

        }

    }

    deleteBankAccount = async(req:Request, res:any) => {

        const {id} = req.params;

        if(!id){

            return res.status(400).json({message: "Informe o campo ID"});

        }

        try{

            const deleted = await this.bankAccountService.deleteBankAccount(id);

            if(!deleted){

                return res.status(400).json({message: 'Conta bancária não encontrada!'});

            }

            return res.status(200).json({message: 'Conta bancária deletada com sucesso!'});

        }
        catch(error){

            return res.status(400).json({message: 'Não foi possível deletar a Conta Bancária!'});

        }

    }
}