/**
 * Created by Administrator on 2018/11/3.
 */
//全局数据配置
var settingData = {
    basePath: "G:/SoftwareOutSourcing/arbitration/front", //基础路径
    domainName: "http://arbitration.liphin.com", //域名设置
    isProd: false, //是否为生产环境
    frontPort: 3033, //前端port
    backPort: 8082 //后台port
};
//其他配置
settingData['projectPath'] = settingData['basePath'] + "/project";
settingData['resourcePath'] = settingData['basePath'] + "/resource";


//http和https服务开启
var serverConfig = {
    key: 'G:/SoftwareOutSourcing/report_prod/ca/Nginx/cert-1541484604580_liphin.com.key',
    cert:'G:/SoftwareOutSourcing/report_prod/ca/Nginx/cert-1541484604580_liphin.com.crt',
};

//应用配置
var appConfig = {
    appid: '',
    secret: ''
};

module.exports = {
    settingData: settingData,
    appConfig: appConfig,
    serverConfig:serverConfig,
};
