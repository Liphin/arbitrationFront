/**
 * Created by Administrator on 2018/11/7.
 */
var app = angular.module('Angular.arbilist');

app.factory('ArbiListDataSer', function () {

    var arbiApplyDataSupply = {
        //选项true or false设置
        'options': {
            'general': false,
            'claim': true,
            'litigants': false,
            'agents': false,
            'evidences': false
        },

        //通过5.7查询全局字段信息
        'overallVariable': {
            'post': [],
            'idCardType': [],
            'identityType': [],
        },


        //诉讼事件声明
        'claimItems': {
            'claimContent': '',//请求内容
            'claimType': '',//请求类型：确认之诉，给付之诉，形成之诉
            'disputeFee': 0, //请求标的
            'litigants': '',//当事人名称
            'materialCode': '',//仲裁请求描述
            'extData': {}//附加数据
        },

        //当事人对象
        'litigants': {
            'litigantType': '',//当事人分类。申请人、被申请人、第三人
            'nature': '',//当事人性质：自然人、企业、个体户、其他组织。
            'name': '', //当事人性质为自然人时，请填写当事人姓名；当事人性质为企业、个体户和其他组织时，请填写机构名称。
            'mobiles': '', //联系号码。如有多个请用英文逗号分隔
            'contacts': '',//联系人名称。如有多个请用英文逗号分隔。
            'sex': '',//性别：男、女（自然人必填、个体户请填写负责人的性别）。
            'legalRepresent': '',//法定代表人（企业、个体户必填）。
            'post': '',//法定代表人职务（企业必填）。通过5.7查询全局字段信息接口获取职务。
            'idCardType': '',//证件类型（自然人、个体户必填）。通过5.7查询全局字段信息接口获取证件类型。
            'idCardNo': '',//证件号码（自然人、个体户必填）。
            'identityType': '',//证照类型（企业、个体户、其他组织必填）。通过5.7查询全局字段信息接口获取证照类型。
            'identityNo': '',//营业执照号码（企业、个体户、其他组织必填）。
            'emails': '',//联系邮箱。如有多个请用英文逗号分隔。
            'addresses': '',//联系地址。如有多个请用英文逗号分隔。
            'materialCode': '',//材料名称，用于类型化案件。
            'files': []//附件，以JSON数组表示
        },

        //代理人对象
        'agents': {
            'agentType': '',//代理人分类：律师代理、公民代理。
            'name': '',//代理人名称。
            'sex': '',//性别：男、女。
            'identityType': '',//证件类型。通过5.7查询全局字段信息接口获取证件类型。
            'identityNo': '',//证件号码。
            'mobiles': '',//联系号码。如有多个请用英文逗号分隔。
            'litigantType': '',//当事人类型：申请人、被申请人、第三人
            'principals': '',//委托人名称。如果多个请用逗号分隔。
            'power': '',//代理权限：一般代理、特殊权限。
            'powerDetail': '',//如为特殊权限，则此项必填
            'company': '',//公司名称。
            'emails': '',//联系邮箱。如有多个请用英文逗号分隔。
            'addresses': '',//联系地址。如有多个请用英文逗号分隔。
            'materialCode': '',//材料名称，用于类型化案件。
            'files': []//附件，以JSON数组表示。
        },

        //证据对象
        'evidences': {
            'providerType': '',//证据提供者类型：申请方、被申请方、第三方、其他
            'provider': '',//证据提供者。如有多个请用英文逗号分隔
            'evidenceItems': []//证据项JSON数组。数组中为证据项JSON对象，具体内容请参看下表
        },

        //证据条目
        'evidenceItems': {
            'name': '',//证据名称
            'content': '',//证明内容。
            'hasOriginal': true,//是否有原件：true，false
            'materialCode': '',//材料名称，用于类型化案件。
            'files': [],//证据附件
            'extData': {} //其他数据信息
        }
    };

    //仲裁应用数据
    var arbiApplyData = {
        'overall': {
            'operaterType': '', //操作者类型， 申请人、第三方
            'operater': '', //操作者名称
            'productCode': '' //简述
        },
        'claim': {
            'reason': '',//原因
            'files': [],//附件数组信息
            'claimItems': [] //请求项内容
        },
        'litigants': [],
        'agents': [],
        'evidences': []
    };

    //其他附加数据
    var extDataHelper = {
        'claimItems': {
            "claimMoney": {
                'name': "请求本金",
                'placeholder': ''
            },
            "startDate": {
                'name': "起算日期",
                'placeholder': ''
            },
            "lawyerFee": {
                'name': "律师费",
                'placeholder': ''
            },
            "propertyAddress": {
                'name': "抵押房产地址",
                'placeholder': ''
            },
            "interestAndPenaltyClaimRate": {
                'name': "利息及违约金的请求利率",
                'placeholder': '示例:24%'
            }
        },

        'evidences': {
            "loanContractNumber": {
                'name': "合同编号",
                'placeholder': ''
            },
            "loanContractSignDate": {
                'name': "合同签订时间",
                'placeholder': ''
            },
            "borrowerServedMobile": {
                'name': "借款人送达手机",
                'placeholder': ''
            },
            "borrowerServedMail": {
                'name': "借款人送达邮箱",
                'placeholder': ''
            },
            "conventionalPrincipal": {
                'name': "合同约定借款本金",
                'placeholder': '示例:160000.00'
            },
            "loanTerm": {
                'name': "借款期限",
                'placeholder': '示例:2017年11月15日至2018年11月14日'
            },
            "conventionalInterestYearRate": {
                'name': "借款年利率",
                'placeholder': '示例:11%'
            },
            "repaymentMethod": {
                'name': "还款方式",
                'placeholder': '示例:先息后本，等额本息'
            },
            "PenaltyDayRate": {
                'name': "违约金日利率",
                'placeholder': '示例:3‰'
            },
            "borrowerName": {
                'name': "借款人姓名",
                'placeholder': '示例:吕武金'
            },
            "mortgagerName": {
                'name': "抵押人姓名",
                'placeholder': ''
            },
            "propertyAddress": {
                'name': "抵押房产地址",
                'placeholder': ''
            },
            "realEstateRegistrationCertificateNumber": {
                'name': "不动产登记证明号码",
                'placeholder': '示例:桂（2017）南宁市不动产证明第0208814号'
            },
            "supplementalAgreementSignDate": {
                'name': "补充合同签订日期",
                'placeholder': ''
            },
            "thirdParty": {
                'name': "委托第三方",
                'placeholder': '示例:东莞团贷网互联网科技服务有限公司'
            },
            "beneficiaryAccountName": {
                'name': "收款账号户名",
                'placeholder': '示例:吕武金'
            },
            "beneficiaryAccountNumber": {
                'name': "收款账号",
                'placeholder': '示例:6212262102020378453'
            },
            "bankOfdeposit": {
                'name': "开户行",
                'placeholder': '示例:中国工商银行'
            },
            "transactionDate": {
                'name': "转账日期",
                'placeholder': '示例:2017年11月15日'
            },
            "transactionMoney": {
                'name': "转账金额",
                'placeholder': '示例:151300.00'
            }
        }
    };



    return {
        extDataHelper: extDataHelper,
        arbiApplyData: arbiApplyData,
        arbiApplyDataSupply: arbiApplyDataSupply,
    }
});