var current_theme_color = 'dark';

function showNotification(message, type, icon, from, align){
    showToast(message, type);
}

function showToast(msg, type, callback) {
    //console.log('toast msg', msg);
    if (!msg) msg = '';
    if (!type) type = 'info'; /*info error success*/
    if (typeof toastr !== "undefined") {
        if (typeof msg === 'object') msg = msg[0];

        var title = "Notice";
        if(type == 'success') title = "Success";
        if(type == 'error') title = "Error";

        toastr[type](msg, title);
        setTimeout(function() {
            callback && callback();
        }, 2000);
    } else {
        alert(msg);
    }
}
function showLoading(flag){
    if(flag){
        $("body").removeClass("loaded");
    }else{
        $("body").addClass("loaded");
    }
}
function show_loading(flag) {
    if(flag){
        $(".loading-overlayer").show();
    }else{
        $(".loading-overlayer").hide();
    }
}
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
/////////////////////////////////////////
function show_dialog(title, content,d_size){
    /*
     * d_size: xsmall,small,medium,large,xlarge
     * */
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    if(d_size == undefined || d_size == null) d_size = "medium";
    var dlg = $.confirm({
        theme: current_theme_color,
        title: title,
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        content: content,
        columnClass: d_size,
        buttons: false
    });
    return dlg;
}
function show_dialog1(title, content,d_size){
    /*
     * d_size: xsmall,small,medium,large,xlarge
     * */
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    if(d_size == undefined || d_size == null) d_size = "medium";
    var dlg = $.confirm({
        theme: current_theme_color,
        title: title,
        closeIcon: false,
        closeIconClass: 'fa fa-close',
        content: content,
        columnClass: d_size,
        buttons: false
    });
    return dlg;

}
function show_dialog2(title, content,d_size){
    /*
     * d_size: xsmall,small,medium,large,xlarge
     * */
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    if(d_size == undefined || d_size == null) d_size = "medium";
    var dlg = $.confirm({
        theme: current_theme_color,
        title: title,
        closeIcon: true,
        backgroundDismiss: true,
        closeIconClass: 'fa fa-close',
        content: content,
        columnClass: d_size,
        buttons: false
    });
    return dlg;

}
function show_alert(content ,callback_yes){
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    $.confirm({
        theme: current_theme_color,
        title: APP_NAME,/*false*/
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        content: content,
        buttons: {
            yes: {
                text: 'OK',
                /*isHidden: true, */// hide the button
                keys: ['y'],
                btnClass:'btn-success',
                action: function () {
                    if(callback_yes !== undefined && callback_yes!==null){
                        callback_yes();
                    }
                }
            }
        }
    });
}
function show_confirmDlg(content,callback_yes){
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    $.confirm({
        theme: current_theme_color,
        title: APP_NAME,/*false*/
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        content: content,
        buttons: {
            no: {
                text:'No',
                keys: ['N'],
                btnClass:'btn-primary',
                action: function () {

                }
            },
            yes: {
                text: 'Yes',
                /*isHidden: true, */// hide the button
                keys: ['y'],
                btnClass:'btn-success',
                action: function () {
                    if(callback_yes !== undefined && callback_yes!==null){
                        callback_yes();
                    }
                }
            }
        }
    });
}
function show_confirmDlg1(title, content,callback_yes){
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    $.confirm({
        theme: current_theme_color,
        title: title,/*false*/
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        content: content,
        buttons: {
            no: {
                text:'No',
                keys: ['N'],
                btnClass:'btn-primary',
                action: function () {

                }
            },
            yes: {
                text: 'Yes',
                /*isHidden: true, */// hide the button
                keys: ['y'],
                btnClass:'btn-success',
                action: function () {
                    if(callback_yes !== undefined && callback_yes!==null){
                        callback_yes();
                    }
                }
            }
        }
    });
}
function show_confirmDlg2(title, content,button_yes, button_no, callback_yes, callback_no){
    if(current_theme_color=='' || current_theme_color==null || current_theme_color==undefined){
        current_theme_color = 'black';
    }
    $.confirm({
        theme: current_theme_color,
        title: title,/*false*/
        closeIcon: true,
        closeIconClass: 'fa fa-close',
        content: content,
        buttons: {
            no: {
                text:button_no,
                keys: ['N'],
                btnClass:'btn-primary',
                action: function () {
                    if(callback_no !== undefined && callback_no!==null){
                        callback_no();
                    }
                }
            },
            yes: {
                text: button_yes,
                /*isHidden: true, */// hide the button
                keys: ['y'],
                btnClass:'btn-success',
                action: function () {
                    if(callback_yes !== undefined && callback_yes!==null){
                        callback_yes();
                    }
                }
            }
        }
    });
}
function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*showConfirmDlg('aaa',function(){
 alert('dddd');
 });*/
