import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  // { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',canLoad: [AuthGuard] },
  // { path: 'real-estate-post', loadChildren: './real-estate-posts/real-estate-post.module#RealEstatePostsPageModule' },
  // { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  // { path: 'properties', loadChildren: './properties/properties.module#PropertiesPageModule' },
  // { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  // { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  // { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'detail-post', loadChildren: './real-estate-posts/detail-post/detail-post.module#DetailPostPageModule' },
  // { path: 'houses', loadChildren: './properties/houses/houses.module#HousesPageModule' },
  // { path: 'lands', loadChildren: './properties/lands/lands.module#LandsPageModule' },
  // { path: 'create-post', loadChildren: './real-estate-posts/create-post/create-post.module#CreatePostPageModule' },
  // { path: 'edit-post', loadChildren: './real-estate-posts/edit-post/edit-post.module#EditPostPageModule' },
  // { path: 'new-post', loadChildren: './real-estate-posts/new-post/new-post.module#NewPostPageModule' },
  // { path: 'signin', loadChildren: './index/signin/signin.module#SigninPageModule' },
  // { path: 'welcome', loadChildren: './index/welcome/welcome.module#WelcomePageModule' },
  // { path: 'signup', loadChildren: './index/signup/signup.module#SignupPageModule' },

  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
