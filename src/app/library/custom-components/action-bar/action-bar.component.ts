import { IActionBarItem, ControlType, Alignment, IActionBarItemEventArgs } from 'src/app/shared/interfaces/action-bar-item.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'action-bar',
  templateUrl: './action-bar.component.html',
  styles: ['']
})
export class ActionBarComponent implements OnInit {

  @Input()
  public actionBarItems: IActionBarItem[];

  @Output()
  public actionBarItemClicked = new EventEmitter<IActionBarItemEventArgs>();

  controlType = ControlType;
  actionBarItemAlignment = Alignment;

  constructor() { }

  ngOnInit() {
  }

  emitEvent(event, action, data: IActionBarItem) {
    this.actionBarItemClicked.emit({ event, action, actionBarItem: data });
  }

  trackByMethod(index: number, el: any): number {
    return index;
  }

}
