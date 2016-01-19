var dispatcher_1 = require("../utils/dispatcher");
exports.LOGIN_SUCCESS = "LOGIN_SUCCESS";
var LoginActions = (function () {
    function LoginActions() {
    }
    LoginActions.prototype.login = function (data) {
        dispatcher_1.default.dispatch({
            type: exports.LOGIN_SUCCESS,
            data: data
        });
    };
    return LoginActions;
})();
exports.LoginActions = LoginActions;
//# sourceMappingURL=loginActions.js.map