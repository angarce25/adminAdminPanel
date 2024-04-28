import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="http://localhost:3000/product";

  constructor(private http:HttpClient) { }

  addNewProduct(data:any){
    return this.http.post(this.url, data)

  }
}
