import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from 'src/app/shared/directives/sortable.directive';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { AdminComponent } from '../admin/admin.component';
import { HomeRoutingModule } from '../home-routing.module';

const selectedUser = {
  "id": "1",
  "name": "Aaron Miles",
  "email": "aaron@mailinator.com",
  "role": "member",
  selected: true, isEditable: true
}
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the select user function', () => {
    component.selectUser(selectedUser)
    expect(component.selectUser).toBeDefined();
  });
  it('should have the edit user function', () => {
    component.saveUser(selectedUser)
    expect(component.saveUser).toBeDefined();
  });
  it('should have the delete user function', () => {
    component.deleteUser(selectedUser)
    expect(component.deleteUser).toBeDefined();
  });
  it('should have the onPageChange function', () => {
    component.onPageChange('')
    expect(component.onPageChange).toBeDefined();
  });
  it('should have the sort function', () => {
    component.onSort({column:'name', direction:'asc'})
    expect(component.onSort).toBeDefined();
  });
  it('should have the onPageChange function', () => {
    component.ngOnChanges(
      {usersRes: 
        {
          previousValue: [],
          currentValue: [selectedUser],
          isFirstChange: () => {return false},
          firstChange: false}
      })
    expect(component.ngOnChanges).toBeDefined();
  });
});
