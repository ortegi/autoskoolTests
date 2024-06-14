import { Component, OnInit } from '@angular/core';
import { Test } from '../../../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  userTests: Test[] = []
  
  
  ngOnInit(): void {
    this.getTests()
  }

  
  getTests(){
    const userTests = localStorage.getItem("userTests");
    if(userTests){
      this.userTests  = JSON.parse(userTests)
    }
  }

}
