import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction.service';
import { User } from "../model/user";
import { Contact } from "../model/user";
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
// import {TransactionEventListener} from '../interface/ActionCompleteListener'


@Component({
  selector: 'app-khata',
  templateUrl: './khata.component.html',
  styleUrls: ['./khata.component.css'],
})
export class KhataComponent implements OnInit {
  allTransactions: Transaction[] = [];
  allContacts: Contact[] = [];
  newContact: Contact = new Contact('', '', '');
  newTransaction:Transaction = new Transaction(this.newContact, '', 0, false, '');
  wantsNewContact = false;
  wantsNewTransaction = false;
  viewTransactionForm = false;
  query: string = '';

  constructor(private transactionService: TransactionService) {
  }
  onContactSavedSuccess(code: number, msg: string) {
    console.log(msg);
  }
  onContactSaveFailed(code: number, msg: string) {
    console.log(msg);
  }

  ngOnInit(): void {
    this.initTransactions();
  }

  initTransactions() {
    this.transactionService.getTransactionsLocal();
    this.allTransactions = this.transactionService.getAllTransactions();
    console.log(this.allTransactions)
  }


  selectContact(contact:Contact){
    this.newContact = contact
    this.newTransaction.user = contact
    this.viewTransactionForm = true;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;
  }

  createTransaction(){
    this.viewTransactionForm = false;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;
    this.transactionService.storeTransaction(this.newTransaction)
  }

  userEmails = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^d+$'),
    ]),
  });

  updateContacts(){
    this.transactionService.getContactsLocal()
    this.allContacts = this.transactionService.getAllContacts()
  }

  openContactForm() {
    this.wantsNewContact = true;
  }

  addNewContact() {
    if (this.newContact != null)
      this.transactionService.addNewContact(
        new Contact(
          this.userEmails.get('name')?.value,
          this.userEmails.get('email')?.value,
          this.userEmails.get('password')?.value
        )
      );

    console.log(JSON.stringify(this.newContact));
    
  }
}
