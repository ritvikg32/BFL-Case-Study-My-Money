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
  newTransaction:Transaction = new Transaction(this.newContact.name, this.newContact.email, this.newContact.phoneNumber, '', 0, false, '');
  wantsNewContact = false;
  wantsNewTransaction = false;
  viewTransactionForm = false;
  query: string = '';
  viewTransEditForm = false;

  constructor(private transactionService: TransactionService) {}

  onContactSavedSuccess(code: number, msg: string){
    console.log(msg);
  }
  onContactSaveFailed(code: number, msg: string){
    console.log(msg);
  }

  ngOnInit(): void {
    this.initTransactions();
  }

  initTransactions() {
    this.transactionService.getTransactionsLocal();
    this.allTransactions = this.transactionService.getAllTransactions();
    console.log('initTransactions'+this.allTransactions)
  }


  selectContact(contact:Contact){
    this.newContact = contact
    this.newTransaction.name = contact.name
    this.newTransaction.email = contact.email
    this.newTransaction.phoneNumber = contact.phoneNumber
    this.viewTransactionForm = true;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;
  }

  createTransaction(){
    this.viewTransactionForm = false;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;
    
    if(!this.viewTransEditForm){
      this.allTransactions.push(this.newTransaction)
      this.transactionService.storeTransaction(this.newTransaction);
    }
    else{
      this.viewTransEditForm=false
      this.editTransaction(this.newTransaction)
      this.transactionService.overrideTransactions(this.allTransactions)
    }

    
  }

  deleteTransaction(toDeleteTransaction:Transaction){
    let index = this.allTransactions.indexOf(toDeleteTransaction)

    if(index !== -1) {
      this.allTransactions.splice(index, 1);
    }

    this.transactionService.overrideTransactions(this.allTransactions);
  }

  replaceTransaction(toReplace:Transaction){
    let index = this.allTransactions.indexOf(toReplace);

    
  }

  editTransaction(toEditTransaction:Transaction){
    this.viewTransEditForm = true;
    this.newContact.name = toEditTransaction.name;
    this.newContact.email = toEditTransaction.email;
    this.newContact.phoneNumber = toEditTransaction.phoneNumber;
    this.newTransaction = toEditTransaction;
    this.viewTransactionForm = true;
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
