import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {CrazyAction, CrazyButtonComponent} from 'crazy-buttons-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public title: string = 'my-quest-test-task';
  public targetContainer$: Subject<ViewContainerRef> = new Subject<ViewContainerRef>();
  public _clickCount: number = 0;
  public customActions: CrazyAction[] = [
    new CrazyAction(`Clicked ${this._clickCount} times!`, this.clickCounter.bind(this)),
  ];
  @ViewChild('targetContainer', {read: ViewContainerRef}) private targetContainerRef: ViewContainerRef;

  public ngAfterViewInit(): void {
    this.targetContainer$.next(this.targetContainerRef);
    this.targetContainer$.complete();
  }

  private clickCounter(button: CrazyButtonComponent): void {
    this._clickCount++;
    button.title = `Clicked ${this._clickCount} times!`;
  }
}
