/**
 * @author - Prabhat Dutt
 * @description - This is the generic component encapsulating 'user' component  and contains generic component
 * 'action-bar', which is used to show operations such as delete in the footer.
 */
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

  /**
   * @description - Initialising the action bar and populating the user-table.
  */
  ngOnInit() {
    this.createActionBar();
    this.getUsers();
  }
  createActionBar() {
    this.adminActionItems = ActionBarHelper.adminActionBarItems();
  }
  /**
   * @description - Subscribing to observable to get user-list as response.
  */
  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      users.forEach(user => {
        this.userList.push({...user, selected: false, isEditable: false});
      })
    })
  }
  /**
   * @description - Capture events for each operation on action-bar.
  */
  captureActionBarEvents(eventArgs: IActionBarItemEventArgs) {
    switch (+eventArgs.action) {
      case Action.Delete: {
        this.deleteUser();
      }
      default: {
        
      }
    }
  }
  /**
   * @description - Initialising the action bar and populating the user-table.
  */
  selectUser(selectedUser: UserInterface) {
    if(selectedUser.selected) {
      this.selectedUsers.push(selectedUser);
    } else if (!selectedUser.selected && this.selectedUsers.find(_ => _.id == selectedUser.id)) {
      this.selectedUsers = this.selectedUsers.filter(_ => _.id != selectedUser.id);
    }
  }
  /**
   * @description - For saving the selected user.
  */
  saveUser(selectedUser?: UserInterface) {
    this.userList.forEach(_ => {
      if(_.id == selectedUser.id) {
        _ = {...selectedUser};
      }
    })
    this.showSuccess('Succesfully updated the user details!');
  }
  /**
   * @description - This is used to delete the selected user by filtering the id through the array-iteration.
  */
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
  pageChange(e) {
    this.selectedUsers = [];
    this.userList.forEach(_ => {
      if(_.selected) {
        _.selected = false;
      }
    })
  }
}
