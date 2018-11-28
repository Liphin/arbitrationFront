/**
 * Created by Administrator on 2018/2/28.
 */

var overallModule = angular.module('Angular');

overallModule.config(function ($routeProvider, $httpProvider, $sceDelegateProvider) {

    $routeProvider
        .when('/login/home', {
            templateUrl: 'src/login/tmpl/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/arbitration/list', {
            templateUrl: 'src/arbitration/list/tmpl/index.html',
            controller: 'ArbiListCtrl',
            controllerAs: 'arbilist',
            // resolve: {
            //     check: function (OverallSer) {
            //         return OverallSer.processLogonStatus(20, '/login/home');
            //     }
            // }
        })
        .when('/arbitration/edit', {
            templateUrl: 'src/arbitration/edit/tmpl/index.html',
            controller: 'ArbiEditCtrl',
            controllerAs: 'arbiedit',
            // resolve: {
            //     check: function (OverallSer) {
            //         return OverallSer.processLogonStatus(20, '/login/home');
            //     }
            // }
        })
        .otherwise({redirectTo: '/login/home'});

    //部署拦截器，每次http请求，会经过拦截器方法后再往下传
    $httpProvider.interceptors.push('interceptHttp');
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '**'
    ]);
});