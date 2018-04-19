import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  btnSearchUser: string = 'Search User';
  name: string = '';
  phoneNumber: number;
  email: string = '';
  city: string = '';
  companyName: string = '';
  website: string = '';
  userFound: boolean;
  users: any[];

  constructor(private httpClient: HttpClient) { }

  onNameKeyUp(event: any) {
    this.email = event.target.value;
    this.userFound = false;
  }
  ngOnInit() {
    this.httpClient.get(`https://jsonplaceholder.typicode.com/users`)
    .subscribe(
      (data: any[]) => {
        if(data.length) {
          this.users = data;
          this.users.slice(0);
          this.users.sort(function(a, b) {
              var x = a.name.toLowerCase();
              var y = b.name.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
          });
        }
      }
    )
  }
  getUserProfile() {
    this.httpClient.get(`https://jsonplaceholder.typicode.com/users/?email=${this.email}`)
    .subscribe(
      (data: any[]) => {
        if(data.length) {
          this.name = data[0].name;
          this.city = data[0].address.city;
          this.phoneNumber = data[0].phone;
          this.companyName = data[0].company.name;
          this.website = data[0].website;
          this.userFound = true;
        }
      }
    )
  }
}
