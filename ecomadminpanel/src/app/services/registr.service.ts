import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrService {
  url="http://localhost:3000/register";

  constructor(private http:HttpClient) { }

  registerUser(data:any){
    return this.http.post(this.url, data)

  }
}
