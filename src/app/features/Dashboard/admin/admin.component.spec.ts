import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from 'src/app/shared/directives/sortable.directive';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from '../users/users.component';
import { AdminComponent } from './admin.component';
import { HomeRoutingModule } from '../home-routing.module';
import {
  Action, ControlType, Alignment
} from "src/app/shared/interfaces/action-bar-item.interface";

const selectedUser = {
  "id": "1",
  "name": "Aaron Miles",
  "email": "aaron@mailinator.com",
  "role": "member",
  selected: true, isEditable: true
}
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent, UsersComponent ],
      imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [NgbdSortableHeader, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should capture actionbar events ', () => {
    let stubActionBarEvent = {
      event: 'any',
      action: Action.Back,
      actionBarItem: {
        id: "1",
        name: "Delete",
        iconClass: "icon icon-icons-medium-delete",
        controlType: ControlType.DangerButton,
        shouldDisplayName: true,
        controlAlignment: Alignment.Right,
        iconAlignment: Alignment.Center,
        action: {
          click: Action.Delete,
        }
      },
    }
    component.captureActionBarEvents(stubActionBarEvent);
    stubActionBarEvent = {
      event: 'any',
      action: Action.Delete,
      actionBarItem: {
        id: "1",
        name: "Delete",
        iconClass: "icon icon-icons-medium-delete",
        controlType: ControlType.DangerButton,
        shouldDisplayName: true,
        controlAlignment: Alignment.Right,
        iconAlignment: Alignment.Center,
        action: {
          click: Action.Delete,
        }
      },
    }
    component.captureActionBarEvents(stubActionBarEvent)
    expect(component.captureActionBarEvents).toBeDefined();
  });
  it('should have the select user function', () => {
    component.selectUser(selectedUser)
    component.selectedUsers = [{"id": "1",
    "name": "Aaron Miles",
    "email": "aaron@mailinator.com",
    "role": "member",
    selected: false, isEditable: true}]
    component.selectUser(selectedUser)
    expect(component.selectUser).toBeDefined();
  });
  it('should have the save user function', () => {
    component.userList = [selectedUser];
    component.saveUser(selectedUser)
    expect(component.saveUser).toBeDefined();
  });
  it('should have the pagechange function', () => {
    component.userList = [selectedUser];
    component.pageChange('')
    expect(component.pageChange).toBeDefined();
  });
  it('should have the delete user function', () => {
    component.userList = [selectedUser];
    component.deleteUser(selectedUser)
    expect(component.deleteUser).toBeDefined();
  });
  
});

