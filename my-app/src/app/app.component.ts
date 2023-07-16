import { Component, OnInit } from '@angular/core';
import { Subject, timer } from 'rxjs';

declare global {
  interface Window {
    messages?: Subject<any>;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit(): void {
    const messages = this.getWindowMessages();
    
    timer(0, 1000).subscribe(() => {
      messages.next({ kaki: () => { console.log('kaki is good') } });
    });

    messages.subscribe(({ kaki }) => {
      kaki();
    });
  }

  private getWindowMessages(): Subject<any> {
    if (!window.top) {
      throw new Error('window.top is not defined');
    }

    if (!window.top['messages']) {
      window.top['messages'] = new Subject();
    }

    return window.top['messages'];
  }
}
