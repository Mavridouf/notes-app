import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
})
export class MainContainerComponent implements OnInit {
  public showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public createNote(): void {
    this.showModal = true;
  }

  public closeModalEmitted(event: boolean) {
    this.showModal = false;
  }
}
