/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbiedit');

app.controller('ArbiEditCtrl', function (OverallDataSer,OverallGeneralSer,$cookies) {

    //检查是否有cookie或在本session里
    if (!OverallDataSer.overallData['loginStatus'] && $cookies.get('loginStatus') != 'success') {
        $location.path(OverallDataSer.redirect['loginHome']);
        return;

    } else {
        OverallDataSer.overallData['loginStatus'] = true;
        $cookies.put('loginStatus', 'success', {'expires': OverallGeneralSer.getNewCookiesExpireDate()});
    }

    //数据初始化操作
    var arbiedit = this;







});