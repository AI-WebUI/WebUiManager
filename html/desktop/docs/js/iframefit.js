/**
 * Created by Administrator on 2016/10/8.
 */
    $(window.parent.document).find("#iframe_m").load(function () {
        var main = $(window.parent.document).find("#iframe_m");
        //var thisheight = $(document).height() + 30;
        //main.height(thisheight);
        main.style.height = main.contentWindow.document.body.scrollHeight +0 + "px";
    });