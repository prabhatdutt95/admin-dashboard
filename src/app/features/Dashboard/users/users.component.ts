/**
 * @author - Prabhat Dutt
 * @description - This component is used to display and
 * modify the user-list by filter, save and delete functionality.
 */
import {
  Component,
  SimpleChanges,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { SearchService } from "src/app/shared/services/search.service";
import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { Observable } from "rxjs";
import {
  NgbdSortableHeader,
  SortEvent,
} from "src/app/shared/directives/sortable.directive";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: [""],
})
export class UsersComponent implements OnInit {
  @Input() usersRes: UserInterface[];

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  users: Observable<UserInterface[]>;
  totalUsers: Observable<number>;
  placeholderRow = new Array(10).fill("");

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public searchService: SearchService) {}

  /**
   * @description - Initialising the user table.
  */
  ngOnInit() {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case "usersRes": {
            this.getUsers();
          }
        }
      }
    }
  }

  /**
   * @description - This is used to get the users after filtering.
   */
  getUsers() {
    this.searchService.filterUsers(this.usersRes);
    this.users = this.searchService.users$;
    this.totalUsers = this.searchService.total$;
  }

  /**
   * @description - This is used to sort the column in a particular direction.
   */
  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.searchService.sortColumn = column;
    this.searchService.sortDirection = direction;
  }
  /**
   * @description - This is used to emit the particular user for selection.
   */
  selectUser(selectedUser) {
    this.select.emit(selectedUser);
  }
  /**
   * @description - This is used to emit the particular user for deleting.
   */
  deleteUser(selectedUser) {
    this.delete.emit(selectedUser);
  }
  /**
   * @description - This is used to emit the particular user for saving.
   */
  saveUser(selectedUser) {
    this.save.emit(selectedUser);
  }
}
