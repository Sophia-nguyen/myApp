import {EventEmitter} from "angular2/core";
import {Map} from "immutable";
import {LOGIN_SUCCESS} from "../actions/loginActions";
import dispatcher from "../utils/dispatcher";

declare interface Payload {
    type: string;
    data: any;
}

export class LoginStore extends EventEmitter<string> {
    constructor() {
        super();

        var me = this;

        dispatcher.register((payload: Payload) => {
            switch (payload.type) {
                case LOGIN_SUCCESS:
                    console.log(payload.data);
                    me.emit("changed");
                    console.log('test');
                    break;
                default:
                    break;
            }
        }
    }
}