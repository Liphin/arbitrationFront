/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbiedit');

app.factory('ArbiEditSer', function () {


    /**
     * 页面数据初始化
     */
    var dataInit= function () {
        //获取指定范围内的诉讼信息
        ReListSer.getRangeReportInfo();

        /**
         * 初始化时间选择器
         */
        setTimeout(function () {
            triggerDatePicker();
        }, 500);
    };

    return {
        dataInit: dataInit,
    }

});