import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { HttpClient } from '@angular/common/http';
import { LoginCheckService } from './login-check.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AccountDetailsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  // currentLoggedIn: boolean = false; // Example logic variable;
  // private router = inject(Router);
  // private httpClient = inject(HttpClient);
  private loginCheckService = inject(LoginCheckService);
  // constructor(loginCheckService: LoginCheckService) { }

  ngOnInit(): void {
    this.loginCheckService.loginCheck();
    // this.router.navigate(['/account/']);
  }



}
