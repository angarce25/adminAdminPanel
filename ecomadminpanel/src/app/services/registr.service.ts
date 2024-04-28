import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrService {
  url="https://adminadminpanel.onrender.com/register";

  constructor(private http:HttpClient) { }

  registerUser(data:any){
    return this.http.post(this.url, data)

  }
}
