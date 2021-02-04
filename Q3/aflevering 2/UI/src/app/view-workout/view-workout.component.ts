import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { validateBasis } from "@angular/flex-layout";
import {} from "../services/auth/auth.service";
@Component({
  moduleId: "testingID",
  selector: "app-view-workout",
  templateUrl: "./test.component.html",
  styles: [
    `
      .exerciseheader {
        background-color: rgb(153, 153, 153);
      }
    `,
  ],
})
export class ViewWorkoutComponent implements OnInit {
  panelOpenState = false;
  workoutList: Array<workoutModel>;
  title: string;
  path: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {    
    this.path = this.activatedRoute.snapshot.url[0].path;
    this.workoutList = new Array();
  }

  ngOnInit(): void {
    if (this.path === "myworkouts") {
      if (this.authService.isUserSignIn()) {        
        this.getMyWorkouts();
      } else {
        this.title = "You need to be signed in to view your workouts";
      }
      // Path is allworkout
    } else {
      this.getAllWorkouts();
    }
  }

  public getAllWorkouts() {
    this.http
      .get<Array<workoutModel>>("http://localhost:4000/workout/listall")
      .subscribe((data: any) => {
        this.workoutList = []
        let response = data.workouts as Array<workoutModel>;
        response.forEach((x) => {
          this.workoutList.push(x);
        });
      });
  }

  public getMyWorkouts() {
    let req = this.http.get("http://localhost:4000/workout/list");        
    req.subscribe(
      (data: any) => {
        this.workoutList = []
        let response = data.workouts as Array<workoutModel>;
        response.forEach((x) => {
          this.workoutList.push(x);
        });
        console.log(data);
      },
      (error) => {
        error("Could not get myWorkouts");
      }
    );
  }
}

// Models
class workoutModel {
  _id: string;
  Name: string;
  Exercises: exercise[];
  constructor() {}
}

class exercise {
  name: string;
  description: string;
  numberOfSets: number;
  numberOfReps: number;
  constructor() {}
}
