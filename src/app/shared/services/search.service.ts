import { Injectable, PipeTransform } from "@angular/core";
import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortDirection } from "../directives/sortable.directive";

interface SearchResult {
  users: UserInterface[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(
  users: UserInterface[],
  column: string,
  direction: string
): UserInterface[] {
  if (direction === "") {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(user: UserInterface, term: string, pipe: PipeTransform) {
  return (
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.role.toLowerCase().includes(term)
  );
}

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<UserInterface[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(private pipe: DecimalPipe) {}

  get users$() {
    return this._users$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(userList): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;

    // 1. sort
    let users = sort(userList, sortColumn, sortDirection);

    // 2. filter
    users = users.filter((country) => matches(country, searchTerm, this.pipe));
    const total = users.length;

    // 3. paginate
    users = users.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ users, total });
  }

  filterUsers(userList) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(userList)),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });

    this._search$.next();
  }
}
