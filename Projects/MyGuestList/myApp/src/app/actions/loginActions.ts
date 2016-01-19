import dispatcher from "../utils/dispatcher";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export class LoginActions {

    constructor() {
    }

    login(data) {
        dispatcher.dispatch({
            type: LOGIN_SUCCESS,
            data: data
        });
    }
}
