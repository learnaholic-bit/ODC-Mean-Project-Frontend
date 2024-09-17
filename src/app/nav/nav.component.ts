import { Component } from '@angular/core';
import { NavtopComponent } from "./navtop/navtop.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NavtopComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
