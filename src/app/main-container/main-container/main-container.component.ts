import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/services/filters/filters.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {
  public showModal: boolean = false;

  constructor(public noteService: FiltersService) {}

  ngOnInit(): void {}

  public createNote(): void {
    this.showModal = true;
  }

  public closeModalEmitted(event: boolean) {
    this.showModal = false;
  }
}
