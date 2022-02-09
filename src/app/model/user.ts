export class User{
    public userId:number = -1;
    constructor(public name:string,public email:string,public password:string,public phoneNumber:string){}
}
export class Contact {
  constructor(
    public name: string,
    public email: string,
    public phoneNo: string
  ) {}
}