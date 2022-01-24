import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';
import { User } from '../model/user';
import {AuthService} from './auth.service';
import {Contact} from '../model/user'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  allTransactions: Transaction[] = [];
  allContacts: User[] = [];
  // actionCompleteListener: TransactionEventListener =
  //   {} as TransactionEventListener;

  constructor(private authService: AuthService) {}

  addNewTransaction() {}

  addNewContact(newContact: Contact) {
    let userData = JSON.stringify(newContact);

    localStorage.setItem(
      this.authService.user?.email + '_' + newContact.email,
      userData
    );

    // this.actionCompleteListener.onContactSavedSuccess(
    //   200,
    //   'New Contact Added Successfully'
    // );
  }

  getAllTransactions(): Transaction[] {
    return this.allTransactions;
  }

  getAllContacts(): User[] {
    return this.allContacts;
  }
}
