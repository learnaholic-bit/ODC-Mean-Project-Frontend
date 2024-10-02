import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
  //won't use the input mostly
  // @Input() loginStatus: boolean = false; // Define @Input property with default value
  private httpClient = inject(HttpClient);

  //constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    console.log('Account Details ib init');
    console.log(sessionStorage.getItem('currentLoggedIn') + "from details")
    // console.log(this.loginStatus);


    // here implementing  the request to the server to get the data


  }

  

}
