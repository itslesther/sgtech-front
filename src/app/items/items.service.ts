import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Item } from './items.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  //MOCK BACKEND URL
  private backendUrl = 'api/items';

  constructor(private http: HttpClient) {}

  create(item: Item) {
    return firstValueFrom(
      this.http
        .post<Item>(`${this.backendUrl}`, item, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  findAll() {
    return firstValueFrom(
      this.http
        .get<Item[]>(`${this.backendUrl}`, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  update(item: Item) {
    return firstValueFrom(
      this.http
        .put<void>(`${this.backendUrl}`, item, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  delete(props: { id: number }) {
    const url = `${this.backendUrl}/${props.id}`;

    return firstValueFrom(
      this.http
        .delete<any>(`${url}/books/${props.id}`, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(
        () => new Error('An error ocurred; please try again later')
      );
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    return throwError(() => new Error((error as any).body.error));
  }
}
