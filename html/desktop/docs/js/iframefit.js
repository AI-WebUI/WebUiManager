/**
 * Created by Administrator on 2016/10/8.
 */
//   function fitheight(){
//        var main = $(window.parent.document).find("#iframe_m");
//        //var thisheight = $(document).height() + 30;
//        //main.height(thisheight);
//        main.style.height=main.contentWindow.document.body.scrollHeight +0 + "px";
//}
//setInterval(fitheight,500);
function fitheight(){
           var iframe = document.getElementById("iframe_m");
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight +0 + "px";
        }
setInterval(fitheight,500);