import { Component, inject, OnInit } from '@angular/core';
import { LoginCheckService } from '../account/login-check.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  loginCheckService = inject(LoginCheckService);
  http = inject(HttpClient);
  createState: boolean = false;
  dataArray: any[] = [];
  keysArray: any[] = [];
  tableMode: string = "users";
  urlPath: any = {
    edit:{
      users: '/account/edit',
      menu: '/menu/edit'
  },

    delete:{
      users: '/account/delete',
      menu: '/menu/delete'
    },
    //for server requests
    getAll: {
      users: 'http://localhost:3000/users/getAllUsers',
      menu: 'http://localhost:3000/items/getItems'
    },
    add: {
      users: 'http://localhost:3000/users/register',
      menu: 'http://localhost:3000/items/addItem'
    }
  };

  ngOnInit(): void {
    this.loginCheckService.loginCheck();
    this.loginCheckService.sessionStorageAdminCheck();

    //request to the server
    this.getData()

  }
  
  onClick(tableMode: string, event: Event) {
    console.log(tableMode);
    this.tableMode = tableMode
    //change style of event.target
    let listItems = document.querySelectorAll('#titleHeaderRow th');
    listItems.forEach((item) => {
      item.classList.remove('table-active');
    })
    let element = event.target as HTMLLIElement;
    element.classList.add('table-active');


    //request to the server
    this.getData()


  }

  create(event: Event) {
    event.preventDefault();
    console.log(event.target);
    const element = event.target as HTMLElement
    element.classList.toggle('table-active')
    this.createState = element.classList.contains('table-active')
    console.log(this.createState);
    // this.http.get(this.urlPath.add[this.tableMode], {withCredentials: true}).subscribe((response : any) => {
    //   console.log(response);
    // })

  }

  createSubmit(event: Event) {
    event.preventDefault();
    console.log(event.target);
    const element = event.target as HTMLElement;
    element.classList.toggle('table-active');
    this.createState = element.classList.contains('table-active');
    console.log(this.createState);

    // Ensure the target is an HTMLFormElement
    if (event.target instanceof HTMLFormElement) {
      let form = new FormData(event.target);
      this.http.post(this.urlPath.add[this.tableMode], form, { withCredentials: true }).subscribe((response: any) => {
        console.log(response);
        if (response['status'] == 'success') {
          this.getData();
          this.createState = false;
        }
      });
    } else {
      console.error('The event target is not an HTMLFormElement.');
    }
  }

  getData(){
    this.http.get(this.urlPath.getAll[this.tableMode], {withCredentials: true}).subscribe((response : any) => {
      response.data.map((data: any) => {
        //some data filters 
        delete data.password
        delete data.__v
        // delete data._id
        return data
      })
      this.dataArray = response.data;
      // this.keysArray = Object.keys(this.dataArray[0]);
       // Get all unique keys from all objects in the array
      this.keysArray = Array.from(new Set(this.dataArray.flatMap(Object.keys)));
      console.log(this.dataArray);
      console.log(this.keysArray);
    })

  }
}
