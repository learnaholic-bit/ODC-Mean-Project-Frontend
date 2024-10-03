import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
  //won't use the input mostly
  // @Input() loginStatus: boolean = false; // Define @Input property with default value
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public loginStatus = sessionStorage.getItem('currentLoggedIn') == 'true' ? true : false;
  public adminStatus = sessionStorage.getItem('role') == 'admin' ? true : false;
  //constructor(private route: ActivatedRoute, private router: Router) { }

  photoPath : string = ''
  username : string = ''
  email : string = ''
  role : string = ''
  id : string = ''




  ngOnInit(): void {
    console.log('Account Details ib init');
    //update value of loginStatus and admin --> no need of this
    // this.loginStatus = sessionStorage.getItem('currentLoggedIn') == 'true' ? true : false;
    // this.adminStatus = sessionStorage.getItem('role') == 'admin' ? true : false;
    if (!this.loginStatus) {
      this.router.navigate(['/account/login']);
    }

    // here implementing  the request to the server to get the data

    this.http.get('http://localhost:3000/users/getUser', {withCredentials: true}).subscribe((response : any) => {
      console.log(response)
      if (response['status'] == 'success') {
        this.loginStatus = true;
        this.adminStatus = response.data.role == 'admin' ? true : false;
        sessionStorage.setItem('role', response.data.role);
        // sessionStorage.setItem('currentLoggedIn', true.toString());

        this.username = response.data.username;
        this.email = response.data.email;
        this.role = response.data.role;
        this.photoPath = response.data.photoPath;
        console.log(this.photoPath)
        if (this.photoPath == '' || this.photoPath == null) {
          this.photoPath = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        }
        this.id = response.data._id;


      }
    })

  }


  logout() {
    
    sessionStorage.setItem('currentLoggedIn', false.toString());
    sessionStorage.setItem('role', '');
    this.http.get('http://localhost:3000/users/logout', {withCredentials: true}).subscribe((response) => {
      // console.log(response)
    })
    this.router.navigate(['/account/login']);
  }
  

}
