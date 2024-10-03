import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { LoginCheckService } from '../login-check.service';
import { Location } from '@angular/common';


//should have factored set data function not a problem for now
@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  loginCheckService = inject(LoginCheckService);
  activatedRoute = inject(ActivatedRoute);
  params: Params | null = null;
  queryId: string | null = null;
  isAdmin: boolean = false;
  router = inject(Router);
  http = inject(HttpClient);
  location = inject(Location);
  showData: boolean = true;
  updateMessage: string = 'An error occured, please try again';

  id: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  role: string = '';
  photoPath: string = '';
  private submitOption: string = '';
  private editUserElement = document.getElementById('editUser');



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
        this.id = response.data._id;
        // this.password = response.data.password;
        //below no need but for safety
        this.role = response.data.role;
        this.photoPath = response.data.photoPath;
            if (this.photoPath == '' || this.photoPath == null) {
              this.photoPath = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }
        this.submitOption = 'userDelete';

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
          this.id = response.data._id;
          // this.password = response.data.password;
          this.role = response.data.role;
          this.photoPath = response.data.photoPath;
            if (this.photoPath == '' || this.photoPath == null) {
              this.photoPath = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }
          this.submitOption = 'adminDelete';
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
            this.id = response.data._id;
            // this.password = response.data.password;
            this.role = response.data.role;
            this.photoPath = response.data.photoPath;
            if (this.photoPath == '' || this.photoPath == null) {
              this.photoPath = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }
            this.submitOption = 'adminDeleteUser';
          },
          error:(error) => {
            console.log(error);
              this.updateMessage = "User Not Found";
              this.showData = false;
          }
      
      })
      }
      

    }




  }



  delete(event: Event) {
    event.preventDefault();
    console.log(event.target);
    
    
    
    // assuming cases are handled in the form fill and the backend simple submit is enough
    // console.log(this.data.get('password'));
    let updateString: string = '';
    //update himself 
    if (this.submitOption == 'userDelete' || this.submitOption == 'adminDelete') {
      updateString = "http://localhost:3000/users/deleteUser"
    }
    //update another user
    else if (this.submitOption == 'adminDeleteUser') {
      updateString = `http://localhost:3000/users/deleteUser/${this.queryId}`
    }
    //no string was found
    else {
      this.router.navigate(['/account']);
    }

    this.http.delete(updateString , {withCredentials: true})
    .subscribe({
      next:(response:any) => {
        this.showData = false;

        console.log(response)
        if(response['status'] == 'Deleted') {
          //successful update
          console.log("Deleted")
          this.updateMessage = "User Deleted Successfully";
        }
        else {
          this.updateMessage = "User Delete failed";
        }
      },
    error:(error) => {
      console.log(error);
      
      this.showData = false;
      this.updateMessage = "User Delete failed";

    }
  })

  // console.log(document.getElementById('editUser'));
    
    
  }


  previousPage() {
    this.location.back();
  }


}
