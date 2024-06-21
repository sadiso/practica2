import { Component } from '@angular/core';
import { Location, NgFor, formatDate } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { Transactionres } from '../model/response/transactionres';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [NgFor],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  transactionsList: Transactionres[] = [];

  constructor(
    private transactionService: TransactionService,
    private location: Location
  ){}

  ngOnInit(){
    this.transactionService.getTransactions()
    .subscribe(transactions => {
      this.transactionsList = transactions.sort((a, b) => this.date(a.date).getDate() - this.date(b.date).getDate());
    });
  }

  goBack(): void {
    this.location.back();
  }

  date(dateUnix: string):Date{
    return new Date(dateUnix);
  }

  dateWithFormat(dateUnix: string):string{
    return formatDate(dateUnix, 'YYYY-MM-dd', 'en');
  }
}
