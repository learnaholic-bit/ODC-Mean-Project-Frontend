import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //won't use this mostly
  private http = inject(HttpClient);
  usernameOrEmail: string = '';
  errorMessage: any = '';
  data: any = new FormData();
  router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    this.data = new FormData(event.target as HTMLFormElement);
    
    console.log(this.data.get('password'));
    this.http.post('http://localhost:3000/users/register', this.data, {withCredentials: true})
    .subscribe({next:(response:any) => {
      console.log(response)
      if(response['status'] == 'success') {
        sessionStorage.setItem('currentLoggedIn', false.toString());
        this.router.navigate(['/account/']);
      }
      else if (response['status'] == 'error') {
        this.errorMessage = response.data;
      }
    },
    error:(err) => {
      console.log(err)
      this.errorMessage = err.error.data;
    }
  
  })


  //   this.http.get('http://localhost:3000/users/loggedIn', {withCredentials: true}).subscribe((response) => {
  //   console.log(response)
  // })
    
  }

}
