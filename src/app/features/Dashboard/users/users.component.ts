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

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    console.log(this.usersRes)
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'usersRes': {
            this.getUsers()
          }
        }
      }
    }
  }

  getUsers() {
      this.searchService.filterUsers(this.usersRes);
      this.users = this.searchService.users$;
      this.totalUsers = this.searchService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.searchService.sortColumn = column;
    this.searchService.sortDirection = direction;
  }
  selectUser(selectedUser) {
    this.select.emit(selectedUser)
  }
  deleteUser(selectedUser) {
    this.delete.emit(selectedUser)
  }
  saveUser(selectedUser) {
    this.save.emit(selectedUser)
  }

}
