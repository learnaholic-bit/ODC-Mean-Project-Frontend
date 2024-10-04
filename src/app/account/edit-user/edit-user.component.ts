import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginCheckService } from '../login-check.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  loginCheckService = inject(LoginCheckService);
  activatedRoute = inject(ActivatedRoute);
  params: Params | null = null;
  queryId: string | null = null;
  isAdmin: boolean = false;
  router = inject(Router);
  http = inject(HttpClient);
  location = inject(Location);
  data: any = new FormData();
  showForm: boolean = true;
  updateMessage: string = '';

  email: string = '';
  username: string = '';
  password: string = '';
  role: string = 'user';
  photoPath: string = '';
  private submitOption: string = '';

  async ngOnInit(): Promise<void> {
    //checklogin
    this.loginCheckService.loginCheck();
    this.isAdmin = await this.loginCheckService.adminCheckBool();
    
    // query params map
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
      this.queryId = params['id'];
      console.log(this.queryId);
    });



    // if not admin only show his profile
    if (!this.isAdmin) {
      // this.router.navigate(['/account/login']);
      console.log('Not Admin');
      this.http.get('http://localhost:3000/users/getUser', {withCredentials: true}).subscribe((response : any) => {
        this.email = response.data.email;
        this.username = response.data.username;
        // this.password = response.data.password;
        //below no need but for safety
        this.role = response.data.role;
        // this.photoPath = response.data.photoPath;
        this.submitOption = 'userUpdate';

      })
    }
    else {
      // if admin then show user profile by id
      // assuming id would be empty to be the admin profile
      console.log('Admin');
      console.log(this.queryId);
      if (!this.queryId) {
        this.http.get(`http://localhost:3000/users/getUser/`, {withCredentials: true}).subscribe((response : any) => {
          //map admin data here
          this.email = response.data.email;
          this.username = response.data.username;
          // this.password = response.data.password;
          this.role = response.data.role;
          // this.photoPath = response.data.photoPath;
          this.submitOption = 'adminUpdate';
          // console.log(response);
          console.log(this.isAdmin)
        })      
      }else{
        // map user data here as query is provided and is admin
        this.http.get(`http://localhost:3000/users/getUser/${this.queryId}`, {withCredentials: true}).subscribe({
          next:(response : any) => {
            //map admin data here
            this.email = response.data.email;
            this.username = response.data.username;
            // this.password = response.data.password;
            this.role = response.data.role;
            this.photoPath = response.data.photoPath;
            if (this.photoPath == '' || this.photoPath == null) {
              this.photoPath = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }
            this.submitOption = 'adminUpdateUser';
          },
          error:(error) => {
            console.log(error);
            
            this.updateMessage = "User Not Found"
            this.showForm = false;
          }
      
      })
      }
      

    }




  }



  onSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    
    this.data = new FormData(event.target as HTMLFormElement);
    
    // assuming cases are handled in the form fill and the backend simple submit is enough
    // console.log(this.data.get('password'));
    let updateString: string = '';
    //update himself 
    if (this.submitOption == 'userUpdate' || this.submitOption == 'adminUpdate') {
      updateString = "http://localhost:3000/users/updateUser"
    }
    //update another user
    else if (this.submitOption == 'adminUpdateUser') {
      updateString = `http://localhost:3000/users/updateuser/${this.queryId}`
    }
    //no string was found
    else {
      this.router.navigate(['/account/edit']);
    }

    console.log(this.data.get('email'));
    this.http.patch(updateString , this.data, {withCredentials: true})
    .subscribe({
      next:(response:any) => {
        this.showForm = false;

        console.log(response)
        if(response['status'] == 'Updated') {
          //successful update
          this.updateMessage = "User Updated Successfully"
        }
        else {
          this.updateMessage = "User Update failed";
        }
      },
    error:(error) => {
      console.log(error);
      
      this.showForm = false;
      this.updateMessage = "User Update failed";

    }
  })

  // console.log(document.getElementById('editUser'));
    
    
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

}
