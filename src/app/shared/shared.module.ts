// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomComponentsModule } from "../library/custom-components/custom-components.module";
import { CustomControlsModule } from "../library/custom-controls/custom-controls.module";
import { UserService } from "src/app/shared/services/user.service";
import { DecimalPipe } from "@angular/common";
import { SearchService } from "src/app/shared/services/search.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, CustomComponentsModule, CustomControlsModule],
  exports: [CustomComponentsModule, CustomControlsModule],
  providers: [UserService, DecimalPipe, SearchService],
})
export class SharedModule {}
