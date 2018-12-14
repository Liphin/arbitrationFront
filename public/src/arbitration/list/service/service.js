/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListSer', function (ArbiListDataSer, OverallDataSer, OverallGeneralSer, $location) {

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

        //装载仲裁案件的数据
        return wrapArbiData();
    };


    /**
     * 包装数据即将发送到后台操作
     */
    var wrapArbiData = function () {
        //提交的表单数据
        if (ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-1") {
            //筛选qidaifuturetech-p2p-1的json结构
            qidaifuturetech_p2p_1();
        }
        else if (ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-2"){
            qidaifuturetech_p2p_2();
        }

        var submitData = {
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
            arbcaseInfo: JSON.stringify({
                caseFlowType: ArbiListDataSer.arbiApplyData['overall']['productCode'],
                commissionCode: ArbiListDataSer.arbiApplyData['commissionCode'],
                claim: ArbiListDataSer.arbiApplyData['claim'],
                litigants: ArbiListDataSer.arbiApplyData['litigants'],
                agents: ArbiListDataSer.arbiApplyData['agents'],
                evidences: ArbiListDataSer.arbiApplyData['evidences']
            }),
            productCode: ArbiListDataSer.arbiApplyData['overall']['productCode']
        };

        var submitSelectData = {
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
            arbcaseInfo: JSON.stringify({
                caseFlowType: ArbiListDataSer.arbiApplyData['overall']['productCode'],
                commissionCode: ArbiListDataSer.arbiApplyData['commissionCode'],
                claim: ArbiListDataSer.arbiApplySelectData['claim'],
                litigants: ArbiListDataSer.arbiApplySelectData['litigants'],
                agents: ArbiListDataSer.arbiApplySelectData['agents'],
                evidences: ArbiListDataSer.arbiApplySelectData['evidences']
            }),
            productCode: ArbiListDataSer.arbiApplyData['overall']['productCode']
        };
        
        console.log(submitData);
        console.log(submitSelectData);
        //根据具体情况限定申请请人
        if (OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplyData['litigants'][0]['name'])) {
            var litigantsFrom =  ArbiListDataSer.arbiApplyData['litigants'][0]['name'];
        }
        else {
            var litigantsFrom =  ArbiListDataSer.arbiApplyData['litigants'][1]['name'];
        }

        //保存到数据库的arbilist数据
        var saveData = {
            arbcaseId: ArbiListDataSer.overallData['arbcaseId'], //submit成功后返回条目id并回填数据
            litigantsFrom: litigantsFrom,
            litigantsTo: ArbiListDataSer.arbiApplyData['litigants'][2]['name'],
            reason: ArbiListDataSer.arbiApplyData['claim']['reason'],
            updateTime: OverallGeneralSer.getCurrentDataTime(),
            operaterType: ArbiListDataSer.arbiApplyData['overall']['operaterType'],
            operater: ArbiListDataSer.arbiApplyData['overall']['operater'],
            productCode: ArbiListDataSer.arbiApplyData['overall']['productCode'],
        };

        //包装整合最终的提交数据
        return {
            submitData: submitData,
            submitSelectData: submitSelectData,
            saveData: saveData,
            timestamp: ArbiListDataSer.overallData['timestamp'],
        };
    };


    /**
     * 提交新的诉讼数据到服务器
     */
    var submitNewArbiData = function () {
        //对已提交了的案件修改需到易简网上修改
        if (ArbiListDataSer.overallData['arbcaseId'] != '未提交' && ArbiListDataSer.overallData['arbcaseId'] != '已撤销' && ArbiListDataSer.overallData['arbcaseId'] != '草稿') {
            alert("该案件信息已提交，需登录易简网进行修改。");
            return;
        }

        //整理提交的arbi数据
        var formData = preWrapArbiData();

        //查询该应用是否已配置生产
        if(ArbiListDataSer.arbiApplyDataEtc['etcData'].indexOf(ArbiListDataSer.arbiApplyData['overall']['productCode'])>-1) {
            console.log("提交生产环境");
            var url = OverallDataSer.urlData['frontEndHttp']['submitNewArbiData'];
        }
        else {
            console.log("提交测试环境");
            var url = OverallDataSer.urlData['frontEndHttp']['submitNewArbiDataTest'];
        }

        //提交诉讼信息到server

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
        if (ArbiListDataSer.overallData['arbcaseId'] != '未提交' && ArbiListDataSer.overallData['arbcaseId'] != '已撤销' && ArbiListDataSer.overallData['arbcaseId'] != '草稿') {
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
                    if (responseData['data'][i]['data']['productCode']=="qidaifuturetech-p2p-1") {
                        responseData['data'][i]['data']['productName']="民间借贷";
                    }
                    else if (responseData['data'][i]['data']['productCode']=="qidaifuturetech-p2p-2") {
                        responseData['data'][i]['data']['productName']="追偿权纠纷车贷";
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
            case 'copy': {
                copyArbiOpt(timestamp, index);
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
                    ArbiListDataSer.overallData['arbiType']['status'] = false;
                    ArbiListDataSer.overallData['arbiType']['targetType'] = responseData['data'][0]['data']['productCode'];
                    ArbiListDataSer.overallData['arbcaseId'] = ArbiListDataSer.listData[index]['data']['arbcaseId']; //赋值该arbcaseId值
                    ArbiListDataSer.overallData['timestamp'] = responseData['data'][0]['timestamp']; //赋值该timestamp

                    //整体操作者和约束文案数据
                    ArbiListDataSer.arbiApplyData['overall'] = {
                        'operaterType': responseData['data'][0]['data']['operaterType'],
                        'operater': responseData['data'][0]['data']['operater'],
                        'productCode': responseData['data'][0]['data']['productCode']
                    };

                    //仲裁内容数据填充
                    var arbcaseInfo = JSON.parse(responseData['data'][0]['data']['arbcaseInfo']);
                    for (var i in arbcaseInfo) {
                        ArbiListDataSer.arbiApplyData[i] = arbcaseInfo[i];
                    }

                    //对初始化后的数据进行其他辅助操作
                    afterArbiInfoInit();
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
        if (ArbiListDataSer.listData[index]['data']['arbcaseId'] == '未提交' || ArbiListDataSer.listData[index]['data']['arbcaseId'] == '已撤销') {
            alert("该案件信息尚未提交或已撤销，无法查看案件进度");
            return;
        }

        //查询该应用是否已配置生产
        if(ArbiListDataSer.arbiApplyDataEtc['etcData'].indexOf(ArbiListDataSer.listData[index]['data']['productCode'])>-1) {
            console.log("提交生产环境");
            var url = OverallDataSer.urlData['frontEndHttp']['progressArbiOpt'];
        }
        else {
            console.log("提交测试环境");
            var url = OverallDataSer.urlData['frontEndHttp']['progressArbiOptTest'];
        }

        //var url = OverallDataSer.urlData['frontEndHttp']['progressArbiOpt'];
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
            alert("该案件信息尚未提交或已撤销，无法撤销仲裁请求");
            return;
        }

        //查询该应用是否已配置生产
        if(ArbiListDataSer.arbiApplyDataEtc['etcData'].indexOf(ArbiListDataSer.listData[index]['data']['productCode'])>-1) {
            console.log("提交生产环境");
            var url = OverallDataSer.urlData['frontEndHttp']['withdrawArbiOpt'];
        }
        else {
            console.log("提交测试环境");
            var url = OverallDataSer.urlData['frontEndHttp']['withdrawArbiOptTest'];
        }

        //var url = OverallDataSer.urlData['frontEndHttp']['withdrawArbiOpt'];
        var data = {
            'arbcaseId': ArbiListDataSer.listData[index]['data']['arbcaseId'],
            'operaterType': ArbiListDataSer.listData[index]['data']['operaterType'],
            'operater': ArbiListDataSer.listData[index]['data']['operater'],
        };
        OverallGeneralSer.httpPostData2(data, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                if (responseData['data']['code'] == 1) {
                    ArbiListDataSer.listData[index]['data']['arbcaseId'] = '已撤销';
                    ArbiListDataSer.overallData['arbcaseId'] = '已撤销'; //由于会重新赋值该对象的值，所以进行修改
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
     * 复制仲裁请求数据
     * @param timestamp
     * @param index
     */
    var copyArbiOpt = function (timestamp, index) {
        var url = OverallDataSer.urlData['frontEndHttp']['viewArbiOpt'];
        OverallGeneralSer.httpPostData2({'timestamp': timestamp}, url, function (responseData) {
            if (responseData['status_code'] == 200) {
                if (responseData['data'].length > 0) {
                    ArbiListDataSer.overallData['arbiType']['targetType'] = responseData['data'][0]['data']['productCode'];
                    ArbiListDataSer.overallData['arbcaseId'] = "草稿"; //赋值该arbcaseId值
                    ArbiListDataSer.overallData['timestamp'] = OverallGeneralSer.getTimeStamp();  //赋值该timestamp

                    //整体操作者和约束文案数据
                    ArbiListDataSer.arbiApplyData['overall'] = {
                        'operaterType': responseData['data'][0]['data']['operaterType'],
                        'operater': responseData['data'][0]['data']['operater'],
                        'productCode': responseData['data'][0]['data']['productCode']
                    };

                    //仲裁内容数据填充
                    var arbcaseInfo = JSON.parse(responseData['data'][0]['data']['arbcaseInfo']);
                    for (var i in arbcaseInfo) {
                        ArbiListDataSer.arbiApplyData[i] = arbcaseInfo[i];
                    }

                    //对初始化后的数据进行其他辅助操作
                    afterArbiInfoInit();

                    saveArbiInfo();
                }

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


    /**
     * 选择仲裁类型
     */
    var selectArbiType = function (type) {
        //设置产品类型数据
        ArbiListDataSer.arbiApplyData['overall']['productCode'] = type;
        ArbiListDataSer.overallData['arbiType']['targetType'] = type;

        //获取获取对应的type类型的json文件
        if ($location.path() == OverallDataSer.redirect['arbiList']) {
            var url = OverallDataSer.urlData['frontEndHttp']['getArbiJson'] + "/" + type + "/" + type + ".json";
            OverallGeneralSer.httpGetFiles2(url, function (responseData) {
                console.log(1)
                createNewArbiInfo(responseData);
            });

        } else if ($location.path() == OverallDataSer.redirect['arbiListTest']) {
            var url2 = OverallDataSer.urlData['frontEndHttp']['getArbiJson'] + "/" + type + "/" + type + "-test.json";
            OverallGeneralSer.httpGetFiles2(url2, function (responseData) {
                createNewArbiInfo(responseData);
            });
        }
    };


    /**
     * 创建新仲裁案件信息
     */
    var createNewArbiInfo = function (targetData) {
        //获取原数据的一个深拷贝
        var targetDataCopy = angular.copy(targetData);

        //如果是该环境下的文件则进行循环赋值操作
        for (var i in ArbiListDataSer.arbiApplyData) {
            if (OverallGeneralSer.checkDataNotEmpty(targetDataCopy[i])) {
                ArbiListDataSer.arbiApplyData[i] = targetDataCopy[i];
            }
        }
        //对仲裁数据初始化后执行的操作
        afterArbiInfoInit();

        //展开面板为true
        ArbiListDataSer.overallData['arbiType']['status'] = false;
        ArbiListDataSer.overallData['showEdit'] = true;
        ArbiListDataSer.overallData['arbcaseId'] = '未提交'; //赋值该arbcaseId为空
        ArbiListDataSer.overallData['timestamp'] = OverallGeneralSer.getTimeStamp(); //初始化timestamp
    };


    /**
     * 进入编辑页面后对部分数据进行转换操作
     */
    var afterArbiInfoInit = function () {
        //1、对每个代理人权限数据进行辅助增加，增加数组对象
        for (var i in ArbiListDataSer.arbiApplyData['agents']) {
            ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'] = angular.copy(ArbiListDataSer.arbiApplyDataSupply['powerDetailArray']);
            //对每个代理人的每个权限查看是否已经在detail中包含，若是则转换radio input
            //console.log(ArbiListDataSer.arbiApplyData['agents'][i]['powerDetail']);
            for (var j in ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray']) {
                if (ArbiListDataSer.arbiApplyData['agents'][i]['powerDetail'].indexOf(ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'][j]['name']) > -1) {
                    ArbiListDataSer.arbiApplyData['agents'][i]['powerDetailArray'][j]['status'] = true;
                }
            }
        }
    };

    var qidaifuturetech_p2p_1 = function () {
        var targetDataCopy = angular.copy(ArbiListDataSer.arbiApplyData);
        ArbiListDataSer.arbiApplySelectData = {
            'claim': {},
            'litigants': {},
            'agents': {},
            'evidences': {}
        };
        
        //赋值请求信息
        ArbiListDataSer.arbiApplySelectData['claim']=ArbiListDataSer.arbiApplyData['claim'];

        //筛选当事人
        ArbiListDataSer.arbiApplySelectData['litigants']=targetDataCopy['litigants'];
        for (var i=ArbiListDataSer.arbiApplySelectData['litigants'].length-1; i>=0;i--) {
            if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['litigants'][i]['idCardNo'])) {
                ArbiListDataSer.arbiApplySelectData['litigants'].splice(i,1);
            }
        }

        //筛选代理人信息
        ArbiListDataSer.arbiApplySelectData['agents']=targetDataCopy['agents'];
        for (var i=ArbiListDataSer.arbiApplySelectData['agents'].length-1; i>=0;i--) {
            if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['agents'][i]['identityNo'])) {
                ArbiListDataSer.arbiApplySelectData['agents'].splice(i,1);
            }
        }

        //筛选证据
        ArbiListDataSer.arbiApplySelectData['evidences']=targetDataCopy['evidences'];
        for (var i=0; i<ArbiListDataSer.arbiApplySelectData['evidences'].length;i++) {
            for (var j=ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'].length-1;j>=0;j--) {
                if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'][j]['files'][0]['fileKey'])) {
                    ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'].splice(j,1);
                }
            }
        }
        console.log(ArbiListDataSer.arbiApplySelectData);
    };

    var qidaifuturetech_p2p_2 = function () {
        var targetDataCopy = angular.copy(ArbiListDataSer.arbiApplyData);
        ArbiListDataSer.arbiApplySelectData = {
            'claim': {},
            'litigants': {},
            'agents': {},
            'evidences': {}
        };

        //赋值请求信息
        ArbiListDataSer.arbiApplySelectData['claim']=ArbiListDataSer.arbiApplyData['claim'];

        //筛选当事人
        ArbiListDataSer.arbiApplySelectData['litigants']=targetDataCopy['litigants'];
        for (var i=ArbiListDataSer.arbiApplySelectData['litigants'].length-1; i>=0;i--) {
            if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['litigants'][i]['idCardNo'])) {
                ArbiListDataSer.arbiApplySelectData['litigants'].splice(i,1);
            }
        }

        //筛选代理人信息
        ArbiListDataSer.arbiApplySelectData['agents']=targetDataCopy['agents'];
        for (var i=ArbiListDataSer.arbiApplySelectData['agents'].length-1; i>=0;i--) {
            if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['agents'][i]['identityNo'])) {
                ArbiListDataSer.arbiApplySelectData['agents'].splice(i,1);
            }
        }

        //筛选证据
        ArbiListDataSer.arbiApplySelectData['evidences']=targetDataCopy['evidences'];
        for (var i=0; i<ArbiListDataSer.arbiApplySelectData['evidences'].length;i++) {
            for (var j=ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'].length-1;j>=0;j--) {
                if (!OverallGeneralSer.checkDataNotEmpty(ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'][j]['files'][0]['fileKey'])) {
                    ArbiListDataSer.arbiApplySelectData['evidences'][i]['evidenceItems'].splice(j,1);
                }
            }
        }
        console.log(ArbiListDataSer.arbiApplySelectData);
    };

    //新增当事人被申请人项
    var addLitigantsInfo = function () {
        if (ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-1") {
            var litigantsInfo = {
                "materialCode":"借款人",
                "name":""/*名称*/,
                "nature":"自然人"/*类型*/,
                "mobiles":""/*联系号码*/,
                "idCardType":"身份证"/*证件类型*/,
                "idCardNo":""/*证件号码*/,
                "emails":""/*邮箱地址|非必填*/,
                "addresses":""/*联系地址*/,
                "contacts":""/*联系人|非必填*/,
                "sex":""/*性别|取值选择:['男','女']*/,
                "files":[
                    {
                        "fileName":"身份证正反面"/*文件类型范围:pdf/png/jpg*/,
                        "fileKey":""/*fileKey*/
                    }
                ],
                "litigantType":"被申请人"/*当事人类型*/
            }
        }
        else if(ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-2") {
            var litigantsInfo = {
                "materialCode":"借款人",
                "name":""/*名称*/,
                "nature":"自然人"/*类型*/,
                "mobiles":""/*联系号码*/,
                "idCardType":"身份证"/*证件类型*/,
                "idCardNo":""/*证件号码*/,
                "emails":""/*邮箱地址|非必填*/,
                "addresses":""/*联系地址*/,
                "contacts":""/*联系人|非必填*/,
                "sex":""/*性别|取值选择:['男','女']*/,
                "files":[
                    {
                        "fileName":"身份证正反面"/*文件类型范围:pdf/png/jpg*/,
                        "fileKey":""/*fileKey*/
                    }
                ],
                "litigantType":"被申请人"/*当事人类型*/
            }
        }

        ArbiListDataSer.arbiApplyData['litigants'].push(litigantsInfo);
        console.log(ArbiListDataSer.arbiApplyData);
    };

    //新增代理人项
    var addAgentsInfo = function () {
        if (ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-1") {
            var agentsInfo = {
                "materialCode":"申请人代理人",
                "name":""/*姓名|非必填*/,
                "mobiles":""/*联系号码*/,
                "identityType":"身份证"/*证件类型*/,
                "identityNo":""/*证件号码*/,
                "principals":""/*委托人*/,
                "power":""/*代理权限*/,
                "powerDetail":"代为提起仲裁请求;代为参加庭审、进行质证、辩论;代为和解、调解;代为主张、变更、放弃仲裁请求;代为签收法律文书;代为申请执行等"/*代理权限明细|非必填*/,
                "company":""/*工作单位|非必填*/,
                "emails":""/*邮箱地址*/,
                "addresses":""/*联系地址*/,
                "agentType":""/*代理人属性*/,
                "litigantType":""/*当事人类型*/,
                "files":[
                    {
                        "fileName":"律师执业证"/*文件类型范围:pdf/jpg/png*/,
                        "fileKey":""/*fileKey*/
                    },
                    {
                        "fileName":"授权委托书"/*文件类型范围:pdf/jpg/png*/,
                        "fileKey":""/*fileKey*/
                    },
                    {
                        "fileName":"所函"/*文件类型范围:jpg/pdf/png*/,
                        "fileKey":""/*fileKey*/
                    }
                ]
            }
        }
        else if(ArbiListDataSer.arbiApplyData['overall']['productCode']=="qidaifuturetech-p2p-2") {
            var agentsInfo = {
                "materialCode":"申请人代理人",
                "name":""/*姓名|非必填*/,
                "mobiles":""/*联系号码*/,
                "identityType":"身份证"/*证件类型*/,
                "identityNo":""/*证件号码*/,
                "principals":""/*委托人*/,
                "power":""/*代理权限*/,
                "powerDetail":"代为提起仲裁请求;代为参加庭审、进行质证、辩论;代为和解、调解;代为主张、变更、放弃仲裁请求;代为签收法律文书;代为申请执行等"/*代理权限明细|非必填*/,
                "company":""/*工作单位|非必填*/,
                "emails":""/*邮箱地址*/,
                "addresses":""/*联系地址*/,
                "agentType":""/*代理人属性*/,
                "litigantType":""/*当事人类型*/,
                "files":[
                    {
                        "fileName":"律师执业证"/*文件类型范围:pdf/jpg/png*/,
                        "fileKey":""/*fileKey*/
                    },
                    {
                        "fileName":"授权委托书"/*文件类型范围:pdf/jpg/png*/,
                        "fileKey":""/*fileKey*/
                    },
                    {
                        "fileName":"所函"/*文件类型范围:jpg/pdf/png*/,
                        "fileKey":""/*fileKey*/
                    }
                ]
            }
        }

        ArbiListDataSer.arbiApplyData['agents'].push(agentsInfo);
        console.log(ArbiListDataSer.arbiApplyData);
    };


    return {
        addFile: addFile,
        dataInit: dataInit,
        ArbiListOpt: ArbiListOpt,
        getArbiList: getArbiList,
        saveArbiInfo: saveArbiInfo,
        downloadFile: downloadFile,
        selectArbiType: selectArbiType,
        deleteBatchArbi: deleteBatchArbi,
        progressArbiOpt: progressArbiOpt,
        submitNewArbiData: submitNewArbiData,
        addAddictionData: addAddictionData,
        createNewArbiInfo: createNewArbiInfo,
        chooseArbiFillOption: chooseArbiFillOption,
        addLitigantsInfo: addLitigantsInfo,
        addAgentsInfo: addAgentsInfo,
    }
});








