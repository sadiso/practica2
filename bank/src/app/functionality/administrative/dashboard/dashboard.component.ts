import { Component } from '@angular/core';
import { TransactionService } from '../../monetary/services/transaction.service';
import { Location } from '@angular/common';
import { Transactionres } from '../../monetary/model/response/transactionres';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  transactionsList: Transactionres[] = [];

  successTransactions: number = 0;
  failedTransactions: number = 0;
  withdrawalTransactions: number = 0;
  depositTransactions: number = 0;

  constructor(
    private transactionService: TransactionService,
    private location: Location
  ){}

  ngOnInit(){
    this.transactionService.getTransactions()
    .subscribe(transactions => {
      this.successTransactions = this.transactionsByStatus("Success", transactions);
      this.failedTransactions = this.transactionsByStatus("Insufficient Funds", transactions);

      this.withdrawalTransactions = this.transactionsByType("Withdrawal", transactions);
      this.depositTransactions = this.transactionsByType("Deposit", transactions);
    });
    
  }

  goBack(): void {
    this.location.back();
  }

  transactionsByStatus(condition: string, x: Transactionres[]){
    var indices = new Array(x.length);
    indices.fill(0);

    for (var i = 0; i < indices.length; i++) {

      for (var j = 0; j < x.length; j++) {
        if (condition == x[j].status) {
          indices[i] = indices[i] + 1;
        }
      }
    }
    console.log(indices);
    return indices[0];
  }

  transactionsByType(condition: string, x: Transactionres[]){
    var indices = new Array(x.length);
    indices.fill(0);

    for (var i = 0; i < indices.length; i++) {

      for (var j = 0; j < x.length; j++) {
        if (condition == x[j].type) {
          indices[i] = indices[i] + 1;
        }
      }
    }
    console.log(indices);
    return indices[0];
  }
}
