/**
 * Created by ZhangJikai on 2017/2/20.
 */

var inputArea = document.getElementById("input-area");
var outputArea = document.getElementById('output-area');
var lineConfig = document.getElementById('line-number');
var delConfig = document.getElementById('del');
new Clipboard('.btn');

var lineBreakTag = "\n";
var displayLinkBreak = "\\n";
var quoteTag = "\"";
var displayQuoteTag = "\\\"";
var delTag = "+";
var greaterTag = ">";
var displayGreaterTag = "&gt;";
var lessTag = "<";
var displayLessTag = "&lt;";
var andTag = "&";
var displayAndTag = "&amp;";

var delSetting = "del";
var lineSetting = "line";

function transferText(text) {
    if (text == null || text == "") {
        return "";
    }
    var result = "";
    var lines = text.split(lineBreakTag);

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (lineConfig.checked) {
            var hasNumber = false;
            for (var j = 0; j < line.length; j++) {
                if (line[j] ==" ") {
                    if(hasNumber) {
                        break;
                    } else {
                        continue;
                    }
                }
                if(!isNaN(line[j])) {
                    hasNumber = true;
                    continue;
                }
                break;
            }
            if(hasNumber) {
                line = line.substring(j);
            }
        }

        line = line.replace(delTag, "");

        result += line;
        result += lineBreakTag;
    }

    result = result.replaceAll(andTag, displayAndTag);
    result = result.replaceAll(greaterTag, displayGreaterTag);
    result = result.replaceAll(lessTag, displayLessTag);

    return result;
}

function inputChange() {
    outputArea.innerHTML = transferText(inputArea.value);
}

function delChange() {
    delTag = delConfig.value;
    localStorage.setItem(delSetting, delTag);
    inputChange();
}

function lineChange() {
    if(lineConfig.checked) {
        localStorage.setItem(lineSetting, "s");
    } else {
        localStorage.setItem(lineSetting, "d");
    }

    inputChange();
}

function loadSetting() {
    var lineNumber = localStorage.getItem(lineSetting);
    if(lineNumber != null) {
        if(lineNumber == "s") {
            lineConfig.checked = true;
        } else {
            lineConfig.checked = false;
        }
    }
    var del = localStorage.getItem(delSetting);
    if (del != null) {
        delTag = del;
    } else {
        delTag = "+";
    }
    delConfig.value = delTag;
}

window.onload = function () {
    if (inputArea.addEventListener) {
        inputArea.addEventListener('input', inputChange, false);
        delConfig.addEventListener('input', delChange, false);
        lineConfig.addEventListener('change', lineChange, false);

    } else if (inputArea.attachEvent) {
        inputArea.attachEvent('onpropertychange', inputChange);
        delConfig.attachEvent('onpropertychange', delChange);
        lineConfig.attachEvent('change', lineChange);
    }
    loadSetting();
};


String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
