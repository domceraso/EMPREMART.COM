import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `, 
  styleUrls: ['./_global/style.css'],
})
export class AppComponent { }