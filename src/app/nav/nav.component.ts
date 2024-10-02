import { Component } from '@angular/core';
import { NavtopComponent } from "./navtop/navtop.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NavtopComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
