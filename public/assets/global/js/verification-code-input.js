  /*sms verification box*/
  $(function() {
     
    $("body").on("input", "input.verification-code-item", function(e){
        var str = $(this).val();
        if(e.originalEvent !== undefined){
            if(e.originalEvent.data == '-' || e.originalEvent.data == '+' || e.originalEvent.data == '.'){
                //str.replace('-','');
                //str.replace('+','');
                //str.replace('.','');
                $(this).val("");
                return false;
            }
        }

        if(str.length >= 1) {
            if($(this).index() == $("input.verification-code-item").length - 1) {
                $("input.verification-code-item:first-child").focus();
            }else{
                $(this).next().focus();
            }
        }
        if(str.length > 1) {
            $(this).val(str.charAt(str.length-1));
        }
    })
})