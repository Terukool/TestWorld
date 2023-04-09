import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

interface Item {
  id: number;
  name: string;
  category?: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  public selectedItem?: Item; 
  public items: Item[] = [
    { id: 1, name: 'Item 1', category: 'Category 1' },
    { id: 2, name: 'Item 2', category: 'Category 1' },
    { id: 3, name: 'Item 3', category: 'Category 1' },
    { id: 4, name: 'Item 4', category: 'Category 2' },
    { id: 5, name: 'Item 5', category: 'Category 2' },
    { id: 6, name: 'Item 6' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  isItem(item: unknown): item is Item {
    return typeof item === 'object' && item !== null && 'id' in item && 'name' in item;
  } 

}
