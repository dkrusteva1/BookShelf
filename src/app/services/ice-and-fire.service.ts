import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IceAndFireService {

  private baseUrl = 'https://anapioficeandfire.com/api/books';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<any> {
    return this.httpClient.get(this.baseUrl).pipe(
      retry(1), 
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new Error('Something went wrong!'));
      })
    );
  }

  public getBookById(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`).pipe(
      retry(1), 
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new Error('Something went wrong!'));
      })
    );
  }
}
