window.ietnstore = {
    'title'         : {
        'zh-CN': '几何',
        'en'   : 'GeeHee'
    },
    'login'         : {
        'zh-CN': '登录',
        'en'   : 'Log In'
    },
    'register'      : {
        'zh-CN': '注册',
        'en'   : 'Sign Up'
    },
    'submit'        : {
        'zh-CN': '提交',
        'en'   : 'SUBMIT'
    },
    'index-title'   : {
        'zh-CN': '几何 - 你的美学世界',
        'en'   : 'GeeHee - your world of aesthetics'
    },
    'modify-pwd'    : {
        'zh-CN': '修改密码',
        'en'   : 'Modify your password'
    },
    'input-phone'   : {
        'zh-CN': '请输入手机号',
        'en'   : 'Please input your Phone'
    },
    'input-code'    : {
        'zh-CN': '输入验证码',
        'en'   : 'input the code'
    },
    'get-code'      : {
        'zh-CN': '获取验证码',
        'en'   : 'get code'
    },
    'input-pwd'     : {
        'zh-CN': '请输入密码',
        'en'   : 'Please input your Password'
    },
    'forget-pwd'    : {
        'zh-CN': '忘记密码？',
        'en'   : 'forget the password?'
    },
    'back-to-login' : {
        'zh-CN': '返回登录',
        'en'   : 'back to login'
    }
}
//console.log(window.navigator.language);// 'zh-CN'
var aIetn = $('[ietn]');
aIetn.localLang = window.navigator.language;

$.fn.ietn = function (options) {
    var defaults = {
        selector : 'data-ietn',
        lang     : 'zh-CN',
        listen   : false,
        listenSelector   : 'ietn-listen',
        async    : false
    };

    // Extend our default options with those provided.
    this.options = $.extend(defaults, options);
    this.aIetn   = $('[' + this.options.selector + ']');
    window.ietnLand = this.options.lang;
    var fa = this;
    //document.title = window.ietnstore['title'][window.ietnLand];
    //console.log(this.options.selector);
    //alert(this.options.listen);
    if (this.options.lang != window.navigator.language) {
        //alert('run target: ' + window.navigator.language);
        changeLang(window.navigator.language);
    }
    if (this.options.listen) {
        $('#' + this.options.listenSelector)
        .on('change', function (e) {
            var me = $(this);
            //findLocalStore
            //var target = me.data('target');
            var target = me.val();
            //console.log('target: ' + target);
            changeLang(target);
        })
        ;
    }

    function changeLang (target) {
        var list = fa.aIetn;
        var size = list.size();
        //console.log(size);
        var _tar = target;
        document.title = window.ietnstore['title'][_tar];
        for (var i = 0;i < size;i++) {
            var o = list.eq(i);
            var message = o.data('ietn');
            var word = findWord(message, _tar);
            //console.log('word: ' + word);
            //console.log(o);
            var tagName = o[0].tagName.toLowerCase();
            //console.log(tagName);
            if (tagName == 'input') {
                //console.log(o.attr('placeholder'));
                o.attr('placeholder', word);
                o.prop('placeholder', word);
            }
            else {
                o.text(word);
            }

        }
        window.ietnLand = _tar;
    }

    function findWord (message, target) {
        var msg = message;
        var tar = target;
        if (fa.options.async) {

        }
        else {
            var hasLocal = fa.hasLocal();
            if (hasLocal) {

            }
            else {
                return window.ietnstore[msg][tar];
            }
        }
    }

    this.hasLocal = function () {
        return false;
    }

    function findLocalStore () {
        return {};
    }

}


if (aIetn.localLang != 'zh-CN') {
    $.iten();
}
$('body').ietn({
    listen: true
});

