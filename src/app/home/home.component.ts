import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  /*constructor(private service : TestsService){
    var x = this.service.getRandomQuestionForATest()
    console.log(x)
  }*/
  submitted = false;
  loginFailed = null;

  formu: FormGroup = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  constructor(private fb: FormBuilder,
    private userData : UserDataService,
    private router: Router
    )
    {
      this.formu = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    
    login(){
      this.submitted = true;
      if(this.formu.valid){
        const response = this.userData.login(this.formu)
        if(response == 'ok'){
          this.router.navigate(['dashboard/main'])
        }else{
          this.loginFailed = response
        }
      }else{
        this.loginFailed = "Asegurate que has introducido los datos correctamente"
      }
        
    }

    get ValidPassword(){
      return this.formu.get('password').invalid && this.formu.get('password').touched || this.formu.get('password').invalid && this.submitted == true;
    }

    get ValidEmail(){
      return this.formu.get('email').invalid && this.formu.get('email').touched || this.formu.get('email').invalid && this.submitted == true;
    }
  
  }




