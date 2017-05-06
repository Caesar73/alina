// close-btn
var header    = $('#header');
var container = $('#content');
var dialog    = $('#dialog');
var shadow    = $('#shadow');
window.sdialog = {};
//alert(md5(1));

header
.on('click', '.show', function () {
    var me = $(this);
    var tp = me.data('target');
    showDialog(tp);
    window.sdialog['type'] = tp;
})
;

dialog
.on('click', '.board-title li', function () {
    var me = $(this);
    var tg = me.data('target');
    if (tg == window.dialog['type']) {
        return;
    }
    else {
        showDialog(tg);
    }
})
.on('submit', 'form.vern', function (e) {
    var me = $(this);
    var tp = dialog.find('.board-title li.active').data('target');
    var err = false;
    e.preventDefault();
    if (me.hasClass('sending')) {
        return;
    }
    var param  = {};
    param.data = {};
    param.data.username = dialog.find('.username').val();
    param.data.verncode = dialog.find('.verncode').val();
    param.data.password = dialog.find('.password').val();



    var data = new FormData();
    data.append('username', param.data.username);
    data.append('password', param.data.password);
    console.log(data);

    //alert(param.data.username);
    if (!param.data.username) {
        alert(window.ietnstore['input-phone'][window.ietnLand]);
        return;
    }
    if (!param.data.password) {
        alert(window.ietnstore['input-pwd'][window.ietnLand]);
        return;
    }

    param.data.password = md5(param.data.password);
    //alert(param.data.password);
    //alert(tp);
    switch (tp) {
        case 'login':
            param.url = '/api/v1/login';
            param.type = 'POST';
            param.data.uid  = 'uid';
            // 第三方uid norequire
            param.data.type = 0;
            // 第三方登录方式（0 手机号default  1 qq 2 weibo 3 wechat）
            send(param);
            break;
        case 'register':
            if (!param.data.verncode) {
                alert(window.ietnstore['input-code'][window.ietnLand]);
            }
            else {
                send(param);
            }
            param.url = '/api/v1/register';
            param.type = 'POST';
            break;
        case 'forget':
            if (!param.data.verncode) {
                alert(window.ietnstore['input-code'][window.ietnLand]);
            }
            else {
                send(param);
            }
            param.url = '/api/v1/forget';
            param.type = 'POST';
            break;
        default:
            break;
    }

})
// 验证码获取
.on('click', '.getcode', function () {
    var me = $(this);
    //var isSending =
    me.prop('disabled', true);
    var t = 60;
    me.text(t + 's');
    var timer = setInterval(function () {
        t--;
        if (t <= 0) {
            me.text(window.ietnstore['get-code'][window.ietnLand]);
            clearInterval(timer);
            me.prop('disabled', false);
        }
        else {
            me.text(t + 's');
        }
    }, 1000);
})
.on('click', '.show-forget', function () {
    var me = $(this);
    showDialog('forget');
})
.on('click', '.show-login', function () {
    var me = $(this);
    showDialog('login');
})
;

shadow
.on('click', '.close-btn', function () {
    //alert(1)
    closeDialog();
})
;

function showDialog (type) {
    var tp = type;
    dialog.find('input').val('');
    dialog.find('input').removeClass('error');
    dialog.show();
    dialog.removeClass().addClass(tp);
    dialog.find('.board-title li.active').removeClass('active');
    dialog.find('.board-title li.' + type).addClass('active');
    $('#shadow').show();

    switch (type) {
        case 'login':
            dialog.find('.login-ul'      ).show();
            dialog.find('.forget-ul'     ).hide();
            dialog.find(' input.verncode').hide();
            dialog.find('.getcode'       ).hide();
            dialog.find('.show-forget'   ).show();
            dialog.find('.show-login'    ).hide();
            dialog.find('.submit'        ).text(window.ietnstore['login'][window.ietnLand]);
            break;
        case 'register':
            dialog.find('.login-ul'     ).show();
            dialog.find('.forget-ul'    ).hide();
            dialog.find('input.verncode').show();
            dialog.find('.getcode'      ).show();
            dialog.find('.show-forget'  ).hide();
            dialog.find('.show-login'   ).hide();
            dialog.find('.submit'       ).text(window.ietnstore['register'][window.ietnLand]);
            break;
        case 'forget':
            dialog.find('.login-ul'     ).hide();
            dialog.find('.forget-ul'    ).show();
            dialog.find('input.verncode').show();
            dialog.find('.getcode'      ).show();
            dialog.find('.show-forget'  ).hide();
            dialog.find('.show-login'   ).show();
            dialog.find('.submit'       ).text(window.ietnstore['submit'][window.ietnLand]);
            break;
    }

    disable_scroll();
}

function closeDialog () {
    $('#shadow').hide();
    dialog.hide();
    enable_scroll();
}

function vern (tp) {

}

// Ajax 封装函数
function send (param) {
    var _p = param;
    console.log(_p);
    $.ajax({
        url: _p.url,
        type: _p.type,
        dataType: 'json',
        data: _p.data
    })
    .done(function(response) {
        if (response.code == '0') {
            // window.location.href = '/webapp/index'
            // document.cookie = 'username=' + username;

            function setCookie (name, value) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days*24*60*60*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
            }

            // setCookie('username', _p.data.username);
            // setCookie('password', _p.data.password);

        }

        var data = response.data;
        //console.log("success");
    })
    .fail(function() {
        //console.log("error");
    })
    .always(function() {
        //console.log("complete");
    });

}

function enable_scroll () {
    $('html,body').css({height: 'auto', overflow: 'auto'});

    // if (window.removeEventListener) {
    //     window.removeEventListener('DOMMouseScroll', wheel, false);
    // }
    // window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

function disable_scroll (scrollTop) {
    var _scrollTop = scrollTop || 0;
    $('html,body').css({height: 'auto', overflow: 'hidden'});
    $('body').css({
        'top': scrollTop
    });

    // if (window.addEventListener) {
    //     window.addEventListener('DOMMouseScroll', wheel, false);
    // }
    // window.onmousewheel = document.onmousewheel = wheel;
    // document.onkeydown = keydown;
}

