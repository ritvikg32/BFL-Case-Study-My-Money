import { Injectable, EventEmitter } from '@angular/core';
import { Transaction } from '../model/transaction';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  topWillGet: Transaction[] = [];
  topWillGive: Transaction[] = [];

  topWillGetUpdated = new EventEmitter();
  topWillGiveUpdated = new EventEmitter();

  constructor(private transactionService: TransactionService) {}

  updateTopTrans() {
    if (this.transactionService.allTransactions.length > 0){
      
      this.topWillGet = this.getTopThree(
        this.transactionService.allTransactions, true
      );
      this.topWillGive = this.getTopThree(
        this.transactionService.allTransactions,
        false
      );

      console.log("Data received informing component")
      console.log("Data is " + JSON.stringify(this.topWillGet))
      console.log("Data is (willGive)" + JSON.stringify(this.topWillGive))
      this.topWillGetUpdated.emit(this.topWillGet)
      this.topWillGiveUpdated.emit(this.topWillGive)
    }
    else{
      console.log("Getting transactions from local")
      // this.transactionService.getTransactionsLocal();
      this.updateTopTrans();
    }
  }

  getTopThree(allTransactions: Transaction[], willGet:boolean): Transaction[] {
    let topTrans = allTransactions.filter(transaction => transaction.willGet == willGet);
    topTrans.sort((transaction) => transaction.amount);
    topTrans.reverse();

    return topTrans.slice(0, 4)
  }
}
