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
  errorMessage: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    this.data = new FormData(event.target as HTMLFormElement);
    
    console.log(this.data.get('password'));
    this.http.post('http://localhost:3000/users/login', this.data, {withCredentials: true})
    .subscribe({
      next: (response:any) => {
        console.log(response)
        if(response['status'] == 'success') {
          sessionStorage.setItem('currentLoggedIn', true.toString());
          this.router.navigate(['/account/']);
        }
        else if (response['status'] == 'error') {
          this.errorMessage = response['message'];
        }
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = "invalid email or password";
      }
  
  })
  //   this.http.get('http://localhost:3000/users/loggedIn', {withCredentials: true}).subscribe((response) => {
  //   console.log(response)
  // })
    
  }

}

