
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayRef, ViewportRuler } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, ApplicationRef, ElementRef } from '@angular/core';
import { MAT_SELECT_CONFIG, MatSelect } from '@angular/material/select';
import { BehaviorSubject, Subject } from 'rxjs';

interface Item {
  id: number;
  name: string;
  category?: string;
}

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.scss'],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'custom-panel' }
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTwoComponent implements OnInit, AfterViewInit {

  @ViewChild('select') select?: MatSelect;
  @ViewChild('target') target?: ElementRef;

  public selectedItem?: Item;
  public items: Item[] = [
    { id: 1, name: 'Item 1', category: 'Category 1' },
    { id: 2, name: 'Item 2', category: 'Category 1' },
    { id: 3, name: 'Item 3', category: 'Category 1' },
    { id: 4, name: 'Item 4', category: 'Category 2' },
    { id: 5, name: 'Item 5', category: 'Category 2' },
    { id: 6, name: 'Item 6' },
  ];
  public changed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  constructor(protected _viewportRuler: ViewportRuler, protected _changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.select?._openedStream.subscribe((opened) => {
    //   if (this.select?.panelOpen) {
    //     this.calculateTriggerWidth();
    //   }
    // });

    if (!this.select || !this.target) {
      return;
    }

    this.select._positions = [];

    this.select.trigger = this.target;

    // //@ts-ignore
    // const selectOverlay = this.select._overlayDir;

    // selectOverlay.origin = this.target;
    // this.calculateTriggerWidth();
  }

  // private watchTriggerWidth() {
  //   this._viewportRuler
  //     .change()
  //     .subscribe(() => {
  //       if (this.select?.panelOpen) {
  //         this.calculateTriggerWidth()

  //       }
  //     })
  // }

  private calculateTriggerWidth() {
    if (!this.select) {
      return;
    }

    const rect = this.target?.nativeElement.getBoundingClientRect();
    //@ts-ignore
    const selectOverlay: CdkConnectedOverlay = this.select._overlayDir;

    this.select._triggerRect = rect;
    this.select.trigger
    selectOverlay.minWidth = rect.width;
    selectOverlay.width = rect.width;
    selectOverlay.overlayRef.updateSize({ width: rect.width });

    this.select.stateChanges.next();
    this._changeDetectorRef.detectChanges();
    this.select.stateChanges.next();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.select?.panelOpen)
      this.calculateTriggerWidth();
  }
}
