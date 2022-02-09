import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionByGroup } from '../model/transaction';
import { TransactionService } from '../service/transaction.service';
import { User } from "../model/user";
import { Contact } from "../model/user";
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { groupBy } from 'rxjs';
// import {TransactionEventListener} from '../interface/ActionCompleteListener'


@Component({
  selector: 'app-khata',
  templateUrl: './khata.component.html',
  styleUrls: ['./khata.component.css'],
})
export class KhataComponent implements OnInit {
  allTransactions: Transaction[] = [];
  allTransactionsGroup: TransactionByGroup[] = [];
  allContacts: Contact[] = [];
  userTransactions: Transaction[] = [];
  newContact: Contact = new Contact('', '', '');
  isTransSelected = false;
  newTransaction: Transaction = new Transaction(
    null,
    this.newContact.name,
    this.newContact.email,
    this.newContact.phoneNo,
    '',
    0,
    false,
    ''
  );
  wantsNewContact = false;
  wantsNewTransaction = false;
  viewTransactionForm = false;
  query: string = '';
  viewTransEditForm = false;

  constructor(private transactionService: TransactionService) {}

  trackQuestion(index: number) {
    return index.toString();
    // you can implement custom logic here using the question
  }

  onContactSavedSuccess(code: number, msg: string) {
    console.log(msg);
  }
  onContactSaveFailed(code: number, msg: string) {
    console.log(msg);
  }

  ngOnInit(): void {
    this.initTransactions();
    this.transactionService.allTransEmitter.subscribe(
      (transactions: Transaction[]) => {
        console.log('Callback received');
        console.log('New Transactions array: ' + JSON.stringify(transactions));
        this.userTransactions = transactions;
      }
    );

    this.transactionService.transGroupEmitter.subscribe(
      (transactions: TransactionByGroup[]) => {
        this.allTransactionsGroup = transactions;
      }
    );
  }

  

  initTransactions() {
    // this.transactionService.getTransactionsLocal();
    
    this.transactionService.getAllTransactions().subscribe(transactions => {
      console.log('Transactions received: ', transactions);
      
      this.allTransactions = transactions
      this.getTransactionsGroup();
    },
    error => {
      console.log('Error' + error);
      
    })
    
  }

  getTransactionsGroup() {
    this.transactionService.getTransactionsGroup(this.allTransactions);
    this.allTransactionsGroup =
      this.transactionService.getGroupedTransactions();
  }

  toggleTransactionDetail(item: TransactionByGroup | null) {
    this.isTransSelected = !this.isTransSelected;
    if (item !== null) {
      this.userTransactions = item.allTransactions;
      console.log(
        'item transactions are:' + JSON.stringify(item.allTransactions)
      );
    } else {
      this.initTransactions();
    }
  }

  selectContact(contact: Contact) {
    this.newContact = contact;
    this.newTransaction.name = contact.name;
    this.newTransaction.email = contact.email;
    this.newTransaction.phoneNo = contact.phoneNo;
    this.viewTransactionForm = true;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;
  }

  createTransaction() {
    this.viewTransactionForm = false;
    this.wantsNewContact = false;
    this.wantsNewTransaction = false;

    console.log(
      'before adding transaction' + JSON.stringify(this.allTransactions)
    );

    if (!this.viewTransEditForm) {
      // this.allTransactions.push(this.newTransaction);


      this.transactionService.storeTransaction(this.newTransaction).subscribe(
        (result) => {
          console.log('Transaction to be pushed' + JSON.stringify(this.newTransaction));
          
          this.allTransactions.push(this.newTransaction)
          console.log(result)
        },
        (error) => {
          console.log(error);
        }
      );
      // this.initTransactions()
    } else {
      this.viewTransEditForm = false;
      this.viewTransactionForm = false;
      this.editTransaction(this.newTransaction);
      console.log(
        'Updated transaction is ' + JSON.stringify(this.newTransaction)
      );
      
      this.transactionService.updateTransaction(this.newTransaction).subscribe(
        response => {
          console.log('Transaction updated successfully');
          
        },
        err => {
          console.log("Eror: " + err);
          
        }
      );
    }

    console.log(
      'after adding transaction' + JSON.stringify(this.allTransactions)
    );
  }

  deleteTransaction(toDeleteTransaction: Transaction) {
    

    this.transactionService.deleteTransaction(toDeleteTransaction.transId!).subscribe(
      response => {
        console.log('Transaction deleted successfully');
        let index = this.allTransactions.indexOf(toDeleteTransaction);

        if (index !== -1) {
          this.allTransactions.splice(index, 1);
        }


        console.log('Index of current element is ' + index);
        
        
      },
      err => {
        console.log('Error' + err);
      }
    );
  }

  editTransaction(toEditTransaction: Transaction) {
    this.viewTransEditForm = true;
    this.newContact.name = toEditTransaction.name;
    this.newContact.email = toEditTransaction.email;
    this.newContact.phoneNo = toEditTransaction.phoneNo;
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

  updateContacts() {
    // this.transactionService.getContactsLocal();
    // this.allContacts = this.transactionService.getAllContacts();

    this.transactionService.getAllContacts().subscribe(
      (contacts) => {
        console.log('Updated contacts list: ', contacts);
        
        this.allContacts = contacts;
      },
      (err) => {
        console.log('Error getting all contacts')
      }
    )
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
      ).subscribe(
        (data: any) => {
          console.log('New contact added successfully');
          
          this.allContacts.push(this.newContact)
        },
        (err: any) => {
          console.log('Cannot add new contact')
        }
      )

    console.log(JSON.stringify(this.newContact));
  }
}
