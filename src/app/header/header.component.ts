import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  @Output() toggleDashboard = new EventEmitter<void>();
  @Input() showDashboard: boolean = false;
  // @Input() showDashboard: boolean = false; 
  // showDashboard=false
  ngOnInit(): void { 
  }
  onButtonClick(){
    this.toggleDashboard.emit(); 
    if(this.showDashboard){
      this.router.navigate(['/add']);  
    }else{
      this.router.navigate(['/']); 
    }
  }
  
  hideDashboard() {
    this.toggleDashboard.emit(); 
  }
}
