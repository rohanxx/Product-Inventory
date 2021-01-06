import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from './iresponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000/api/products';
  
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IResponse>(this.url);
  }

  addProduct(product) {
    return this.http.post<IResponse>(this.url, product);
  }

  deleteProduct(id) {
    console.log(id);
    return this.http.delete<IResponse>(`${this.url}/${id}`);
  }

  getEditData(productId) {
    return this.http.get<IResponse>(`${this.url}/${productId}`);
  }

  editProduct(productId, value) {
    return this.http.put<IResponse>(`${this.url}/${productId}`, value);
  }
}
