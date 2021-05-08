import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbdSortableHeader } from "src/app/shared/directives/sortable.directive";

import { SharedModule } from "../../shared/shared.module";
import { UsersComponent } from "./users/users.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [
    UsersComponent,
    AdminComponent,
    NgbdSortableHeader,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [UsersComponent],
})
export class HomeModule {}
