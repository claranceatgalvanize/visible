import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user-login.model";

@Injectable({
  providedIn: "root"
})
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  validateLogIn(user: User) {
    return this.http.post("/api/user/login", {
      username: user.username,
      password: user.password
    });
  }
}
