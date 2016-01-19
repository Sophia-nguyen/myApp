import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'home',
    templateUrl: './src/app/components/home/homeView.html',
    styleUrls: [
        'src/app/components/home/home.css'
    ],
    pipes: [TranslatePipe]
})
export class HomeComponent {
}
