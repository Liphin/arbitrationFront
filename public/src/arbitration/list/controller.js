/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.controller('ArbiListCtrl', function (ArbiListDataSer, OverallDataSer, $location, ArbiListSer,
                                         OverallGeneralSer, $cookies, ArbiListDataHelperSer) {

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
        ArbiListSer.dataInit();


        /**
         * 选择填写仲裁资料填写的选项
         * @see ArbiListSer.chooseArbiFillOption
         */
        arbilist.chooseArbiFillOption = function (index) {
            ArbiListSer.chooseArbiFillOption(index);
        };


        /**
         * 添加附件信息
         * @see ArbiListSer.addFile
         */
        arbilist.addFile = function (type, index, index2) {
            ArbiListSer.addFile(type, index, index2);
        };


        /**
         * 获取指定范围或所有仲裁列表数据
         * @see ArbiListSer.getArbiList
         */
        arbilist.getArbiList = function () {
            ArbiListSer.getArbiList();
        };


        /**
         * 保存最新仲裁信息到数据库
         * @see ArbiListSer.saveArbiInfo
         */
        arbilist.saveArbiInfo = function () {
            ArbiListSer.saveArbiInfo();
        };


        /**
         * 提交新的诉讼数据到服务器
         * @see ArbiListSer.submitNewArbiData
         */
        arbilist.submitNewArbiData = function () {
            ArbiListSer.submitNewArbiData();
        };


        /**
         * 获取上传附件的前缀名称
         */
        arbilist.getFilePrefixName = function (name) {
            return name.split('.')[0];
        };


        /**
         * 创建新仲裁案件信息
         * @see ArbiListSer.createNewArbiInfo
         */
        arbilist.createNewArbiInfo = function () {
            ArbiListSer.createNewArbiInfo();
        };


        /**
         * 对每个条目的操作方法
         * @see ArbiListSer.ReListOpt
         */
        arbilist.ArbiListOpt = function (optType, timestamp, index) {
            ArbiListSer.ArbiListOpt(optType, timestamp, index);
        };


        /**
         * 下载附件文件操作
         */
        arbilist.downloadFile = function (fileValue) {
            ArbiListSer.downloadFile(fileValue);
        };


        /**
         * 多选删除仲裁数据
         */
        arbilist.deleteBatchArbi = function () {
            ArbiListSer.deleteBatchArbi();
        };


        //暂时未用到方法****************************************************************************************
        /**
         * 添加附加数据信息
         */
        arbilist.addAddictionData = function (type, index1, index2) {
            ArbiListSer.addAddictionData(type, index1, index2)
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
         * 测试选项操作
         */
        arbilist.test = function () {
            console.log(ArbiListDataSer.arbiApplyData);
        }

    }
);








