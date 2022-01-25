import { Contact} from "./user";

export class Transaction {
  constructor(
    public user: Contact,
    public date: string,
    public amount: number,
    public willGet: boolean,
    public msg: string
  ) {}
}