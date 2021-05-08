import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomControlsModule } from '../custom-controls/custom-controls.module';
import { ActionBarComponent } from './action-bar/action-bar.component';


@NgModule({
  declarations: [NavbarComponent, ActionBarComponent],
  imports: [
    CommonModule,
    CustomControlsModule
  ],
  exports: [
    NavbarComponent,
    ActionBarComponent
  ]
})
export class CustomComponentsModule { }
