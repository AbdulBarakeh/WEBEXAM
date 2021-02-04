import { HttpClient, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styles: [
    `
    .fullwidth{
      width: 100%;
    }
    @media only screen and (max-width: 1000px) {
      .padding{
        padding: 5px;
      }
    }


    `
  ]
})
export class CreateWorkoutComponent implements OnInit {
  workoutGet : Array<Object> = [];
  exercisePost: IExercise = new Exercise();
  WorkoutForm: FormGroup;
  ExerciseForm: FormGroup;
  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(){
    this.WorkoutForm = new FormGroup({
      workoutName: new FormControl(''),
    });
    this.ExerciseForm = new FormGroup({
      exerciseName: new FormControl(''),
      workoutNameSelect: new FormControl(''),
      exerciseDescription: new FormControl(''),
      exerciseSet: new FormControl(''),
      exerciseRep: new FormControl(''),
    });
    this.GetListofWorkoutNames();
  }

  onSubmitWorkout(){
    this.http.post('http://localhost:4000/workout/add',this.WorkoutForm.value).subscribe((data:any) => {
    console.dir(data)
  },(err: HttpErrorResponse) => console.log(`Got error: ${err.message}`));
  }

  onSubmitExercise(){
    this.http.post('http://localhost:4000/exercise/add',this.ExerciseForm.value).subscribe((data:any) => console.dir(data),(err: HttpErrorResponse) => console.log(`Got error: ${err}`));
  }
  GetListofWorkoutNames(){
    this.http.get('http://localhost:4000/workout/list').subscribe((data:any) =>  {
      data.workouts.forEach(element => {
        this.workoutGet.push(element.Name)
      });
    },(err: HttpErrorResponse) => console.log(`Got error: ${err}`));
  }

}
interface IExercise{
  ​
  workoutNameSelect: string
  exerciseName: string
  exerciseDescription: string​​
  exerciseRep: number
  exerciseSet: number
  ​
}
class Exercise{
  workoutNameSelect: string
  exerciseName: string
  exerciseDescription: string
  exerciseRep: number
  exerciseSet: number
}