function is_empty(value){
    if (value===undefined || value === null || value == '') {
        return true;
    } else {
        return false;
    }
}
function is_null(value){
    if (value===undefined || value === null) {
        return true;
    } else {
        return false;
    }
}
function priceFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function timeConverter(UNIX_timestamp){
    var unix =  Math.round(Date.now() / 1000);
    //unix = moment().unix();
    unix = unix - 360;///////////////////////////////
    //console.log('unix timestamp', unix);
    var delta = unix - UNIX_timestamp;
    //console.log('delta', delta);
    if(delta < 0) delta = 0;

    var time = "";
    if(delta >= 86400) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = "0" + a.getDate();
        var hour = "0" + a.getHours();
        var min = "0" + a.getMinutes();
        var sec = "0" + a.getSeconds();
        //time = date.substr(-2) + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
        time = date.substr(-2) + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2);
    }else{
        var hour = Math.floor(delta/3600);
        delta = delta - (hour * 3600);
        var min = Math.floor(delta/60);
        delta = delta - (min * 60);
        if(hour === 0){
            if(min===0){
                time = "Just now";
            }else{
                time = min + "minute" + (min > 1 ? "s":"") + " ago";
            }
        }else{
            time = hour + "hour" + (hour > 1 ? "s":"") + " ago";
        }
    }
    return time;
}
function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

function trim_phone($num){
    $num = $num.replace('+', '');
    $num = $num.replace('-', '');
    $num = $num.replace('_', '');
    $num = $num.replace('(', '');
    $num = $num.replace(')', '');
    $num = $num.replace(' ', '');
    $num = $num.replace(/ /g,'');
    return $num;
}
function get_phone_number_info(num,separator){
    if(is_null(separator)){
        separator = '-';
    }
    num = trim_phone(num);
    var phone_number = num.slice(-10);
    var prefix= "";
    if(num.length > phone_number.length){
        prefix =  num.substring(0, num.length - phone_number.length);
    }
    //console.log('num,,,', num, phone_number, prefix);
    var formatted = '' + phone_number.substring(0, 3) + separator + phone_number.substring(3, 6) + separator + phone_number.substring(6, 10);
    return [prefix, formatted];
}
function format_phone(num, separator, with_prefix){
    if(is_null(separator)){
        separator = '-';
    }
    if(is_null(with_prefix)){
        with_prefix = false;
    }
    var obj = get_phone_number_info(num,separator);
    if(with_prefix){
        return obj[0] + ' ' + obj[1];
    }
    return obj[1];
}


$(document).ready(function() {
   /* $('.js-select-basic-multiple').select2();
    $('.js-select2').select2();*/

    $("body").on("click",".btn-close-dlg", function(){
        $(this).closest(".jconfirm-box-container").find(".jconfirm-closeIcon").click();
    });
});

// custom function
window.is_mobile = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
   };
   
window.showToast = showToast;
window.show_dialog = show_dialog;
window.show_loading = show_loading;
window.jQuery = $;
