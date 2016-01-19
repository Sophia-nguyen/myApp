import {Component, Inject, OnInit, OnDestroy} from 'angular2/core';
import {LoginActions} from "../../actions/loginActions";
import {LoginStore} from "../../stores/loginStore";
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'login',
    providers: [LoginActions, LoginStore],
    templateUrl: './src/app/components/login/loginView.html',
    pipes: [TranslatePipe]
})

export class LoginComponent {
    private loginActions;
    private loginStore;
    model = {};

    constructor( @Inject(LoginActions) loginActions, @Inject(LoginStore) loginStore) {
        this.loginStore = loginStore;
        this.loginActions = loginActions;
    } 

    login(event) {
        this.loginActions.login(this.model);
    }
}