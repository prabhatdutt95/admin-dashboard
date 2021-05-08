import { Component, OnInit } from "@angular/core";
import { IActionBarItemEventArgs, Action } from "src/app/shared/interfaces/action-bar-item.interface";
import { ActionBarHelper } from "src/app/shared/Helpers/action-bar-helper.helper";
import { UserService } from "src/app/shared/services/user.service";
import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { ToastService } from "src/app/shared/services/toast.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styles: [""],
})
export class AdminComponent implements OnInit {
  adminActionItems;
  userList:UserInterface[] = [];
  selectedUsers:UserInterface[] = [];

  constructor(private userService: UserService, private toastService: ToastService) {}

  ngOnInit() {
    this.createActionBar();
    this.getUsers();
  }
  createActionBar() {
    this.adminActionItems = ActionBarHelper.adminActionBarItems();
  }
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      users.forEach(user => {
        this.userList.push({...user, selected: false, isEditable: false});
      })
    })
  }
  captureActionBarEvents(eventArgs: IActionBarItemEventArgs) {
    switch (+eventArgs.action) {
      case Action.Delete: {
        this.deleteUser();
      }
      default: {
        
      }
    }
  }
  selectUser(selectedUser: UserInterface) {
    if(selectedUser.selected) {
      this.selectedUsers.push(selectedUser);
    } else if (!selectedUser.selected && this.selectedUsers.find(_ => _.id == selectedUser.id)) {
      this.selectedUsers = this.selectedUsers.filter(_ => _.id != selectedUser.id);
    }
  }

  saveUser(selectedUser?: UserInterface) {
    this.userList.forEach(_ => {
      if(_.id == selectedUser.id) {
        _ = {...selectedUser};
      }
    })
    this.showSuccess('Succesfully updated the user details!');
  }
  deleteUser(selectedUser?: UserInterface) {
    if(selectedUser) {
      this.userList = this.userList.filter(_ => _.id != selectedUser.id);
    } else {
      this.selectedUsers.forEach(user => {
        this.userList = this.userList.filter(_ => _.id != user.id);
      })
      this.selectedUsers = [];
    }
    this.showSuccess('Succesfully deleted the user details!');
  }
  showSuccess(message) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 1000 });
    setTimeout(() => {this.toastService.remove()}, 2000)
  }
}
