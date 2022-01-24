import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction.service';
import { User } from "../model/user";
import { Contact } from "../model/user";
// import {TransactionEventListener} from '../interface/ActionCompleteListener'


@Component({
  selector: 'app-khata',
  templateUrl: './khata.component.html',
  styleUrls: ['./khata.component.css'],
})
export class KhataComponent implements OnInit{
  allTransactions: Transaction[] = [];
  newContact:Contact | null = null;

  constructor(private transactionService: TransactionService) {
    this.initTransactions();
  }
  onContactSavedSuccess(code: number, msg: string){
    console.log(msg)
  };
  onContactSaveFailed(code: number, msg: string){
    console.log(msg);
  };

  ngOnInit(): void {
    
  }

  initTransactions() {
    this.allTransactions = this.transactionService.getAllTransactions();
  }

  addNewContact() {

    if(this.newContact != null)
    this.transactionService.addNewContact(
      new Contact(
        this.newContact?.name,
        this.newContact?.email,
        this.newContact?.phoneNumber
      )
    );
  }
}
