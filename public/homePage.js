let lgBut = new LogoutButton();

let LogCBFunc = function(res) {
    if(res.success) {
        location.reload();
    }
}

let ShowCBFunc = function(res) {
    if(res.success) {
        ProfileWidget.showProfile(res.data);
    }
}

function ShowMes(res) {
    let mes = "Успех";
    if(!res.success) {
       mes = res.error;
    }
    MManager.setMessage(res.success, mes);
}

function ShowMes1(res) {
    let mes = "Успех";
    if(!res.success) {
       mes = res.error;
    }
    FvWidget.setMessage(res.success, mes);
}

let GetRBCBFunc = function(res) {
    if(res.success) {
        RtsBoard.clearTable();
        RtsBoard.fillTable(res.data);
    }
}

let AddBalancCBFunc = function(res) {
    if(res.success) {
        ProfileWidget.showProfile(res.data);
    }
    ShowMes(res);
}

let AddBalancReq = function(data) {
    ApiConnector.addMoney(data, AddBalancCBFunc);
}

let ConvMoneyCBFunc = function(res) {
    if(res.success) {
        ProfileWidget.showProfile(res.data);
    }
    ShowMes(res);
}

let ConvMoneyReq = function(data) {
    ApiConnector.convertMoney(data, ConvMoneyCBFunc);
}

let TransMoneyCBFunc = function(res) {
    if(res.success) {
        ProfileWidget.showProfile(res.data);
    }
    ShowMes(res);
}

let TransMoneyReq = function(data) {
    ApiConnector.transferMoney(data, TransMoneyCBFunc);
}

let GetFvWdCBFunc = function(res) {
    if(res.success) {
        FvWidget.clearTable();
        FvWidget.fillTable(res.data);
        MManager.updateUsersList(res.data);
    }
}

let AddFvCBFunc = function(res) {
    GetFvWdCBFunc(res);
    ShowMes1(res);
}

let AddFvReq = function(data) {
    ApiConnector.addUserToFavorites(data, AddFvCBFunc);
}

let RemovFvReq = function(data) {
    ApiConnector.removeUserFromFavorites(data, AddFvCBFunc);
}

let LgFunc = function() {
    ApiConnector.logout(LogCBFunc);
}

lgBut.action = () => {
    LgFunc();
}


ApiConnector.current(ShowCBFunc);

let RtsBoard = new RatesBoard();

ApiConnector.getStocks(GetRBCBFunc);

setInterval(() => ApiConnector.getStocks(GetRBCBFunc), 60000);

let MManager = new MoneyManager();

MManager.addMoneyCallback = AddBalancReq;

MManager.conversionMoneyCallback = ConvMoneyReq;

MManager.sendMoneyCallback = TransMoneyReq;

let FvWidget = new FavoritesWidget();

ApiConnector.getFavorites(GetFvWdCBFunc);

FvWidget.addUserCallback = AddFvReq;

FvWidget.removeUserCallback = RemovFvReq;