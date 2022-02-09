import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topWillGet: Transaction[] = [];
  topWillGive: Transaction[] = [];

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    // this.homeService.updateTopTrans()

    this.homeService.topWillGetUpdated.subscribe((topWillGet) => {
      this.topWillGet = topWillGet
      console.log('Top will get is' + this.topWillGet)
    });
    this.homeService.topWillGiveUpdated.subscribe((topWillGive) => {
      this.topWillGive = topWillGive;
      console.log('Top will give is' + this.topWillGive);
    });
  }

}
