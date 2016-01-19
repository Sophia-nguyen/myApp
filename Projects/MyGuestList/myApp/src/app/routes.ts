import {RouteDefinition} from 'angular2/router';
import {HomeComponent} from './components/home/homeComponent';
import {LoginComponent} from './components/login/loginComponent';

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/**', name:' ', component: HomeComponent, OtherwiseRouteComponent: 'Home' }
];
