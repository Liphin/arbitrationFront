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
                            'tempFileName': OverallGeneralSer.getTimeStamp() + "." + nameArray[1],
                            'file': element[0].files[0]
                        };
                        //上传到阿里云服务器server
                        OverallGeneralSer.uploadResource(formData, function (responseData) {
                            //上传数据失败
                            if (responseData == false) {
                                alert("很抱歉，系统错误，请稍后重试");
                            }
                            //上传数据成功
                            else {
                                var fileKey = responseData['fileKey'];
                                switch (scope.editType) {
                                    case 'litigants': {
                                        //litigants的设置：litigants-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'] = fullName;
                                        break;
                                    }
                                    case 'agents': {
                                        //agents的设置：agents-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentIndex]['files'][scope.fileIndex]['fileName'] = fullName;
                                        break;
                                    }
                                    case 'evidences': {
                                        //evidences的设置： evidences-->evidenceItems-->files->fileKey
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentParentIndex]['evidenceItems']
                                            [scope.parentIndex]['files'][scope.fileIndex]['fileKey'] = fileKey;
                                        ArbiListDataSer.arbiApplyData[scope.editType][scope.parentParentIndex]['evidenceItems']
                                            [scope.parentIndex]['files'][scope.fileIndex]['fileName'] = fullName;
                                        break;
                                    }
                                }
                            }
                        });
                    }
                    evt.target.value = "";
                })
            }
        }
    }]);