/**
 * Created by Administrator on 2016/3/25.
 */
function up(str){
    //移除源码代码中无效的代码
    str = str.replace('style="position:absolute;"',"");

    str = str.replace(/</ig,'&lt;');
    str = str.replace(/>/ig,'&gt;');
    //str = str.replace(/\n/ig,'<br />');
    str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});

    str = str.replace(/\[hr\]/ig,'<hr />');
    str = str.replace(/\[\/(size|color|font|backcolor)\]/ig,'</font>');
    str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'<$1>');
    str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig,'</$1>');
    str = str.replace(/\[\/align\]/ig,'</p>');
    str = str.replace(/\[(\/)?h([1-6])\]/ig,'<$1h$2>');

    str = str.replace(/\[align=(left|center|right|justify)\]/ig,'<p align="$1">');
    str = str.replace(/\[size=(\d+?)\]/ig,'<font size="$1">');
    str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
    str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
    str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
    str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig,'<ol type="$1">$2</ol>');
    str = str.replace(/\[(\/)?list\]/ig,'<$1ul>');

    str = str.replace(/\[s:(\d+)\]/ig,function($1,$2){ return smilepath($2);});
    str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig,'<img src="$1" border="0" />');
    str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$2'+'</a>');
    str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">'+'$1'+'</a>');
    return str;
}