import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DashboardComponent,CommonModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'employee';
  showDashboard = true;
  currentUrl: string = '';

  constructor(private router: Router,private location: Location) {
    this.currentUrl = this.router.url; // Gets the current URL
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      let url= (event as NavigationEnd).urlAfterRedirects;   
      if(url=='/'){
        this.showDashboard=true
      }else{
        this.showDashboard=false;
      }
      console.log('Soft navigation detectedssss:', (event as NavigationEnd).urlAfterRedirects);
    });
  
  }
  ngOnInit():void{
  }

  toggleDashboard() {
    this.showDashboard = false;
  }
}
