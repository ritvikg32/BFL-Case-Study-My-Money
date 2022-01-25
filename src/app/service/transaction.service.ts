import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';
import {AuthService} from './auth.service';
import {Contact} from '../model/user'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  allTransactions: Transaction[] = [];
  allContacts: Contact[] = [];
  // actionCompleteListener: TransactionEventListener =
  //   {} as TransactionEventListener;

  constructor(private authService: AuthService) {}

  addNewContact(newContact: Contact) {
    this.getContactsLocal();

    this.allContacts.push(newContact);

    let finalContactsStr = JSON.stringify(this.allContacts);

    localStorage.setItem(
      this.authService.currentUser?.email! + '_contacts',
      finalContactsStr
    );

    // this.actionCompleteListener.onContactSavedSuccess(
    //   200,
    //   'New Contact Added Successfully'
    // );
  }

  getTransactionsLocal() {
    console.log(
      'Getting transactions for email' + this.authService.currentUser?.email
    );
    let key = this.authService.currentUser?.email! + '_trans';

    let transactionsStr = localStorage.getItem(key);
    console.log('Transaction string is ' + transactionsStr);

    if (transactionsStr !== null)
      this.allTransactions = JSON.parse(transactionsStr);
  }

  storeTransaction(transaction: Transaction) {
    this.getTransactionsLocal();
    let key = this.authService.currentUser?.email! + '_trans';

    this.allTransactions.push(transaction);

    var finalTransStr = JSON.stringify(this.allTransactions);

    localStorage.setItem(key, finalTransStr);
    console.log('Final Transaction: ' + finalTransStr);
  }

  overrideTransactions(value: any) {
    localStorage.setItem(
      this.authService.currentUser?.email! + '_trans',
      JSON.stringify(value)
    );
  }

  getContactsLocal() {
    console.log('getting contacts of ' + this.authService.currentUser?.email);

    let contactsStr = localStorage.getItem(
      this.authService.currentUser?.email! + '_contacts'
    );
    if (contactsStr !== null) this.allContacts = JSON.parse(contactsStr);
  }

  getAllTransactions(): Transaction[] {
    return this.allTransactions;
  }

  getAllContacts(): Contact[] {
    return this.allContacts;
  }

  logout() {
    this.allContacts = [];
    this.allTransactions = [];
  }
}
