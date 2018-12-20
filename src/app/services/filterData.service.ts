import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterDataService {
  data: any
  private filterData = new BehaviorSubject([]);
  currentData = this.filterData.asObservable();
  constructor() {
    this.currentData.subscribe((response: any) => this.data = response)
  }

  changeData(data: any) {
    this.filterData.next(data)
  }
}