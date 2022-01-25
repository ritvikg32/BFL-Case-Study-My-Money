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
  wantsNewContact = false;
  wantsNewTransaction = false;
  query: string = '';

  constructor(private transactionService: TransactionService) {
    this.initTransactions();
  }
  onContactSavedSuccess(code: number, msg: string) {
    console.log(msg);
  }
  onContactSaveFailed(code: number, msg: string) {
    console.log(msg);
  }

  ngOnInit(): void {}

  initTransactions() {
    this.allTransactions = this.transactionService.getAllTransactions();
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
