/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

/**
 * 诉讼列表页面
 */
app.directive('arbiList', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/list.html'
    };
}]);

/**
 * 诉讼编辑页面
 */
app.directive('arbiEdit', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/edit.html'
    };
}]);


//-----------------------诉讼编辑页面的子页面设置----------------------------------------
/**
 * 编辑页面中代理人数据填写
 */
app.directive('editAgents', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/editsub/agents.html'
    };
}]);
/**
 * 编辑页面中声明数据填写
 */
app.directive('editClaim', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/editsub/claim.html'
    };
}]);
/**
 * 编辑页面中证据数据填写
 */
app.directive('editEvidence', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/editsub/evidences.html'
    };
}]);
/**
 * 编辑页面中当事人数据填写
 */
app.directive('editLitigants', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/editsub/litigants.html'
    };
}]);

/**
 * 查询案件进度页面
 */
app.directive('arbiProgress', ['$document', function ($document) {
    return {
        restrict: 'E',
        templateUrl: 'src/arbitration/list/tmpl/sub/listsub/progress.html'
    };
}]);

