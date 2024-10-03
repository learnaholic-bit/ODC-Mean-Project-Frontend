import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  private httpClient = inject(HttpClient)
  private router = inject(Router)
  constructor() {}


  public loginCheck = () => {

    if (sessionStorage.getItem('currentLoggedIn') == 'false') {
      // this.currentLoggedIn = false;
      this.router.navigate(['/account/login']);
    }

    // not sure from the verfication logic and couldn't care more at this point

    this.httpClient.get('http://localhost:3000/users/loggedIn',{withCredentials: true}).subscribe({
      next: (data:any) => {
        // console.log(data);
        if(data.status == 'success') {
          sessionStorage.setItem('currentLoggedIn', true.toString());
          // console.log(data);
          sessionStorage.setItem('role', data.data);
          // this.router.navigate(['/account/']);
        }
        else {
          //handle if replied with wrong response
          sessionStorage.setItem('currentLoggedIn', false.toString());
          this.router.navigate(['/account/login']);
        }
      },
    error: (error) => {
        console.log('Error Occured');
        console.log(error);
        sessionStorage.setItem('currentLoggedIn', false.toString());
        this.router.navigate(['/account/login']);
      }
    })

    
  }
  
  //must be used after logincheck for accurate results maybe better send a request
  //assuming the home would handle logincheck and forward
  public adminCheck = () => {
      this.httpClient.get('http://localhost:3000/users/loggedInAdmin',{withCredentials: true}).subscribe({
        next: (data:any) => {
          console.log(data);
          if(data.status == 'success') {
            sessionStorage.setItem('role', 'admin');
          }
          else {
            //handle if replied with wrong response
            this.router.navigate(['/account/']);          }
        },
        error: (error) => {
          console.log('Error Occured');
          console.log(error);
          this.router.navigate(['/account/']);
        }
      })
  }
  
  // public adminCheckBool : Promise<boolean> = new Promise<boolean>((resolve, reject) => {
  //   this.httpClient.get('http://localhost:3000/users/loggedInAdmin',{withCredentials: true}).subscribe({
  //     next: (data:any) => {
  //       // console.log(data);
  //       if(data.status == 'success') {
  //         sessionStorage.setItem('role', 'admin');
  //         resolve(true);
  //       }
  //       else {
  //         //handle if replied with wrong response
  //         resolve(false);
  //       }
  //     },
  //     error: (error) => {
  //       console.log('Error Occured');
  //       console.log(error);
  //       resolve(false);
  //     }
  //   })
    
  // })

 
  public adminCheckBool = async (): Promise<boolean> => {
    try {

      const response: any = await firstValueFrom(this.httpClient.get('http://localhost:3000/users/loggedInAdmin', { withCredentials: true }));
      console.log(response);
      if (response.status === 'success') {
        sessionStorage.setItem('role', response.data);
        return true;
      } else {
        // Handle if replied with wrong response
        return false;
      }
    } catch (error) {
      console.log('Error Occurred adminCheckBool');
      console.log(error);
      return false;
    }
  }

  public sessionStorageAdminCheck = () => {
    //assuming being called after logincheck
    if(sessionStorage.getItem('role') != 'admin') {
      this.router.navigate(['/account/']);
    }
  }






}
