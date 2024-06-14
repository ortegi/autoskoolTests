import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsFormsService } from '../validators-forms.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [ValidatorsFormsService]
})
export class RegisterComponent {

  submitted = false;

  formu: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni : new FormControl(''),
    correo: new FormControl(''),
    telefono : new FormControl(''),
    contraseñaForm : new FormGroup({
      ps1: new FormControl(''),
      ps2: new FormControl('')
    })
  })

  constructor(private fb: FormBuilder, 
    private validadores : ValidatorsFormsService,
     private userData : UserDataService,
     private router: Router
     ){
    this.formu = this.fb.group({
      nombre : ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      contraseñaForm : this.fb.group({
        ps1 : ['', [Validators.required, Validators.minLength(6)]],
        ps2: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validator: this.validadores.confirmPassword()
      })
    })
  }

  get NombreNoValido(){
    return this.formu.get('nombre').invalid && this.formu.get('nombre').touched || this.formu.get('nombre').invalid && this.submitted === true
  }
  
  guardar(){
    this.submitted = true;
    console.log(this.formu)
    if(this.formu.valid){
      this.userData.register(this.formu);
      this.router.navigate(['/'])
      
    }


 
   

  }
  
  
  get ApellidoNoValido(){
    return this.formu.get('apellido').invalid && this.formu.get('apellido').touched || this.formu.get('apellido').invalid && this.submitted === true
  }

  get CorreoNoValido(){
    return this.formu.get('email').invalid && this.formu.get('email').touched || this.formu.get('email').invalid && this.submitted === true
  }

  get DniNoValido(){
    return this.formu.get('dni').invalid && this.formu.get('dni').touched || this.formu.get('dni').invalid && this.submitted === true
  }



  get ValidPassword(){
    const control = this.formu.get('contraseñaForm');
    return control.invalid && control.touched
  }




}



