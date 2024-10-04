import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { LoginCheckService } from '../../account/login-check.service';

@Component({
  selector: 'app-menu-item-delete',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-delete.component.html',
  styleUrl: './menu-item-delete.component.css'
})
export class MenuItemDeleteComponent {
  loginCheckService = inject(LoginCheckService);
  activatedRoute = inject(ActivatedRoute);
  params: Params | null = null;
  queryId: string | null = null;
  router = inject(Router);
  http = inject(HttpClient);
  location = inject(Location);
  data: any = new FormData();
  showForm: boolean = true;
  updateMessage: string = '';

  // realised i should have grouped it into one object after finish the code
  description: string = '';
  name: string = '';
  price: string = '';
  category: string = 'main';
  catergoryList: string[] = [];
  photoPath: string = '';
  quantity: number = 0;

  ShowMenuItem: any = {
    name: '',
    description: '',
    price: '',
    category: '',
    photoPath: '',
    quantity: 0
  }


  ngOnInit(): void {
    //checklogin
    this.loginCheckService.loginCheck();
    this.loginCheckService.adminCheck();
    
    
    // query params map
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.queryId = params['id'];
      console.log(this.queryId);
    });


    
      // if admin then show user profile by id
      // assuming id would be empty to be the admin profile
      console.log('Admin');
      console.log(this.queryId);
      // map user data here as query is provided and is admin
      this.http.get(`http://localhost:3000/items/getItem/${this.queryId}`, {withCredentials: true}).subscribe({
        next:(response : any) => {
          //map admin data here
          console.log(response.data)
          this.ShowMenuItem = response.data
          this.description = response.data.description;
          this.name = response.data.name;
          this.price = response.data.price;
          this.category = response.data.category;
          this.photoPath = response.data.photoPath;
          if (this.photoPath == '' || this.photoPath == null) {
            this.photoPath = './restaurant.png';
          }
          this.quantity = response.data.quantity;
        },
        error:(error) => {
          console.log(error);
          
          this.updateMessage = "item Not Found"
          this.showForm = false;
        }
    
    })
}



  delete(event: Event) {
    event.preventDefault();
    console.log(event.target);
    
    
    
    // assuming cases are handled in the form fill and the backend simple submit is enough
    // console.log(this.data.get('password'));
    

    this.http.delete(`http://localhost:3000/items/deleteItem/${this.queryId}` , {withCredentials: true})
    .subscribe({
      next:(response:any) => {
        this.showForm = false;

        console.log(response)
        if(response['status'] == 'Deleted') {
          //successful update
          console.log("Deleted")
          this.updateMessage = "Item Deleted Successfully";
        }
        else {
          this.updateMessage = "Item Delete failed";
        }
      },
    error:(error) => {
      console.log(error);
      
      this.showForm = false;
      this.updateMessage = "Item Delete failed";

    }
  })

    
    
  }


  previousPage() {
    this.location.back();
  }


}




