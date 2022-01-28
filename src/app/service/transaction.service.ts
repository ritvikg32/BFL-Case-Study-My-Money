import { Injectable, EventEmitter } from '@angular/core';
import { Transaction, TransactionByGroup } from '../model/transaction';
import {AuthService} from './auth.service';
import {Contact} from '../model/user'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  allTransactions: Transaction[] = [];
  allContacts: Contact[] = [];
  transactionGroup: TransactionByGroup[] = [];
  transactionsGroupObj = {};

  allTransEmitter = new EventEmitter();
  transGroupEmitter = new EventEmitter();
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

  getTransactionsGroup() {
    this.transactionsGroupObj = this.allTransactions.reduce((acc: any, d) => {
      if (Object.keys(acc).includes(d.name)) return acc;

      acc[d.name] = this.allTransactions.filter(
        (g: Transaction) => g.name === d.name
      );
      return acc;
    }, {});

    this.parseGroupData();
  }

  parseGroupData() {
    var parsedGroupTrans: TransactionByGroup[] = [];

    var willGet = false;
    for (var [key, value] of Object.entries(this.transactionsGroupObj)) {
      var netAmount = 0;
      // @ts-ignore
      value.forEach(function (item: Transaction) {
        // @ts-ignore
        if (item.willGet) {
          // @ts-ignore
          netAmount += item.amount;
        } else {
          // @ts-ignore
          netAmount -= item.amount;
        }
      });
      willGet = netAmount >= 0;
      parsedGroupTrans.push(
        new TransactionByGroup(
          key,
          willGet,
          Math.abs(netAmount),
          // @ts-ignore
          value
        )
      );
      this.transactionGroup = parsedGroupTrans;
      this.transGroupEmitter.emit(this.transactionGroup)
    }
  }

  getGroupedTransactions() {
    return this.transactionGroup;
  }

  storeTransaction(transaction: Transaction) {
    this.getTransactionsLocal();

    let key = this.authService.currentUser?.email! + '_trans';

    this.allTransactions.push(transaction);

    this.allTransEmitter.emit(this.allTransactions)

    var finalTransStr = JSON.stringify(this.allTransactions);

    localStorage.setItem(key, finalTransStr);
    console.log('Final Transaction: ' + finalTransStr);

    this.getTransactionsGroup()
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
