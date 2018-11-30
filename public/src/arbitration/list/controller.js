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


    /**
     * 添加附加数据信息
     */
    arbilist.addAddictionData = function (type, index1, index2) {
        switch (type) {
            case 'claim': {
                ArbiListDataSer.arbiApplyData['claim']['claimItems'][index1]['extData']['claimMoney'] = '';
                break;
            }
            case 'evidences': {
                ArbiListDataSer.arbiApplyData['evidences'][index1]['evidenceItems'][index2]['extData']['loanContractNumber'] = '';
            }
        }
    };


    /**
     * 添加claimItems数据
     */
    arbilist.addClaimItems = function () {
        ArbiListDataSer.arbiApplyData['claim']['claimItems'].push(ArbiListDataSer.arbiApplyDataSupply['claimItems']);
    };


    /**
     * 添加evidenceItems数据
     */
    arbilist.addEvidenceItems = function (index) {
        ArbiListDataSer.arbiApplyData['evidences'][index]['evidenceItems'].push(ArbiListDataSer.arbiApplyDataSupply['evidenceItems']);
    };


    /**
     * 提交新的诉讼数据到服务器
     */
    arbilist.submitNewArbiData = function () {
        //对数据进行预处理操作
        for (var i in ArbiListDataSer.arbiApplyDataSupply['agents']) {
            var ref = ArbiListDataSer.arbiApplyDataSupply['agents']['powerDetail'];
            for (var j in ArbiListDataSer.arbiApplyDataSupply['agents'][i]['powerDetailArray']) {
                //循环添加选择的特殊权限
                if (ArbiListDataSer.arbiApplyDataSupply['agents'][i]['powerDetailArray'][j]['status']) {
                    ref += ArbiListDataSer.arbiApplyDataSupply['agents'][i]['powerDetailArray'][j]['name'];
                }
                //用英文逗号','隔开
                if (j < ArbiListDataSer.arbiApplyDataSupply['agents'][i]['powerDetailArray'].length - 1) {
                    ref += ',';
                }
            }
        }

        var formData = {
            caseFlowType: "qidaifuturetech-p2p-1",
            commissionCode: "gzac",
            claim: ArbiListDataSer.arbiApplyDataSupply['claim'],
            litigants: ArbiListDataSer.arbiApplyDataSupply['litigants'],
            agents: ArbiListDataSer.arbiApplyDataSupply['agents'],
            evidences: ArbiListDataSer.arbiApplyDataSupply['evidences']
        };
        //提交诉讼信息到server
        var url = OverallDataSer.urlData['frontEndHttp']['submitNewArbiData'];
        OverallGeneralSer.httpPostData2(formData, url, function (responseData) {
            console.log(responseData);

        }, function () {
        });
    };


    //测试选择项
    ArbiListDataSer.arbiApplyData['litigants'].push(ArbiListDataSer.arbiApplyDataSupply['litigants']);
    ArbiListDataSer.arbiApplyData['agents'].push(ArbiListDataSer.arbiApplyDataSupply['agents']);
    ArbiListDataSer.arbiApplyData['evidences'].push(ArbiListDataSer.arbiApplyDataSupply['evidences']);

});