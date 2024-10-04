import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginCheckService } from '../../account/login-check.service';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [],
  templateUrl: './menu-edit.component.html',
  styleUrl: './menu-edit.component.css'
})
export class MenuEditComponent {
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


    // get all catergories
    this.http.get('http://localhost:3000/items/getCategories', {withCredentials: true}).subscribe((response : any) => {
      this.catergoryList = response.data;
    })
      
      

    




  }



  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    
    this.data = new FormData(event.target as HTMLFormElement);
    
    // assuming cases are handled in the form fill and the backend simple submit is enough
    

    this.http.patch(`http://localhost:3000/items/updateItem/${this.queryId}` , this.data, {withCredentials: true})
    .subscribe({
      next:(response:any) => {
        this.showForm = false;

        console.log(response)
        if(response['status'] == 'Updated') {
          //successful update
          this.updateMessage = "Item Updated Successfully"
          // had to reget the item due to photo path
          this.http.get(`http://localhost:3000/items/getItem/${this.queryId}`, {withCredentials: true}).subscribe((response : any) => {
            this.ShowMenuItem = response.data

            //change the value for the inputs
            this.description = response.data.description;
            this.name = response.data.name;
            this.price = response.data.price;
            this.category = response.data.category;
            this.photoPath = response.data.photoPath;
            if (this.photoPath == '' || this.photoPath == null) {
              this.photoPath = './restaurant.png';
            }
            this.quantity = response.data.quantity;

            // console.log(response.data)
          })
        }
        else {
          this.updateMessage = "Item Update failed";
        }
      },
    error:(error) => {
      console.log(error);
      
      this.showForm = false;
      this.updateMessage = "Item Update failed";

    }
  })

    
    
  }

  previousPage() {
    this.location.back();
  }

  // reloadComponent(): void {
  //   const currentUrl = this.router.url;
  //   console.log(currentUrl);
  //   this.router.navigate([currentUrl], { replaceUrl: true });
  //   // this.router.navigate([currentUrl], {
  //   //   relativeTo: this.activatedRoute,
  //   //   queryParams: { reload: new Date().getTime() },
  //   //   queryParamsHandling: 'merge'
  //   // });
  // }



  updateShowMenuItem(item:any)
  {
    this.ShowMenuItem = item
  }

}


