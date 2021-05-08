import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserInterface } from "src/app/shared/interfaces/user.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
  }
}
