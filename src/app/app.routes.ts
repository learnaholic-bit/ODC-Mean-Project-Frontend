import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { ManageComponent } from './manage/manage.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { EMPTY } from 'rxjs';
import { AccountDetailsComponent } from './account/account-details/account-details.component';
import { EditUserComponent } from './account/edit-user/edit-user.component';
import { DeleteComponent } from './account/delete/delete.component';

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
    component: AccountComponent,
    children: [
        {
            path: '',
            component: AccountDetailsComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        },
        {
            path: 'edit',
            component: EditUserComponent
        },
        {
            path: 'delete',
            component: DeleteComponent
        }
    ]
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
