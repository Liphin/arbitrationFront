/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

/**
 * 文件上传代理操作
 */
app.directive('fileProxy', ['OverallGeneralSer', 'OverallDataSer', 'ArbiListDataSer',
    function (OverallGeneralSer, OverallDataSer, ArbiListDataSer) {

        return {
            restrict: 'A',
            scope: {
                parentParentIndex: '@',
                parentIndex: '@',
                fileIndex: '@',
                editType: '@'
            },
            link: function (scope, element, attrs) {
                //文件选择
                element.bind('change', function (evt) {
                    //对文件名验证操作
                    var fullName = element[0].files[0]['name'];
                    var nameArray = fullName.split(".");

                    //文件后缀名不正确
                    if (nameArray.length < 2) {
                        alert("文件名有误，或文件无后缀名，请输入正确文件名信息")

                    }
                    //文件上传格式验证
                    else if (OverallDataSer.overallData['fileSuffix'].indexOf(nameArray[1]) <= -1) {
                        alert("文件上传仅支持以下格式：" + JSON.stringify(OverallDataSer.overallData['fileSuffix']));

                    }

                    //文件上传到server
                    else {
                        //准备上传数据
                        var formData = {
                            'fileName': fullName,
                            'tempFileName': OverallGeneralSer.getTimeStamp(),
                            'file': element[0].files[0]
                        };
                        //获取案件种类
                        //查询该应用是否已配置生产
                        var type = '';
                        if(ArbiListDataSer.arbiApplyDataEtc['etcData'].indexOf(ArbiListDataSer.arbiApplyData['overall']['productCode'])>-1) {
                            type = true;
                        }
                        else {
                            type = false;
                        }

                        //上传到阿里云服务器server
                        OverallGeneralSer.uploadResource(formData,type, function (responseData) {
                            console.log('response', responseData);
                            //上传数据失败
                            if (responseData == false) {
                                alert("很抱歉，系统错误，请稍后重试");
                            }
                            //上传数据成功
                            else {
                                var fileKey = responseData['fileKey'];
                                var originName = '';
                                switch (scope.editType) {
                                    case 'litigants': {
                                        //litigants的设置：litigants-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        //更换名字的后缀名
                                        originName = ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'];
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'] = originName.split('.')[0] + '.' + nameArray[1];
                                        break;
                                    }
                                    case 'agents': {
                                        //agents的设置：agents-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        originName = ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'];
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'] = originName.split('.')[0] + '.' + nameArray[1];
                                        break;
                                    }
                                    case 'evidences': {
                                        //evidences的设置： evidences-->evidenceItems-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentParentIndex]['evidenceItems']
                                            [scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        originName = ArbiListDataSer.arbiApplyData[scope.editType][scope.parentParentIndex]['evidenceItems']
                                            [scope.parentIndex]['files'][scope.fileIndex]['fileName'];
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentParentIndex]['evidenceItems']
                                            [scope.parentIndex]['files'][scope.fileIndex]['fileName'] = originName.split('.')[0] + '.' + nameArray[1];

                                        break;
                                    }
                                    case 'claim':{
                                        //claim的设置
                                        ArbiListDataSer.arbiApplyData[scope.editType]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        //更换名字的后缀名
                                        originName = ArbiListDataSer.arbiApplyData[scope.editType]['files'][scope.fileIndex]['fileName'];
                                        ArbiListDataSer.arbiApplyData[scope.editType]['files'][scope.fileIndex]['fileName'] = originName.split('.')[0] + '.' + nameArray[1];
                                        break;
                                    }
                                }
                                alert("上传成功");
                            }
                        });
                    }
                    evt.target.value = "";
                })
            }
        }
    }]);


/**
 * 输入框的宽度信息设置
 */
