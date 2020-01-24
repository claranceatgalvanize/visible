import { Component, OnInit } from "@angular/core";
import { LoginServiceService } from "../services/login/login-service.service";
import { User } from "../models/user-login.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private userLoginService: LoginServiceService) {
    this.user = new User();
  }
  ngOnInit() {}

  validateLogIn() {
    if (this.user.username && this.user.password) {
      this.userLoginService.validateLogIn(this.user).subscribe(
        res => {
          console.log("result is ", res);
        },
        err => {
          console.log("this is the ", err);
        }
      );
    } else {
      alert("You must provide a username and password!");
    }
  }
}
