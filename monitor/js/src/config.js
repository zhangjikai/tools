/**
 * Created by Jikai Zhang on 2017/12/20.
 */

var config = {
    // 超时时间（秒）
    timeout: 2,
    // 刷新间隔（秒）
    refreshInterval: 30,
    // 监控的网址
    urls: [
        {
            name: "FALCON",
            value: "http://protein.ict.ac.cn/TreeThreader/"
        },
        {
            name: "COLORS",
            value: "http://protein.ict.ac.cn/COLORS/server.php"
        },
        {
            name: "ACRF",
            value: "http://protein.ict.ac.cn/ACRF/server.php"
        },
        {
            name: "DeepFR",
            value: "http://protein.ict.ac.cn/deepfr/server.php"
        },
        {
            name:"GIPS",
            value: "http://glycan.ict.ac.cn/GIPS/server/#/"
        },
        {
            name: "GIPS Tomcat",
            value: "http://glycan.ict.ac.cn:8080/server/index.html#/"
        },
        {
            name: "test",
            value: "local"
        }
    ]
};