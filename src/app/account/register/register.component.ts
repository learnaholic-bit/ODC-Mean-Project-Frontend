import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //won't use this mostly
  private http = inject(HttpClient);
  usernameOrEmail: string = '';
  data: any = new FormData();
  router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    this.data = new FormData(event.target as HTMLFormElement);
    
    console.log(this.data.get('password'));
    this.http.post('http://localhost:3000/users/register', this.data, {withCredentials: true})
    .subscribe((response:any) => {
      console.log(response)
      if(response['status'] == 'success') {
        sessionStorage.setItem('currentLoggedIn', false.toString());
        this.router.navigate(['/account/']);
      }
    })
    this.http.get('http://localhost:3000/users/loggedIn', {withCredentials: true}).subscribe((response) => {
    console.log(response)
  })
    
  }

}
