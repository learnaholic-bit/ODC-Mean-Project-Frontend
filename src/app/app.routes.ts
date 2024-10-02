import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AllComponent } from './menu/all/all.component';
import { BreakfastComponent } from './menu/breakfast/breakfast.component';
import { MainDishesComponent } from './menu/main-dishes/main-dishes.component';
import { DrinksComponent } from './menu/drinks/drinks.component';
import { DesertsComponent } from './menu/deserts/deserts.component';
import { AccountComponent } from './account/account.component';
import { ManageComponent } from './manage/manage.component';

export const routes: Routes = [
{
    path: '',
    component: HomeComponent
},
{
    path: 'home',
    redirectTo: ''
},
{
    path: 'menu',
    component: MenuComponent,
    // children: [
    //     {
    //         path: '',
    //         component:AllComponent
    //     },
    //     {
    //         path: 'breakfast',
    //         component: BreakfastComponent
    //     },
    //     {
    //         path: 'main',
    //         component: MainDishesComponent
    //     },
    //     {
    //         path: 'drinks',
    //         component: DrinksComponent
    //     },
    //     {
    //         path: 'desserts',
    //         component: DesertsComponent
    //     },
    //     {
    //         path: '**',
    //         redirectTo: ''
    //     }
    // ]
},
// {
//     path: 'about',
//     component:
// }
// ,

{
    path: 'account',
    component: AccountComponent
},
{
    path: 'manage',
    component: ManageComponent
},
{
    path: '**',
    redirectTo: ''
}




    
];
