(function ($) {

    $('#login-form').submit(function(event){
        if ( $( "input:first" ).val() === "" ) {
            $("span:first").text( "Email is require !!").show();
        }
        else if ( $( "input:first" ).val() === "" ) {
            $("span:first").text( "Email is require !!").show();
        }
        event.preventDefault();
        return false;
    });

})(jQuery);