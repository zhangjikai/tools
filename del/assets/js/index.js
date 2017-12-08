/**
 * Created by ZhangJikai on 2017/2/20.
 */

var inputArea = document.getElementById("input-area");
var outputArea = document.getElementById('output-area');
var lineConfig = document.getElementById('line-number');
var delConfig = document.getElementById('del');
var modeConfig = document.getElementById('mode');
new Clipboard('.btn');

var delTag = "+";
var greaterTag = ">";
var displayGreaterTag = "&gt;";
var lessTag = "<";
var displayLessTag = "&lt;";
var andTag = "&";
var displayAndTag = "&amp;";

var delSetting = "del";
var lineSetting = "line";
var modeSetting = "mode";

function transferText(text) {
    if (text == null || text == "") {
        return "";
    }
    var result = text;

    if (lineConfig.checked) {
        var lineNumberReg = /^\s*\d+/;
        result = result.replaceAll(lineNumberReg, "");
    }

    if (delTag != null && delTag != "") {
        var spaceReg = /\s*/;
        var delRegExp;

        if(modeConfig.checked) {
            try {
                delRegExp = eval(delTag);
            } catch(e) {
                console.log(e)
            }
        } else {
            if (spaceReg.test(delTag)) {
                delRegExp = new RegExp("^\\" + delTag, 'g');
            } else {
                delRegExp = new RegExp("^\\s*\\" + delTag, 'g');
            }
        }
        result = result.replaceAll(delRegExp, "");
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

function modeChange() {
    if (modeConfig.checked) {
        localStorage.setItem(modeSetting, "s");
    } else {
        localStorage.setItem(modeSetting, "d");
    }

    inputChange();
}

function lineChange() {
    if (lineConfig.checked) {
        localStorage.setItem(lineSetting, "s");
    } else {
        localStorage.setItem(lineSetting, "d");
    }

    inputChange();
}

function loadSetting() {
    var lineNumber = localStorage.getItem(lineSetting);
    if (lineNumber != null) {
        if (lineNumber == "s") {
            lineConfig.checked = true;
        } else {
            lineConfig.checked = false;
        }
    }

    var mode = localStorage.getItem(modeSetting);
    if (mode != null) {
        if (mode == "s") {
            modeConfig.checked = true;
        } else {
            modeConfig.checked = false;
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
        modeConfig.addEventListener('change', modeChange, false);

    } else if (inputArea.attachEvent) {
        inputArea.attachEvent('onpropertychange', inputChange);
        delConfig.attachEvent('onpropertychange', delChange);
        lineConfig.attachEvent('change', lineChange);
        modeConfig.attachEvent('change', modeChange);
    }
    loadSetting();
};


String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};
