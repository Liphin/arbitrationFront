/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListSer', function (ArbiListDataSer, ArbiListDataHelperSer, OverallDataSer, OverallGeneralSer, $location) {


    /**
     * 页面数据初始化
     */
    var dataInit = function () {
        getArbiList();

        /**
         * 初始化时间选择器
         */
        setTimeout(function () {
            triggerDatePicker();
        }, 500);
    };


    /**
     * 选择填写仲裁资料填写的选项
     */
    var chooseArbiFillOption = function (index) {
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
    var addFile = function (type, index, index2) {
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
    var addAddictionData = function (type, index1, index2) {
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
     * 对上传保存或提交的数据进行预装载
     */
    var preWrapArbiData = function () {
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

        //提交的表单数据
        var submitData = {
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
            arbcaseInfo: JSON.stringify({
                caseFlowType: "qidaifuturetech-p2p-1",
                commissionCode: "gzac",
                claim: ArbiListDataSer.arbiApplyData['claim'],
                litigants: ArbiListDataSer.arbiApplyData['litigants'],
                agents: ArbiListDataSer.arbiApplyData['agents'],
                evidences: ArbiListDataSer.arbiApplyData['evidences']
            }),
            productCode: ArbiListDataSer.arbiApplyData['overall']['productCode']
        };

        //保存到数据库的arbilist数据
        var saveData = {
            arbcaseId: ArbiListDataSer.overallData['arbcaseId'], //submit成功后返回条目id并回填数据
            litigantsFrom: ArbiListDataSer.arbiApplyData['litigants'][0]['name'],
            litigantsTo: ArbiListDataSer.arbiApplyData['litigants'][1]['name'],
            reason: ArbiListDataSer.arbiApplyData['claim']['reason'],
            updateTime: OverallGeneralSer.getCurrentDataTime(),
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
        };

        //包装整合最终的提交数据
        return {
            submitData: submitData,
            saveData: saveData,
            timestamp: ArbiListDataSer.overallData['timestamp'],
        };
    };


    /**
     * 提交新的诉讼数据到服务器
     */
    var submitNewArbiData = function () {
        //对已提交了的案件修改需到易简网上修改
        if (ArbiListDataSer.overallData['arbcaseId'] != '未提交' && ArbiListDataSer.overallData['arbcaseId'] != '已撤销') {
            alert("该案件信息已提交，需登录易简网进行修改。");
            return;
        }

        //整理提交的arbi数据
        var formData = preWrapArbiData();
        //提交诉讼信息到server
        var url = OverallDataSer.urlData['frontEndHttp']['submitNewArbiData'];
        OverallGeneralSer.httpPostData2(formData, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                //刷新重新获取arbi列表数据
                getArbiList();
                alert("提交成功");
                //关闭编辑面板
                ArbiListDataSer.overallData['showEdit'] = false;

            } else {
                alert("提交失败：" + JSON.stringify(responseData['data']));
            }

        }, function () {
        });
    };


    /**
     * 保存最新仲裁信息到数据库
     */
    var saveArbiInfo = function () {
        //对已提交了的案件修改需到易简网上修改
        if (ArbiListDataSer.overallData['arbcaseId'] != '未提交' && ArbiListDataSer.overallData['arbcaseId'] != '已撤销') {
            alert("该案件信息已提交，需登录易简网进行修改。");
            return;
        }

        //整理提交的arbi数据
        var formData = preWrapArbiData();
        //post请求保存数据信息
        var url = OverallDataSer.urlData['frontEndHttp']['saveArbiInfo'];
        OverallGeneralSer.httpPostData2(formData, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                //刷新重新获取arbi列表数据
                getArbiList();
                alert("保存成功");

            } else {
                alert("保存失败：" + JSON.stringify(responseData['data']));
            }
        }, function () {
        });
    };


    /**
     * 获取指定范围或所有仲裁列表数据
     */
    var getArbiList = function () {
        //post请求获取list数据
        OverallDataSer.overallData['loadingData'] = true;
        var url = OverallDataSer.urlData['frontEndHttp']['getArbiList'];
        OverallGeneralSer.httpPostData2({}, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                //清空arbiList数组
                ArbiListDataSer.listData.length = 0;
                //循环遍历数组，装载数据到list中
                for (var i in responseData['data']) {
                    responseData['data'][i]['data']['toDelete'] = false;
                    responseData['data'][i]['data']['menu'] = false;
                    if (responseData['data'][i]['data']['arbcaseId'] == '') {
                        responseData['data'][i]['data']['arbcaseId'] = '未提交';
                    }
                    ArbiListDataSer.listData.push(responseData['data'][i]);
                }
                console.log(ArbiListDataSer.listData);

            } else {
                alert("请求失败：" + JSON.stringify(responseData['data']));
            }
        }, function () {
            OverallDataSer.overallData['loadingData'] = false;
        });
    };


    /**
     * 创建新仲裁案件信息
     */
    var createNewArbiInfo = function () {
        ArbiListDataSer.overallData['showEdit'] = true;
        ArbiListDataSer.overallData['arbcaseId'] = '未提交'; //赋值该arbcaseId为空
        ArbiListDataSer.overallData['timestamp'] = OverallGeneralSer.getTimeStamp(); //初始化timestamp

        if ($location.path() == OverallDataSer.redirect['arbiListTest']) {
            for (var i in ArbiListDataSer.arbiApplyData) {
                ArbiListDataSer.arbiApplyData[i] = angular.copy(ArbiListDataHelperSer.arbiApplyDataTest[i]);
            }
        } else {
            for (var i in ArbiListDataSer.arbiApplyData) {
                ArbiListDataSer.arbiApplyData[i] = angular.copy(ArbiListDataHelperSer.arbiApplyDataPure[i]);
            }
        }
    };


    /**
     *
     * @constructor
     */
    var ArbiListOpt = function (optType, timestamp, index) {
        switch (optType) {
            case 'view': {
                viewArbiOpt(timestamp, index);
                break;
            }
            case 'progress': {
                progressArbiOpt(timestamp, index);
                break;
            }
            case 'withdraw': {
                withdrawArbiOpt(timestamp, index);
                break;
            }
        }
    };

    /**
     * 根据timestamp获取该案件具体消息
     * @param timestamp
     * @param index
     */
    var viewArbiOpt = function (timestamp, index) {
        var url = OverallDataSer.urlData['frontEndHttp']['viewArbiOpt'];
        OverallGeneralSer.httpPostData2({'timestamp': timestamp}, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                if (responseData['data'].length > 0) {
                    //打开edit面板并载入相关数据
                    ArbiListDataSer.overallData['showEdit'] = true;
                    ArbiListDataSer.overallData['arbcaseId'] = ArbiListDataSer.listData[index]['data']['arbcaseId']; //赋值该arbcaseId值
                    ArbiListDataSer.overallData['timestamp'] = responseData['data'][0]['timestamp']; //赋值该timestamp

                    //初始化edit的数据操作
                    var arbcaseInfo = JSON.parse(responseData['data'][0]['data']['arbcaseInfo']);
                    ArbiListDataSer.arbiApplyData['overall'] = {
                        'operaterType': responseData['data'][0]['data']['operaterType'],
                        'operater': responseData['data'][0]['data']['operater'],
                        'productCode': responseData['data'][0]['data']['productCode']
                    };
                    ArbiListDataSer.arbiApplyData['claim'] = arbcaseInfo['claim'];
                    ArbiListDataSer.arbiApplyData['litigants'] = arbcaseInfo['litigants'];
                    ArbiListDataSer.arbiApplyData['agents'] = arbcaseInfo['agents'];
                    ArbiListDataSer.arbiApplyData['evidences'] = arbcaseInfo['evidences'];
                }
            }
        }, function () {
        });
    };


    /**
     * 根据timestamp查询易简网数据
     * @param timestamp
     * @param index
     */
    var progressArbiOpt = function (timestamp, index) {
        //如果该案件条目尚未提交则直接返回，否则进行查询操作
        if (ArbiListDataSer.listData[index]['data']['arbcaseId'] == '未提交') {
            alert("该案件信息尚未提交，无法查看案件进度");
            return;
        }

        var url = OverallDataSer.urlData['frontEndHttp']['progressArbiOpt'];
        var data = {
            'arbcaseId': ArbiListDataSer.listData[index]['data']['arbcaseId'],
            'operaterType': ArbiListDataSer.listData[index]['data']['operaterType'],
            'operater': ArbiListDataSer.listData[index]['data']['operater'],
        };
        OverallGeneralSer.httpPostData2(data, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                ArbiListDataSer.overallData['progress']['status'] = true;//打开进度展示页面
                ArbiListDataSer.overallData['progress']['data'].length = 0;//清空并重新添加进度数据到progress中
                for (var i in responseData['data']['progress']) {
                    ArbiListDataSer.overallData['progress']['data'].push(responseData['data']['progress'][i]);
                }
            } else {
                alert("很抱歉，系统出错，请联系系统管理员：" + JSON.stringify(responseData['data']))
            }
        }, function () {
        });
    };


    /**
     * 撤销仲裁请求数据
     * @param timestamp
     * @param index
     */
    var withdrawArbiOpt = function (timestamp, index) {
        //如果该案件条目尚未提交则直接返回，否则进行查询操作
        if (ArbiListDataSer.listData[index]['data']['arbcaseId'] == '未提交' || ArbiListDataSer.listData[index]['data']['arbcaseId'] == '已撤销') {
            alert("该案件信息尚未提交，无法撤销仲裁请求");
            return;
        }

        var url = OverallDataSer.urlData['frontEndHttp']['withdrawArbiOpt'];
        var data = {
            'arbcaseId': ArbiListDataSer.listData[index]['data']['arbcaseId'],
            'operaterType': ArbiListDataSer.listData[index]['data']['operaterType'],
            'operater': ArbiListDataSer.listData[index]['data']['operater'],
        };
        OverallGeneralSer.httpPostData2(data, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                if (responseData['data']['code'] == 1) {
                    ArbiListDataSer.listData[index]['data']['arbcaseId'] = '已撤销';
                    saveArbiInfo();
                    alert("案件撤销操作成功");

                } else {
                    alert("很抱歉，案件撤销失败，请联系系统管理员：" + JSON.stringify(responseData['data']['message']));
                }

            } else {
                alert("很抱歉，系统出错，请联系系统管理员：" + JSON.stringify(responseData['data']))
            }
        }, function () {
        });
    };


    /**
     * 下载文件操作
     * @param fileValue
     */
    var downloadFile = function (fileValue) {
        var url = OverallDataSer.urlData['frontEndHttp']['getResource'] + '/' + fileValue['fileKey'];
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "binary",
            processData: false,
            success: function (result) {
                //从网络流中读入数据并保存文件
                var blob = new Blob([result], {type: 'application/octet-stream'});
                var fileName = fileValue['fileName'];
                saveAs(blob, fileName);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //打印错误消息体
                alert("很抱歉，系统出错，请联系系统管理员：" + JSON.stringify(errorThrown))
                console.error('error', errorThrown)
            }
        });
    };


    /**
     * 多选删除仲裁数据
     */
    var deleteBatchArbi = function () {
        var url = OverallDataSer.urlData['frontEndHttp']['deleteBatchArbi'];
        //装载多选待删除数据
        var data = [];
        for (var i in ArbiListDataSer.listData) {
            if (ArbiListDataSer.listData[i]['data']['toDelete'] == true) {
                data.push(ArbiListDataSer.listData[i]['timestamp'])
            }
        }
        OverallGeneralSer.httpPostData2({'toDeleteArray': data}, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                //刷新重新获取arbi列表数据
                getArbiList();

            } else {
                alert("很抱歉，系统出错，请联系系统管理员：" + JSON.stringify(responseData['data']))
            }
        }, function () {
        });
    };


    return {
        addFile: addFile,
        dataInit: dataInit,
        ArbiListOpt: ArbiListOpt,
        getArbiList: getArbiList,
        saveArbiInfo: saveArbiInfo,
        downloadFile: downloadFile,
        deleteBatchArbi: deleteBatchArbi,
        progressArbiOpt: progressArbiOpt,
        submitNewArbiData: submitNewArbiData,
        addAddictionData: addAddictionData,
        createNewArbiInfo: createNewArbiInfo,
        chooseArbiFillOption: chooseArbiFillOption,
    }
});








