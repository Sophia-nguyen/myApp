import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';


import {App} from './app';

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    TranslateService,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
