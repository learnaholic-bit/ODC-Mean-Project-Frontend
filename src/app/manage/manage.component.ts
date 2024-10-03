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
    getAll: {
      users: 'http://localhost:3000/users/getAllUsers',
      menu: 'http://localhost:3000/items/getAllItems'
    },
    add: {
      users: '/account/add',
      menu: '/menu/add'
    }
  };

  ngOnInit(): void {
    this.loginCheckService.loginCheck();
    this.loginCheckService.sessionStorageAdminCheck();

    //request to the server
    this.http.get('http://localhost:3000/users/getAllUsers', {withCredentials: true}).subscribe((response : any) => {
      response.data.map((data: any) => {
        //some data filters 
        delete data.password
        delete data.__v

        return data
      })
      this.dataArray = response.data;
      this.keysArray = Object.keys(this.dataArray[0]);
      console.log(this.dataArray);
      console.log(this.keysArray);
    })

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


  }



}
