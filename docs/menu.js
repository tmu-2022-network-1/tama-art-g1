document.write("<script type='text/javascript' src='index.js'></script>"); //できない！！！！！！

//index.jsから値を取得
var query = location.search;
var value = query.split('=');

//詳細ページに遷移
function loadMenu()
{
    alert(value[1]); //できる
    alert(gallerydata[value[1]].title); //できない
    //クリックしたオブジェクトによって詳細ページの内容を変更
    var title = document.getElementById("title")
    title.innerHTML = gallerydata[value[1]].title;
}

function test()
{
    alert(decodeURIComponent(value[1]));
}

window.addEventListener("DOMContentLoaded", loadMenu());