import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RealEstatePostsPage } from './real-estate-posts.page';

const routes: Routes = [
  {
    path: '',
    component: RealEstatePostsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RealEstatePostsPage]
})
export class RealEstatePostsPageModule {}
