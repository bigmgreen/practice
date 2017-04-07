$(function () {

    /*   绑定按钮事件   */
    (function (doc) {
        // 挂载需要切换的函数
        window.getLevel = getLevelWithIf;
        var score = doc.getElementById('score');
        var result = doc.getElementById('result');
        var alertInfo = doc.getElementById('alertInfo');
        var alertDanger = doc.getElementById('alertDanger');
        doc.getElementById('submit').addEventListener('click', function (e) {
            e = e || window.event;
            e.preventDefault();

            if (!score.value || isNaN(score.value) || (score.value < 0 ) || ( score.value > 100)) {
                alertDanger.style.display = 'block';
                alertInfo.style.display = 'none';
            } else {
                result.innerHTML = getLevel(parseFloat(score.value));
                alertInfo.style.display = 'block';
                alertDanger.style.display = 'none';
            }
        });
    })(document);

    /**
     *
     */
    $('[data-toggle="tab"]').on('show.bs.tab', function (e) {
        window.getLevel = window[$(e.target).data('fn')];
    });
});
/**
 * 使用if
 * @param score  分数
 * @returns {*}
 */
function getLevelWithIf(score) {
    if (score >= 90 && score <= 100) {
        return '1';
    } else if (score >= 80) {
        return '2';
    } else if (score >= 70) {
        return '3';
    } else if (score >= 60) {
        return '4';
    } else if (score >= 50) {
        return '5';
    } else if (score >= 40) {
        return '6';
    } else if (score >= 30) {
        return '7';
    } else if (score >= 20) {
        return '8';
    } else if (score >= 10) {
        return '9';
    } else {
        return '10';
    }
}

/**
 * 使用switch
 * @param score  分数
 * @returns {*}
 */
function getLevelWithSwitch(score) {
    switch (!0) {
        case (score >= 90):
            return '1';
        case (score >= 80):
            return '2';
        case (score >= 70):
            return '3';
        case (score >= 60):
            return '4';
        case (score >= 50):
            return '5';
        case (score >= 40):
            return '6';
        case (score >= 30):
            return '7';
        case (score >= 20):
            return '8';
        case (score >= 10):
            return '9';
        default:
            return '10';
    }
}

/**
 * 使用math
 * @param score  分数
 * @returns {*}
 */
function getLevelWithMath(score) {
    return score == 100 ? 1 : (10 - Math.floor(score / 10));
}