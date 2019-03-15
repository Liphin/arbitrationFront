/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListDataSer', function () {

    //全局数据设置
    var overallData = {
        'arbcaseId': '',//arbitration的Id
        'showEdit': false,
        'timestamp': '',//目标timestamp
        'progress': {
            'status': false, //默认初始化时为false，不显示
            'data': [],//案件办理进度
        },
        'arbiType': {
            'status': true,//案件类型展示
            'targetType': '', //目标案件类型
            'array': [
                {'name': '民间借贷', 'type': 'qidaifuturetech-p2p-1'},
                {'name': '追偿权纠纷车贷', 'type': 'qidaifuturetech-p2p-2'},
                {'name': '房贷+代偿', 'type': 'qidaifuturetech-p2p-3'},
            ]
        },
        'litigantsType': 2,//1-只有两个当事人，2-有2个以上的当事人
    };

    //列表展示数据
    var listData = [];

    var arbiApplyDataSupply = {
        //选项true or false设置
        'options': {
            'claim': true,
            'litigants': false,
            'agents': false,
            'evidences': false,
        },

        //通过5.7查询全局字段信息
        'overallVariable': {
            'post': ["军官证", "实习律师证", "律师执业证", "户口薄", "护照", "身份证", "驾照"],
            'idCardType': ["多证合一营业执照", "税务登记证", "组织机构代码证", "营业执照"],
            'identityType': ["主任", "总经理", "董事长", "行长"],
        },

        'powerDetailArray': [
            {'name': '代为提起仲裁请求', 'status': false},
            {'name': '代为参加庭审、进行质证、辩论', 'status': false},
            {'name': '代为和解、调解', 'status': false},
            {'name': '代为主张、变更、放弃仲裁请求', 'status': false},
            {'name': '代为签收法律文书', 'status': false},
            {'name': '代为申请执行', 'status': false}
        ]//辅助记录特殊权限的数组数据, 提交数据到易简网前删除该字段数组
    };

    //仲裁应用数据
    var arbiApplyData = {
        'overall': {
            'operaterType': '申请人', //操作者类型， 申请人、第三方
            'operater': '申请人', //操作者名称
            'productCode': '' //qidaifuturetech-p2p-1， qidaifuturetech-p2p-2等。根据arbiType来获取
        },
        'commissionCode': '',
        'claim': {},
        'litigants': {},
        'agents': {},
        'evidences': {}
    };

    //筛选仲裁应用数据
    var arbiApplySelectData = {
        'claim': {},
        'litigants': {},
        'agents': {},
        'evidences': {}
    }

    //该应用是否配置生产环境
    var arbiApplyDataEtc = {
        'etcData':'qidaifuturetech-p2p-2',
    };

    return {
        listData: listData,
        overallData: overallData,
        arbiApplyData: arbiApplyData,
        arbiApplyDataSupply: arbiApplyDataSupply,
        arbiApplySelectData: arbiApplySelectData,
        arbiApplyDataEtc: arbiApplyDataEtc,
    }
});