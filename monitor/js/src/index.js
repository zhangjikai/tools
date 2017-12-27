/**
 * Created by Jikai Zhang on 2017/12/20.
 */
(function () {
    
    /**
     * 检查链接是否可用
     * @param urls 要监测的链接集合
     * @param timeout 超时时间
     * @param callback 检查完成后的回调函数，会向该函数中传入 (当前状态, 链接索引, params)
     */
    function checkActive(urls, timeout, callback, params) {
        timeout = timeout || 1000;

        for (var i = 0; i < urls.length; i++) {
            (function (url, i, timeout) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: "JSONP",
                    timeout: timeout,
                    success: function (data) {
                        callback(true, i, params);
                    },
                    error: function (data) {

                        if (data.status >= 200 && data.status < 400) {
                            callback(true, i, params);
                        } else {
                            callback(false, i, params);
                        }
                    }
                });

            }(urls[i], i, timeout));
        }
    }

    var success = "success";
    var fail = "fail";
    var statusIdPrefix = "url-status-";

    function changeTable(urls, statusIdPrefix) {
        var maxUrlValueLength = 50;
        var tableKey = "#table-content";
        $(tableKey).html("");

        urls.forEach(function (url, index) {
            var tr = $("<tr />", {
                id: "url-" + index
            }).appendTo($(tableKey));

            $("<td />", {
                text: url.name
            }).appendTo(tr);

            var displayValue = url.value;

            if (displayValue.length > maxUrlValueLength) {
                displayValue = displayValue.substring(0, maxUrlValueLength - 3) + "...";
            }
            $("<td />", {
                html: '<a target="_blank" href="' + url.value + '">' + displayValue + '</a>'

            }).appendTo(tr);

            $("<td />", {
                html: '<i class="fa fa-question-circle" aria-hidden="true"></i>',
                class: 'center-text',
                id: statusIdPrefix + index
            }).appendTo(tr);
        });
    }

    function setStatus(status, index, params) {
        var prefix = params["prefix"];
        if (status) {
            $("#" + prefix + index).html('<i class="fa fa-check-circle" aria-hidden="true"></i>');
        } else {
            $("#" + prefix + index).html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>');
        }
    }

    function beginMonitor(config, statusIdPrefix) {
        var urlValues = [];
        config.urls.forEach(function (url) {
            urlValues.push(url["value"]);
        });

        checkActive(urlValues, config.timeout * 1000, setStatus, {
            prefix: statusIdPrefix
        });

        setInterval(function () {
            checkActive(urlValues, config.timeout * 1000, setStatus, {
                prefix: statusIdPrefix
            })
        }, config.refreshInterval * 1000);
    }

    function init() {
        changeTable(config.urls, statusIdPrefix);
        beginMonitor(config, statusIdPrefix);
    }


    $(document).ready(function () {
        init();
    });

}());
