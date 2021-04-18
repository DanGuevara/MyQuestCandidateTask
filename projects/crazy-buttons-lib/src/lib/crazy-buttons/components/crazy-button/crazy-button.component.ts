import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'lib-crazy-button',
  templateUrl: './crazy-button.component.html',
  styleUrls: ['./crazy-button.component.scss'],
})
export class CrazyButtonComponent implements OnInit {

  @Input()
  public title: string = 'Click me!';

  @Input()
  public action: () => void;

  @Input()
  public id: number;

  @Input()
  public set color(value: string) {
    this._color = value;
  }

  public get color(): string {
    return `crazy-button__${this._color}`;
  }

  public isHidden: boolean;
  public isTouched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _color: string;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public click(): void {
    this.isTouched$.next(true);
    this.action();
  }

  public hide(): void {
    this.isHidden = true;
  }
}


