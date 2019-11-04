import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';


const routes: Routes = [
    {
        path: '',
        component: IndexPage,
        children: [
            {
                path: 'welcome',
                loadChildren: './welcome/welcome.module#WelcomePageModule'
            },
            {
                path: 'signin',
                loadChildren: './signin/signin.module#SigninPageModule'
            },
            {
                path: 'signup',
                loadChildren: './signup/signup.module#SignupPageModule'
            },
            {
                path: '',
                redirectTo: 'welcome',
                pathMatch: 'full'
            }
        ]
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndexRoutingModudle {}