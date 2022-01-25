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
  allContacts: Contact[] = [];
  // actionCompleteListener: TransactionEventListener =
  //   {} as TransactionEventListener;

  constructor(private authService: AuthService) {}

  addNewTransaction() {}

  addNewContact(newContact: Contact) {
    this.getContactsLocal()

    this.allContacts.push(newContact);
    
    let finalContactsStr = JSON.stringify(this.allContacts);

    localStorage.setItem(
      this.authService.currentUser?.email!+'_contacts',
      finalContactsStr
    );

    // this.actionCompleteListener.onContactSavedSuccess(
    //   200,
    //   'New Contact Added Successfully'
    // );
  }

  getContactsLocal(){
    let contactsStr = localStorage.getItem(
      this.authService.currentUser?.email! + '_contacts'
    );
    if(contactsStr!==null)
      this.allContacts = JSON.parse(contactsStr);
    
      console.log(this.authService.currentUser?.email!);
      console.log(this.allContacts)
  }

  getAllTransactions(): Transaction[] {
    return this.allTransactions;
  }

  getAllContacts(): Contact[] {
    return this.allContacts;
  }
}
