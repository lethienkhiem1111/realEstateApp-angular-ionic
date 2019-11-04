import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';
import { IndexRoutingModudle } from './index-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexRoutingModudle
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
