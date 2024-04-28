import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="https://adminadminpanel.onrender.com/product";

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

  getAllProducts(){
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':this.token
    })
    return this.http.get(this.url, {headers:headers})

  }

  updateProduct(data:any){
       const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':this.token
    })

    return this.http.put(this.url, data, {headers:headers})

  }

  deleteItem(id:any){
    return this.http.delete(this.url+'/'+id)
  }
}


