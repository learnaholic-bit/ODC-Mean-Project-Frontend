import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //won't use this mostly
  @Input() loginStatus: boolean = false; // Define @Input property with default value
}
