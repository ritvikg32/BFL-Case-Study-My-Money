import { Injectable, EventEmitter } from '@angular/core';
import { Transaction, TransactionByGroup } from '../model/transaction';
import {AuthService} from './auth.service';
import {Contact} from '../model/user'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:3000/';

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

  constructor(private authService: AuthService, private http: HttpClient) {}

  addNewContact(newContact: Contact):Observable<any> {
    // this.getContactsLocal();

    // this.allContacts.push(newContact);

    // let finalContactsStr = JSON.stringify(this.allContacts);

    // localStorage.setItem(
    //   this.authService.currentUser?.email! + '_contacts',
    //   finalContactsStr
    // );

    // this.actionCompleteListener.onContactSavedSuccess(
    //   200,
    //   'New Contact Added Successfully'
    // );

    return this.http.post(
      BASE_URL + 'contact/' + this.authService.currentUser?.userId,
      newContact,
      { responseType: 'text' }
    );

    
  }

  // getTransactionsLocal() {
  //   console.log(
  //     'Getting transactions for email' + this.authService.currentUser?.email
  //   );
  //   let key = this.authService.currentUser?.email! + '_trans';

  //   let transactionsStr = localStorage.getItem(key);
  //   console.log('Transaction string is ' + transactionsStr);

  //   if (transactionsStr !== null)
  //     this.allTransactions = JSON.parse(transactionsStr);
  // }

  getTransactionsGroup(allTransactions:Transaction[]) {
    this.transactionsGroupObj = allTransactions.reduce((acc: any, d) => {
      if (Object.keys(acc).includes(d.name)) return acc;

      acc[d.name] = allTransactions.filter(
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

  storeTransaction(transaction: Transaction):Observable<any> {
    // this.getTransactionsLocal();

    // let key = this.authService.currentUser?.email! + '_trans';

    // this.allTransactions.push(transaction);

    // this.allTransEmitter.emit(this.allTransactions)

    // var finalTransStr = JSON.stringify(this.allTransactions);

    // localStorage.setItem(key, finalTransStr);
    // console.log('Final Transaction: ' + finalTransStr);

    // this.getTransactionsGroup()

    console.log('Tranasacion before sending', JSON.stringify(transaction));

    let dbWillGet = null

    if(transaction.willGet)
      dbWillGet = 1
    else
      dbWillGet = 0

    console.log('Transaction name is ' + transaction.name);
    

    let customBody = {
      "name" : transaction.name,
      "email" : transaction.email, 
      "transDate" : transaction.transDate,
      "amount": transaction.amount,
      "willGet": dbWillGet,
      "msg": transaction.msg
    }
    
    return this.http.post(BASE_URL + 'transaction/' + this.authService.currentUser?.userId,
    customBody,
    { responseType: 'text' }
    )
  }

  updateTransaction(transaction:Transaction): Observable<any>{

    let dbWillGet = null;

    if (transaction.willGet) dbWillGet = 1;
    else dbWillGet = 0;

    let customBody = {
      "transId": transaction.transId,
      "name": transaction.name,
      "email": transaction.email,
      "transDate": transaction.transDate,
      "amount": transaction.amount,
      "willGet": dbWillGet,
      "msg": transaction.msg,
    };

    return this.http.put(
      BASE_URL + 'transaction/' + this.authService.currentUser?.userId,
      customBody,
      { responseType: 'text' }
    );
  }

  deleteTransaction(transId: number): Observable<any>{
    return this.http.delete(BASE_URL + 'transaction/' + transId, { responseType: 'text'})
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

  getAllTransactions(): Observable<any>{
    return this.http.get(
      BASE_URL + 'transactions/' + this.authService.currentUser?.userId,
      { responseType: 'json' }
    );
  }

  getAllContacts(): Observable<any> {
    return this.http.get(BASE_URL + 'contact/' + this.authService.currentUser?.userId,
    { responseType: 'json' }
    )
  }

  logout() {
    this.allContacts = [];
    this.allTransactions = [];
  }
}
