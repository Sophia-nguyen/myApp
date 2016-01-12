import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig} from 'angular2/router';
import {APP_ROUTES} from './routes';
import {NavbarComponent} from './components/navbar';

@Component({
    selector: 'main-app',
    templateUrl: 'app/app.html',
    directives: [RouterOutlet, NavbarComponent]
})
@RouteConfig(APP_ROUTES)
export class App {
    
}
