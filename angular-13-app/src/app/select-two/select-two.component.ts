
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayRef, ViewportRuler } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, ApplicationRef, ElementRef, OnChanges, ContentChild, NgZone } from '@angular/core';
import { MAT_SELECT_CONFIG, MatSelect } from '@angular/material/select';
import { BehaviorSubject, Observable, Subject, delay, distinctUntilChanged, map, of, tap } from 'rxjs';

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
export class SelectTwoComponent implements AfterViewInit {

  @ViewChild('select') select?: MatSelect;

  private get overlayRef(): OverlayRef | undefined {
    //@ts-ignore
    return this.select?._overlayDir?.overlayRef;
  }

  public selectedItem?: Item[] = [];
  public items: Item[] = [
    { id: 1, name: 'Item 1', category: 'Category 1' },
    { id: 2, name: 'Item 2', category: 'Category 1' },
    { id: 3, name: 'Item 3', category: 'Category 1' },
    { id: 4, name: 'Item 4', category: 'Category 2' },
    { id: 5, name: 'Item 5', category: 'Category 2' },
    { id: 6, name: 'Item 6' },
  ];

  constructor(protected _viewportRuler: ViewportRuler, protected _changeDetectorRef: ChangeDetectorRef, private zone: NgZone) { }

  public positionStrategy$!: Observable<string>;

  ngAfterViewInit(): void {
    if (!this.select) {
      return;
    }

    this.select._positions = [];

    const resizeObserver = new ResizeObserver(() => {
      if (this.select?.panelOpen && this.overlayRef) {
        this.overlayRef.updatePosition();
        this.overlayRef.updateSize({ minWidth: this.select?.trigger?.nativeElement?.offsetWidth });
      }
    })

    resizeObserver.observe(this.select.trigger.nativeElement);

    this.trackOverlayOpeningPosition();
  }

  private trackOverlayOpeningPosition() {
    //@ts-ignore
    const positionChange$ = this.select?._overlayDir?.positionChange.asObservable();

    if (!positionChange$) {
      return;
    }

    this.positionStrategy$ = positionChange$.pipe(
      delay(0),
      map(({ connectionPair: { originY } }) => {
        return originY;
      }),
      distinctUntilChanged(),
      map((originY) => {
        const CLASS_PREFIX = 'open-';
        const openedAt = originY === 'top' ? 'above' : 'below';

        return `${CLASS_PREFIX}${openedAt}`;
      })
    );


    this.positionStrategy$.pipe(delay(0)).subscribe(() => {
      this._changeDetectorRef.detectChanges();
    }); // This is disgusting, but it's the only way I could get it to work, not sure why I need it
  }
}
