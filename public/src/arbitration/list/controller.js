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
    arbilist.listData = ArbiListDataSer.listData;
    arbilist.overallData = ArbiListDataSer.overallData;
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
        for (var i in ArbiListDataSer.arbiApplyData['agents']) {
            var ref = ArbiListDataSer.arbiApplyData['agents']['powerDetail'];
            for (var j in ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray']) {
                //循环添加选择的特殊权限
                if (ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'][j]['status']) {
                    ref += ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'][j]['name'];
                }
                //用英文逗号','隔开
                if (j < ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'].length - 1) {
                    ref += ';';
                }
            }
            delete ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'];
        }

        //表单数据
        var formData = {
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
            arbcaseInfo: {
                caseFlowType: "qidaifuturetech-p2p-1",
                commissionCode: "gzac",
                claim: ArbiListDataSer.arbiApplyData['claim'],
                litigants: ArbiListDataSer.arbiApplyData['litigants'],
                agents: ArbiListDataSer.arbiApplyData['agents'],
                evidences: ArbiListDataSer.arbiApplyData['evidences']
            },
            productCode: ArbiListDataSer.arbiApplyData['overall']['productCode']
        };

        //拷贝一个表单数组并对其进行encode操作
        var formDataCopy = angular.copy(formData);
        //encodeEachParam(formDataCopy);

        //循环遍历一级每个元素进行调整
        // for (var i in formDataCopy) {
        //     formDataCopy[i] = JSON.stringify(formDataCopy[i]);
        // }
        formDataCopy['arbcaseInfo'] = JSON.stringify(formDataCopy['arbcaseInfo']);
        //console.log(formData);
        console.log(formDataCopy);

        //提交诉讼信息到server
        var url = OverallDataSer.urlData['frontEndHttp']['submitNewArbiData'];
        OverallGeneralSer.httpPostData2(formDataCopy, url, function (responseData) {
            console.log('responseData', responseData);


        }, function () {
        });
    };


    /**
     * urlEncode每个param数据节点
     */
    var encodeEachParam = function (target) {
        //遍历target中每个数据
        for (var i in target) {
            //如果该数据为对象或数组则回调处理，否则encodeURI处理
            if (target[i] instanceof Object || target[i] instanceof Array) {
                encodeEachParam(target[i]);

            } else {
                target[i] = encodeURIComponent(target[i]);
            }
            // switch (Object.prototype.toString.call(target[i])) {
            //     /*String类型数据*/
            //     case '[object String]': {
            //         target[i] = encodeURIComponent(target[i]);
            //         break;
            //     }
            //     /*Array类型*/
            //     case '[object Array]': {
            //         encodeEachParam(target[i])
            //         break;
            //     }
            //     /*Object类型*/
            //     case '[object Object]': {
            //         encodeEachParam(target[i])
            //         break;
            //     }
            // }
        }
    };


    /**
     * 获取上传附件的前缀名称
     */
    arbilist.getFilePrefixName = function (name) {
        return name.split('.')[0];
    };


    //测试选择项
    // ArbiListDataSer.arbiApplyData['litigants'].push(ArbiListDataSer.arbiApplyDataSupply['litigants']);
    // ArbiListDataSer.arbiApplyData['agents'].push(ArbiListDataSer.arbiApplyDataSupply['agents']);
    // ArbiListDataSer.arbiApplyData['evidences'].push(ArbiListDataSer.arbiApplyDataSupply['evidences']);


    /**
     * 创建新仲裁案件信息
     */
    arbilist.createNewArbiInfo = function () {
        ArbiListDataSer.overallData['showEdit'] = true;
    }


});








