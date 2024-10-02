import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AllComponent } from "./all/all.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, AllComponent, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  private httpClient = inject(HttpClient);
  items: any[] = []
  //later implement logic in the child but testing here before passing data
  private route = inject(ActivatedRoute);
  category = this.route.snapshot.queryParams['category']??"all";
  ngOnInit(): void {
    // console.log(this.route);
    // console.log(this.category);
    this.fetchAndUpdateItems(this.category);


    // #region change active link
    let element = document.querySelector(`li[category="${this.category}"]`);
    if(element) {
      //remove from the rest
      let listItems = document.querySelectorAll('li');
      listItems.forEach((item) => {
        item.classList.remove('activeLink');
      })

      element.classList.add('activeLink');
    }
    // #endregion



  }
  
  fetchAndUpdateItems(category:string = 'all') {
    this.httpClient.get('http://localhost:3000/items/getItems',{
      params: {
        category: category
      }
    }).subscribe((data:any) => {
      // console.log(data);
      if(data.status == 'success') {
        this.items = data.data;
        console.log(this.items);
      }
    })



    //intial testing here
    // this.items = [
    //   {
    //     name: 'Fried Eggs',
    //     description: 'Made with eggs, lettuce, salt, oil and other ingredients.',
    //     price: '$9.99',
    //     photoPath: 'https://via.placeholder.com/1000x200'
    //   }
    // ]

    
  }


  changeCategory(e:Event, functionCategory?:string) {
    // console.log(e);
    // this.category = (e.target as HTMLLIElement).textContent
    this.category = functionCategory ?? "all";
    console.log(this.category);

    // #region change active link
    let listItems = document.querySelectorAll('li');
    listItems.forEach((item) => {
      item.classList.remove('activeLink');
    })
    let element = e.target as HTMLLIElement;
    element.classList.add('activeLink');

    
    // #endregion

    // console.log(e.target);

    this.fetchAndUpdateItems(this.category);
    
  }




}
      
      
      
      
