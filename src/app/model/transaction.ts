import { User } from "./user";

export class Transaction {
  constructor(
    public user: User,
    public date: string,
    public amount: number,
    public willGet: boolean
  ) {}
}