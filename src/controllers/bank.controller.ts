import { BankService } from "../services/bank.service";
import { Request } from "express";
import { bankSchema } from "../schemas/bank.schema";

export class BankController {

    bankService: BankService;

    constructor(bankService = new BankService()) {
        this.bankService = bankService;
    }

    createBank = async (req: Request, res: any) => {
        try {

            const bank = bankSchema.parse(req.body);

            const alreadyRegistered = await this.bankService.getBankByName(bank.name);

            if(alreadyRegistered){
                return res.status(400).json({message:'Este banco já foi cadastrado!'});
            }

            await this.bankService.createBank(bank.name, bank.code, bank.user);
            
            return res.status(200).json({ message: 'Banco criado com sucesso!' });

        } catch (error) {
            return res.status(400).json({ message: 'Não foi possível criar o banco!' });
        }
    };

    getBanks = async (req: Request, res: any) => {

        try {

            const banks = await this.bankService.getBanks();

            return res.status(200).json(banks);

        }
        catch (error) {
            return res.status(400).json({ message: 'Não foi possível buscar os bancos!' });
        }
    }

    getBanksByUser = async (req: Request, res: any) => {
        
        const { user } = req.params;

        if (!user) {

            return res.status(400).json({ message: "Informe o campo usuário" });

        }

        try {

            const banks = await this.bankService.getBanksByUser(user);

            return res.status(200).json(banks);

        }
        catch (error) {
            return res.status(400).json({ message: 'Não foi possível buscar os bancos!' });
        }
    }

    getBankById = async (req: Request, res: any) => {

        const { id } = req.params;

        if (!id) {

            return res.status(400).json({ message: "Informe o campo ID" });

        }

        try {

            const bank = await this.bankService.getBankById(id);

            return res.status(200).json(bank);

        }
        catch {

            return res.status(400).json({ message: "Banco não encontrado" });

        }
    }

    udpdateBank = async(req:Request, res:any) => {

        const {id} = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: "Informe o campo ID" });
        }

        try{

            const updatedBank = await this.bankService.updateBank(id, updatedData);

            if(!updatedBank){
                return res.status(404).json({message: "Banco não encontrado!"});
            }

            return res.status(200).json(updatedBank);

        }catch (error) {
            return res.status(400).json({ message: 'Não foi possível atualizar o banco!' });
        }
        
    }

    deleteBank = async(req:Request, res:any) => {

        const {id} = req.params;

        try{

            await this.bankService.deleteBank(id);

            return res.status(200).json({message: 'Banco deletado com sucesso!'});

        }catch(error){
            return res.status(400).json({ message: 'Não foi possível deletar o banco!' });
        }
    }
}
