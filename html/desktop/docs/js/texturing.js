/**
 * Created by Administrator on 2016/4/6.
 */
$(function () {
    var html=$('html').html();
    $("pre").text(html).addClass("prettyprint linenums");
    prettyPrint();
})
