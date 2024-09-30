import { Component } from '@angular/core';
import { LandingSectionComponent } from "./landing-section/landing-section.component";
import { MenuBrowse1Component } from "./menu-browse1/menu-browse1.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingSectionComponent, MenuBrowse1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
