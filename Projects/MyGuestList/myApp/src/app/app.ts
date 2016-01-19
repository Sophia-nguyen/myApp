import {Component, Injectable} from 'angular2/core';
import {RouterOutlet, RouteConfig} from 'angular2/router';
import {APP_ROUTES} from './routes';
import {NavbarComponent} from './components/navbar/navbar';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Injectable()
@Component({
    selector: 'main-app',
    templateUrl: './src/app/app.html',
    directives: [RouterOutlet, NavbarComponent],
    pipes: [TranslatePipe]
})
@RouteConfig(APP_ROUTES)
export class App {
    constructor(public translate: TranslateService) {
        var prefix = 'src/app/core/languages';
        var suffix = '.json';
        translate.useStaticFilesLoader(prefix, suffix);

        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

        // this trigger the use of the french or english language after setting the translations
        translate.use(userLang);
    }   
}
