import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  private httpClient = inject(HttpClient)
  private router = inject(Router)
  constructor() {}


  public loginCheck = () => {

    if (sessionStorage.getItem('currentLoggedIn') == 'false') {
      // this.currentLoggedIn = false;
      this.router.navigate(['/account/login']);
    }

    // not sure from the verfication logic and couldn't care more at this point

    this.httpClient.get('http://localhost:3000/users/loggedIn',{withCredentials: true}).subscribe({
      next: (data:any) => {
        console.log(data);
        if(data.status == 'success') {
          sessionStorage.setItem('currentLoggedIn', true.toString());
          console.log(data);
          sessionStorage.setItem('role', data.data);
          this.router.navigate(['/account/']);
        }
        else {
          //handle if replied with wrong response
          sessionStorage.setItem('currentLoggedIn', false.toString());
          this.router.navigate(['/account/login']);
        }
      },
    error: (error) => {
        console.log('Error Occured');
        console.log(error);
        sessionStorage.setItem('currentLoggedIn', false.toString());
        this.router.navigate(['/account/login']);
      }
    })




  }

  
}
