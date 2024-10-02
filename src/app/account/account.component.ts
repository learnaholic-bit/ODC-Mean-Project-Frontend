import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AccountDetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  // currentLoggedIn: boolean = false; // Example logic variable;
  private router = inject(Router);
  private httpClient = inject(HttpClient);

  ngOnInit(): void {
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
    // this.router.navigate(['/account/']);
  }



}
