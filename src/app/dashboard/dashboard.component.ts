import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  ngOnInit() {
    
    const hamburgerButton = document.getElementById('hamburger-button');
    const closeButton = document.getElementById('close-button');
    const sidebar = document.getElementById('sidebar');

    if (hamburgerButton) {
      hamburgerButton.addEventListener('click', () => {
        if (sidebar) {
          sidebar.classList.toggle('-translate-x-80');
        }
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (sidebar) {
          sidebar.classList.toggle('-translate-x-80');
        }
      });

  }
}
}
