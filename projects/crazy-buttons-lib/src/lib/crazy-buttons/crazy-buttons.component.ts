import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CrazyButtonComponent} from './components/crazy-button/crazy-button.component';
import {WeatherApiService} from './services/weather-api/weather-api.service';
import {catchError, map, takeUntil} from 'rxjs/operators';
import {ICurrentWeatherResponse} from './services/weather-api/models/current-weather-response.interface';
import {Observable, of, Subject} from 'rxjs';
import {CrazyAction} from './models/crazy-action';
import {ICurrentWeather} from './services/weather-api/models/current-weather.interface';

@Component({
  selector: 'lib-crazy-buttons',
  templateUrl: './crazy-buttons.component.html',
  styleUrls: ['./crazy-buttons.component.scss'],
  providers: [
    WeatherApiService,
  ]
})
export class CrazyButtonsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public buttonsCount: number = this.getRandomNumber(3, 5);

  @Input()
  public targetContainer$: Observable<ViewContainerRef>;

  @Input()
  public extraActions: CrazyAction[] = [];

  public actions: CrazyAction[] = [
    new CrazyAction('Hide me!', this.hideButton.bind(this)),
    new CrazyAction('Create new!', this.createCrazyButton.bind(this)),
    new CrazyAction('Remove untouched!', this.removeUntouchedButton.bind(this)),
    new CrazyAction('Show weather in Tokyo!', this.displayTokyoWeather.bind(this)),
    new CrazyAction('Change color!', this.changeColor.bind(this)),
  ];

  public colors: string[] = [
    'red',
    'green',
    'blue',
    'purple',
  ];

  @ViewChild('container', {read: ViewContainerRef})
  private container: ViewContainerRef;

  private buttons: CrazyButtonComponent[] = [];

  private targetContainer: ViewContainerRef;

  private destroy$: Subject<void> = new Subject();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private weatherApiService: WeatherApiService) {
  }

  public ngOnInit(): void {
    this.actions = this.actions.concat(this.extraActions);
  }

  public ngAfterViewInit(): void {
    if (this.targetContainer$) {
      this.targetContainer$.pipe().subscribe((container: ViewContainerRef) => {
        this.targetContainer = container;
        this.initCrazyButtons();
      });
    } else {
      this.initCrazyButtons();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initCrazyButtons(): void {
    for (let i: number = 0; i < this.buttonsCount; i++) {
      this.createCrazyButton();
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private createCrazyButton(): void {
    const notGeneratedActions: CrazyAction[] = this.actions.filter(
      (item: CrazyAction) => !this.buttons.map((button: CrazyButtonComponent) => button.title).includes(item.title));
    // If we have actions which are not presented yet, select from them. Otherwise select random action from all variants
    const missingActionsArray: CrazyAction[] = notGeneratedActions.length > 0 ? notGeneratedActions : this.actions;

    const actionIndex: number = this.getRandomNumber(0, missingActionsArray.length - 1);
    const colorIndex: number = this.getRandomNumber(0, this.colors.length - 1);

    const componentFactory: ComponentFactory<CrazyButtonComponent> = this.componentFactoryResolver.resolveComponentFactory(CrazyButtonComponent);
    const targetPlace: ViewContainerRef = this.targetContainer || this.container;
    const component: ComponentRef<CrazyButtonComponent> = targetPlace.createComponent(componentFactory);

    component.instance.title = missingActionsArray[actionIndex].title;
    component.instance.color = this.colors[colorIndex];
    component.instance.id = Date.now();
    component.instance.action = () => missingActionsArray[actionIndex].action(component.instance);

    this.buttons.push(component.instance);
  }

  private hideButton(button: CrazyButtonComponent): void {
    button.hide();
    const index: number = this.buttons.findIndex((item: CrazyButtonComponent) => item.id === button.id);
    this.buttons.splice(index, 1);
  }

  private removeUntouchedButton(): void {
    const buttonToRemove: CrazyButtonComponent = this.buttons.find((item: CrazyButtonComponent) => item.isTouched$.getValue() === false);
    if (buttonToRemove) {
      this.hideButton(buttonToRemove);
    } else {
      alert('Sorry! No untouched button found :(');
    }
  }

  private displayTokyoWeather(): void {
    this.weatherApiService.getCurrentWeatherByCity('Tokyo').pipe(
      map((result: ICurrentWeatherResponse) => result.current),
      catchError((error: any) => of(null)),
      takeUntil(this.destroy$),
    )
      .subscribe((weather: ICurrentWeather) => {
        if (weather && weather.temp_c) {
          alert(`Current temperature in Tokyo is ${weather.temp_c} C`);
        } else {
          alert('Error while receiving temperature. Please, try again later.');
        }
      });
  }

  private changeColor(button: CrazyButtonComponent): void {
    const colorIndex: number = this.getRandomNumber(0, this.colors.length - 2);
    button.color = this.colors.filter((color: string) => !button.color.includes(color))[colorIndex];
  }
}