app.directive('inputWidthSetting', [function () {
    return {
        restrict: 'A',
        scope: {
            inputWidthSetting: '@',
        },
        link: function (scope, element, attrs) {
            switch (scope.inputWidthSetting) {
                case 'interestAndPenaltyClaimRate': {
                    element.css('width', '91px');
                    break;
                }
                case 'lawyerFee': {
                    element.css('margin-left', '15px');
                    element.css('width', '242px');
                    break;
                }
                case 'overdueCompensatoryAmount': {
                    element.css('margin-left', '15px');
                    element.css('width', '242px');
                    break;
                }
                case 'propertyAddress': {
                    element.css('width', '570px');
                    break;
                }
                case 'realEstateRegistrationCertificateNumber': {
                    element.css('width', '528px');
                    break;
                }
                case 'litigantsContact': {
                    element.css('width', '228px');
                    break;
                }
                case 'litigantsEmail': {
                    element.css('width', '242px');
                    break;
                }
                //借款抵押合同
                case 'loanContractNumber': {
                    element.css('width', '200px');
                    break;
                }
                case 'borrowerServedMobile': {
                    element.css('width', '158px');
                    break;
                }
                case 'conventionalPrincipal': {
                    element.css('width', '146px');
                    break;
                }
                case 'PenaltyDayRate': {
                    element.css('width', '177px');
                    break;
                }
                case 'repaymentMethod': {
                    element.css('width', '242px');
                    break;
                }
                case 'loanTerm': {
                    element.css('width', '242px');
                    break;
                }
                case 'borrowerServedMail': {
                    element.css('width', '200px');
                    break;
                }
                case 'loanContractSignDate': {
                    element.css('width', '212px');
                    break;
                }
                case 'borrowerName': {
                    element.css('width', '230px');
                    break;
                }
                //补充合同
                case 'beneficiaryAccountName': {
                    element.css('width', '185px');
                    break;
                }
                case 'supplementalAgreementSignDate': {
                    element.css('width', '157px');
                    break;
                }
                case 'bankOfdeposit': {
                    element.css('width', '228px');
                    break;
                }
                case 'thirdParty': {
                    element.css('width', '242px');
                    break;
                }
                case 'beneficiaryAccountNumber': {
                    element.css('width', '257px');
                    break;
                }
                case 'transactionDate': {
                    element.css('width', '213px');
                    break;
                }
                case 'transactionMoney': {
                    element.css('width', '258px');
                    break;
                }
                //证明
                case 'IDCardNumber': {
                    element.css('width', '215px');
                    break;
                }
                case 'paymentAccountName': {
                    element.css('width', '226px');
                    break;
                }
                //收款确认书
                case 'confirmationSignDate': {
                    element.css('width', '170px');
                    break;
                }
                case 'cashAmount': {
                    element.css('width', '257px');
                    break;
                }
                //不动产登记证明，不动产证书
                case 'mortgagee': {
                    element.css('width', '219px');
                    break;
                }
                case 'amountOfSecuredCaims': {
                    element.css('width', '205px');
                    break;
                }
                case 'mortgagerName': {
                    element.css('width', '222px');
                    break;
                }

            }
        }
    }
}]);


/**
 * ext数据的宽度动态变化
 */
app.directive('extSetting', [function () {
    return {
        restrict: 'A',
        scope: {
            extSetting: '@',
        },
        link: function (scope, element, attrs) {
            switch (scope.extSetting) {
                case 'propertyAddress': {
                    element.css('flex', '100%');
                    break;
                }
                case 'realEstateRegistrationCertificateNumber': {
                    element.css('flex', '100%');
                    break;
                }
            }
        }
    }
}]);


/**
 * 上传文件的特殊标识
 */
app.directive('fileSetting', [function () {
    return {
        restrict: 'A',
        scope: {
            fileSetting: '@',
        },
        link: function (scope, element, attrs) {
            switch (scope.fileSetting) {
                case '《不动产登记证明》《不动产权证书》.pdf': {
                    element.css('display', 'block');
                    element.css('margin', '10px 0 0 90px');
                    break;
                }
            }
        }
    }
}]);

/**
 * 转化为number
 */
app.directive('toNumber', [function () {
    return {
        restrict: 'A',
        scope: {
            toNumber: '=',
        },
        link: function (scope, element, attrs) {
            //console.log(scope.toNumber);
            scope.toNumber=parseFloat(scope.toNumber);
        }
    }
}]);











