import { Component, inject, OnInit } from '@angular/core';
import { LandingSectionComponent } from "./landing-section/landing-section.component";
import { MenuBrowse1Component } from "./menu-browse1/menu-browse1.component";
import { LoginCheckService } from '../account/login-check.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingSectionComponent, MenuBrowse1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // loginCheckService = inject(LoginCheckService);
  http = inject(HttpClient);


  ngOnInit(): void {
    this.http.get('http://localhost:3000/users/loggedIn').subscribe((response: any) => {
      console.log(response)
      sessionStorage.setItem('currentLoggedIn', 'true'.toString())
    })
  }

}
