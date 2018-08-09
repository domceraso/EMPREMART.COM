import { Component, OnInit } from '@angular/core';

@Component({templateUrl: 'home.component.html'})

export class UserRolesComponent {
    
roles:any;
selected:any;

constructor() {
    this.roles = [
        'Promoter',
        'Buyer'
    ];
}
select(item) {
    this.selected = item;
};
isActive(item) {
    return this.selected === item;
};
}