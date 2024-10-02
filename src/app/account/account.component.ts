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
  currentLoggedIn: boolean = true; // Example logic variable;
  private router = inject(Router);
  private httpClient = inject(HttpClient);
 
  ngOnInit(): void {
    sessionStorage.setItem('currentLoggedIn', JSON.stringify(this.currentLoggedIn));
    // this.router.navigate(['/account/']);
  }

}
