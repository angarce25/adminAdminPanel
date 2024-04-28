import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="http://localhost:3000/product";

  constructor(private http:HttpClient) { }

  token:any= localStorage.getItem("token");
  addNewProduct(data:any){
    console.log(this.token)
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':this.token
    })

    return this.http.post(this.url, data, {headers:headers})

  }
}