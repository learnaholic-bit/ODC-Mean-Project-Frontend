import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllComponent } from "./all/all.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, AllComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
