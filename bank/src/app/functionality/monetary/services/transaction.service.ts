import { Injectable } from '@angular/core';
import { HandlerExceptionsService } from '../../../utils/services/handler-exceptions.service';
import { HttpClient } from '@angular/common/http';
import { Transactionres } from '../model/response/transactionres';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionresError: Transactionres[] = [
    {
      id: "Failed to get user transactions",
      type: "",
      source: 0,
      destination: "",
      amount: 0,
      category: "",
      description: "",
      status: "",
      balance: 0,
      date: ""
    }
  ];

  constructor(
    private handlerException: HandlerExceptionsService,
    private http: HttpClient
  ) { }

  getTransactions():Observable<Transactionres[]>{
    return this.http.get<Transactionres[]>("http://localhost:3000/transactions")
    .pipe(
      tap(_ => this.handlerException.log('transactions user')),
      catchError(this.handlerException.handleError<Transactionres[]>('transactions', this.transactionresError))
    );
  }
}
