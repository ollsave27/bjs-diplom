"use strict"

let LogCBFunc = function (res) {
    if(res.success) {
        location.reload();
    }
    else {
        usForm.setLoginErrorMessage(res.error);
    }
}

let RegCBFunc = function (res) {
    if(res.success) {
        location.reload();
    }
    else {
        usForm.setRegisterErrorMessage(res.error);
    }
}

let usForm = new UserForm();

usForm.loginFormCallback = function (data) {
    ApiConnector.login(data, LogCBFunc);
}

usForm.registerFormCallback = function (data) {
    ApiConnector.register(data, RegCBFunc);
}