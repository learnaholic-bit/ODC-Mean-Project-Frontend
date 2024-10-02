import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private http = inject(HttpClient);
  usernameOrEmail: string = '';
  data: any = new FormData();
  router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    this.data = new FormData(event.target as HTMLFormElement);
    
    console.log(this.data.get('password'));
    this.http.post('http://localhost:3000/users/login', this.data, {withCredentials: true})
    .subscribe((response:any) => {
      console.log(response)
      if(response['status'] == 'success') {
        sessionStorage.setItem('currentLoggedIn', true.toString());
        this.router.navigate(['/account/']);
      }
    })
    this.http.get('http://localhost:3000/users/loggedIn', {withCredentials: true}).subscribe((response) => {
    console.log(response)
  })
    
  }

}

/*
{    
    "email": "admin@example.com",
    // "username": "admin",
    "password": "@Abcde123"
    // ,
    // "role": "admin"
}



*/
