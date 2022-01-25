import { Contact} from "./user";

export class Transaction {
  constructor(
    public name: string,
    public email:string,
    public phoneNumber:string,
    public date: string,
    public amount: number,
    public willGet: boolean,
    public msg: string
  ) {}
}