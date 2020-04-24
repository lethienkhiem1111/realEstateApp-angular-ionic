import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MotelLeasesPage } from './motel-leases.page';

const routes: Routes = [
  {
    path: '',
    component: MotelLeasesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MotelLeasesPage]
})
export class MotelLeasesPageModule {}
