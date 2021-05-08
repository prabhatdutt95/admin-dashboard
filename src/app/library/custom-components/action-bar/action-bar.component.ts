/**
 * @author - Prabhat Dutt
 * @description - This is the generic component which is used to show operations done
 * on the user-list table in the footer.
 */
import {
  IActionBarItem,
  ControlType,
  Alignment,
  IActionBarItemEventArgs,
} from "src/app/shared/interfaces/action-bar-item.interface";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "action-bar",
  templateUrl: "./action-bar.component.html",
  styles: [""],
})
export class ActionBarComponent implements OnInit {
  @Input()
  public actionBarItems: IActionBarItem[];

  @Output()
  public actionBarItemClicked = new EventEmitter<IActionBarItemEventArgs>();

  controlType = ControlType;
  actionBarItemAlignment = Alignment;

  constructor() {}

  ngOnInit() {}

  /**
   * @description - This is used to emit the event, action, and the item on which action-bar operation is done.
   */
  emitEvent(event, action, data: IActionBarItem) {
    this.actionBarItemClicked.emit({ event, action, actionBarItem: data });
  }

  /**
   * @description - To track and return the index of actionBarItem.
   */
  trackByMethod(index: number, el: any): number {
    return index;
  }
}
