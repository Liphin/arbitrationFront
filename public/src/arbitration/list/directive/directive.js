/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

/**
 * 文件上传代理操作
 */
app.directive('fileProxy', ['OverallGeneralSer', 'OverallDataSer', function (OverallGeneralSer, OverallDataSer) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
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
                    var reader = new FileReader();
                    reader.readAsDataURL(element[0].files[0]);
                    reader.onload = function () {
                        var formData = {
                            'fileName': fullName,
                            'file': element[0].files[0],
                            'tempFileName': OverallGeneralSer.getTimeStamp() + "." + nameArray[1]
                        };
                        //上传到阿里云服务器server
                        OverallGeneralSer.uploadResource(formData, function (responseData) {
                            console.log(responseData);
                        });
                    };
                    reader.onerror = function (error) {
                        alert("很抱歉，上传文件出错，请稍后重试");
                    };

                }

                //附件支持：doc/docx/pdf/xls/xlsx/png/jpeg/jpg/gif/pfx/zip 格式
                //上传到前台server服务器，再传到易简网服务器，最后回传意见网的fileKey
                // var timestamp = OverallGeneralSer.getTimeStamp()+element[0].files[0];
                // OverallGeneralSer.uploadResource(element[0].files[0], timestamp, function (responseData) {
                //
                // });
                //清空该target file则下次选择相同的file也可以上传
                evt.target.value = "";
            })
        }
    }
}]);