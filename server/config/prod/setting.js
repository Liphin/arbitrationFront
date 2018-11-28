/**
 * Created by Administrator on 2018/11/3.
 */
var settingData = {
    basePath: "/root/arbitration/front", //基础路径
    domainName: "http://arbitration.liphin.com", //域名设置
    isProd: false, //是否为生产环境
    frontPort: 3033, //前端port
    backPort: 8082 //后台port
};
//其他配置
settingData['projectPath'] = settingData['basePath'] + "/output";
settingData['resourcePath'] = settingData['basePath'] + "/resource";


//http和https服务开启
var serverConfig = {
    key: '/root/ca/https/node/cert-1541484604580_liphin.com.key',
    cert:'/root/ca/https/node/cert-1541484604580_liphin.com.crt',
};


//应用配置
var appConfig = {
    appid: 'wx8c0feed4f5d17636',
    secret: 'da618efecb2ca815dd7779d2b93e43fc',
};


module.exports = {
    settingData: settingData,
    appConfig: appConfig,
    serverConfig:serverConfig,
};
