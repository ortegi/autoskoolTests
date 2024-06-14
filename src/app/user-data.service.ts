import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() 
  { }

  userData: any;

  register(formu: FormGroup){
    const userData = {
      nombre: formu.get('nombre').value,
      apellido: formu.get('apellido').value,
      dni: formu.get('dni').value,
      contraseña: formu.get('contraseñaForm.ps1').value,
      email: formu.get('email').value.toLowerCase()

    }
    localStorage.setItem(formu.get('email').value, JSON.stringify(userData));

  }

  login(formu: FormGroup){
    const data = localStorage.getItem(formu.get('email').value.toLowerCase())
    const password = formu.get('password').value
    if(data != null){
      this.userData = JSON.parse(data)
      if(this.userData.contraseña === password){
        return 'ok'
      }else{
        return 'La contraseña no es correcta'
      }
    }else{
      return 'El usuario no existe'
    }
  }

}
