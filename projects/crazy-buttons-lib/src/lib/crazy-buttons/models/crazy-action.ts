import {CrazyButtonComponent} from '../components/crazy-button/crazy-button.component';

export class CrazyAction {
  public title: string;
  public action: (button: CrazyButtonComponent) => void;

  constructor(title: string, action: (button: CrazyButtonComponent) => void) {
    this.title = title;
    this.action = action;
  }
}
