/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.controller('ArbiListCtrl', function (ArbiListDataSer, OverallDataSer, $location,
                                         OverallGeneralSer, $cookies) {

    //检查是否有cookie或在本session里
    if (!OverallDataSer.overallData['loginStatus'] && $cookies.get('loginStatus') != 'success') {
        $location.path(OverallDataSer.redirect['loginHome']);
        return;

    } else {
        OverallDataSer.overallData['loginStatus'] = true;
        $cookies.put('loginStatus', 'success', {'expires': OverallGeneralSer.getNewCookiesExpireDate()});
    }

    //数据初始化操作
    var arbilist = this;
    arbilist.extDataHelper = ArbiListDataSer.extDataHelper;
    arbilist.arbiApplyData = ArbiListDataSer.arbiApplyData;
    arbilist.arbiApplyDataSupply = ArbiListDataSer.arbiApplyDataSupply;


    /**
     * 选择填写仲裁资料填写的选项
     */
    arbilist.chooseArbiFillOption = function (index) {
        //隐藏所有其他的arbi选项数据
        for (var i in ArbiListDataSer.arbiApplyDataSupply['options']) {
            ArbiListDataSer.arbiApplyDataSupply['options'][i] = false;
        }
        //单独展示该arbi选项的数据
        ArbiListDataSer.arbiApplyDataSupply['options'][index] = true;
    };


    /**
     * 添加附件信息
     * @see
     */
    arbilist.addFile = function (type, index, index2) {
        switch (type) {
            case 'litigants': {
                ArbiListDataSer.arbiApplyData[type][index]['files'].push({
                        'fileName': '',
                        'fileKey': ''
                    }
                );
                break;
            }
            case 'agents': {
                ArbiListDataSer.arbiApplyData[type][index]['files'].push({
                        'fileName': '',
                        'fileKey': ''
                    }
                );
                break;
            }
            case 'evidences': {
                ArbiListDataSer.arbiApplyData[type][index]['evidenceItems'][index2]['files'].push({
                        'fileName': '',
                        'fileKey': ''
                    }
                );
                break;
            }
        }
    };


    //测试选择项
    ArbiListDataSer.arbiApplyData['litigants'].push(ArbiListDataSer.arbiApplyDataSupply['litigants']);
    ArbiListDataSer.arbiApplyData['agents'].push(ArbiListDataSer.arbiApplyDataSupply['agents']);
    ArbiListDataSer.arbiApplyData['evidences'].push(ArbiListDataSer.arbiApplyDataSupply['evidences']);

});