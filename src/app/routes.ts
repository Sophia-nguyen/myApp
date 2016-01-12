import {RouteDefinition} from 'angular2/router';
import {HomeComponent} from './components/home';
import {LoginComponent} from './components/login';

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/login', name: 'Login', component: LoginComponent }
];
