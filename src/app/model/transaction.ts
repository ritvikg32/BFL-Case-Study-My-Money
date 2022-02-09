import { Contact} from "./user";

export class Transaction {
  constructor(
    public transId: number | null,
    public name: string,
    public email:string,
    public phoneNo:string,
    public transDate: string,
    public amount: number,
    public willGet: boolean,
    public msg: string
  ) {}
}

export class TransactionByGroup {
  constructor(
    public name: string,
    public willGet: boolean,
    public netAmount: number,
    public allTransactions: Transaction[]
  ) {}
}