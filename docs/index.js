let gallerydata = [];
var gallerydata2 = [];
var markerOptions = [];
var markers = [];
var markerID = [];
var iwopts = [];
var hoverinfos = [];
var clickinfos = [];

var map;
var new_element;
var currentInfoWindow = null;
var galleryMenuArray = [];

function getJSON(){
    let request = new XMLHttpRequest();
    //alert("データを取得しています");

    //json読み込み時の処理
    request.onreadystatechange = function() {
        //全てのデータを受信。正常に処理された場合
        if(request.readyState == 4 && request.status == 200) {
            //alert(request.responseText);
            gallerydata = JSON.parse(request.responseText); //JSONデータをパース
            gallerydata = gallerydata.filter(d => d.title !== '')
        }
    };
    request.open("GET", "https://script.googleusercontent.com/macros/echo?user_content_key=KQdYRF3Ay5vsl9PlF_aBgAfLZA2Mf3VRf_diLN0R4UerpBhK79TGV7kJP_KeMXUUPXrOJvapXdjWLEovg7WJ05OwZhEezYrpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGZdoPlb0IGml4_OMP16J45dKse2zz4h-WDBTs9xzMk7kkFz-Bu9aE-kz-ysEQ868d3uVCuwDB3jDPuUtGg-AA_8IR5cXPekpO6QzIpnjC143y7Yrtn84oQ&lib=MabRb0sHcOdgcukW2MiMwBlocHvvcqee0", false);
    request.send();
}

function getJSON2(){
    let request2 = new XMLHttpRequest();
    //alert("データを取得しています");

    //json読み込み時の処理
    request2.onreadystatechange = function() {
        //全てのデータを受信。正常に処理された場合
        if(request2.readyState == 4 && request2.status == 200) {
            //alert(request2.responseText);
            gallerydata2 = JSON.parse(request2.responseText); //JSONデータをパース
            gallerydata2 = gallerydata2.filter(d => d.name !== '')
        }
    };
    request2.open("GET", "https://script.google.com/macros/s/AKfycbxhZ4ww0rLhp6A72xu4HznL5g-cA6BqosnggI2xlzzqrQKqVbq2HTLZO8MpdnaIkZLG_Q/exec", false);
    request2.send();
}

function initMap() {
    var mapPosition = { lat: 35.680, lng: 139.400} //mapの中心
    var mapArea = document.getElementById("map");
    var mapOptions = {
        center: mapPosition,
        zoom: 11,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false, 
        styles: [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#e0efef"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#c0e8e8"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 700
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#7dcdcd"
                    }
                ]
            }
        ]
    };
    
    //マップを設置
    map = new google.maps.Map(mapArea, mapOptions);

    //配列を使用してマーカーを作成
    for (i=0; i < gallerydata.length; i++)
    {
        markerOptions[i] = {
            title: '',
            map: map,
            position: new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon),
            icon:'images/pin.png', //アイコンのURL
        }

        markers[i] = new google.maps.Marker(markerOptions[i]);

        
        var gw = [];
        gw[i] = gallerydata[i].thumbnail.width;
        gallerydata[i].thumbnail.height = 20;
        gallerydata[i].thumbnail.width = gw[i] * (20 / gallerydata[i].height);
        

        //ホバー時のインフォの内容の設定
        var ContentStr = [];
        ContentStr = `<p><img src="${gallerydata2[i].photo}" height="130"></a></p><br>
        <p>${gallerydata[i].venue}<p><br>
        <p><button type="button" onclick="moveURL(${i})">会場HP</button><p>`; //ボタンを押すとURLのページに遷移
        iwopts[i] = {
            content: ContentStr, 
            position: new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon),
        }

        //インフォの設定
        hoverinfos[i] = new google.maps.InfoWindow(iwopts[i]);
        clickinfos[i] = new google.maps.InfoWindow(iwopts[i]);

        markerEvent(i);
    }

    function markerEvent(i)
    {
        //mouseoverイベントを取得するListenerを追加
        google.maps.event.addListener(markers[i], 'mouseover', function(){
        hoverinfos[i].open(map, markers[i]);
        })

        //mouseoutイベントを取得するListenerを追加
        google.maps.event.addListener(markers[i], 'mouseout', function(){
        hoverinfos[i].close();
        })

        //マーカークリック時のイベント
        google.maps.event.addListener(markers[i], 'click', function(){

            //開いている吹き出しがあったら閉じる
            if(currentInfoWindow) {
                currentInfoWindow.close();
            }

            //現在開いている吹き出しの更新
            clickinfos[i].open(map, markers[i]);
            currentInfoWindow = clickinfos[i];

            //横のメニューが対応してスクロール
            var scroll_element = document.getElementById("scroll");
            scroll_element.scrollTo({
                top: i * 210, //gallerydataのheight200 + margin10;
                behavior: 'smooth',
            });

            //選択したメニュー以外の枠線を消しサイズを戻す
            for (a=0; a < gallerydata.length; a++)
            {
                document.getElementById(a).style.borderWidth = "0px";
                //document.getElementById(a).style.height = "150px";
            }
            //クリックしたメニューに枠線をつけサイズを変更
            document.getElementById(i).style.border = "solid 3px blue";
            //document.getElementById(i).style.height = "300px";

            //クリックしたmarkerが中心になるようにパン
            map.panTo(new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon));
        })
    }
}

//メニュー作成用
function galleryMenuEdit()
{
    var fragment = document.createDocumentFragment(); //frangmentを追加
    var scroll_element = document.getElementById('scroll'); //id属性scrollを取得

    for(i=0; i < gallerydata.length; i++)
    {
        let elementID = i; //これがあるとなぜかaddEventlistenerが正常に動く
        var galleryMenuText = [];
        galleryMenuText[i] = `<p><img src="${gallerydata[i].thumbnail}" height="150"></p><p>${gallerydata[i].title}</p>
        <p><input type="button" value="詳細" onclick="popUp(${i})"></p>`

        //新しい要素を追加
        new_element = document.createElement('p');
        new_element.innerHTML = galleryMenuText[i];

        //galleryMenuクラスを付与
        new_element.classList.add("galleryMenu");

        new_element.id = i;

        //クリック時イベント
        new_element.addEventListener('click', function(){
            //クリックした展示と対応したギャラリーのmarkerが中心になるようにパン
            map.panTo(new google.maps.LatLng(gallerydata2[elementID].lat, gallerydata2[elementID].lon));

            //開いているウィンドウがあれば閉じる
            if(currentInfoWindow) {
                currentInfoWindow.close();
            }

            clickinfos[elementID].open(map, markers[elementID]);
            currentInfoWindow = clickinfos[elementID];

            //横のメニューが対応してスクロール
            var scroll_element = document.getElementById("scroll");
            scroll_element.scrollTo({
                top: elementID * 210, //gallerydataのheight200 + margin10;
                behavior: 'smooth',
            });

            //選択したメニュー以外の枠線を消す
            for (a=0; a < gallerydata.length; a++)
            {
                document.getElementById(a).style.borderWidth = "0px";
                //document.getElementById(a).style.height = "150px";
            }
            //クリックしたメニューに枠線をつけサイズを変更
            this.style.border = "solid 3px blue";
            //this.style.height = "300px";
        });

        //fragmentに追加
        fragment.appendChild(new_element);
    }

    //scrollの末尾に一括挿入
    scroll_element.appendChild(fragment);
;}

function galleryURL(i)
{
    location.href = gallerydata[i].url;
}

//会場URLへのページ遷移
function moveURL(i)
{
    document.location.href = gallerydata[i].url;
}

//詳細ページに遷移
function popUp(i)
{
    var modal = document.getElementById("modal");
    modal.style.visibility = "visible";
    var black = document.getElementById("black")
    black.style.visibility = "visible";
    //モーダル以外をクリックしたらモーダルを閉じる
    black.addEventListener('click', (event) =>{
        if(event.target.closest('#black'))
        {
            modal.style.visibility = "hidden";
            black.style.visibility = "hidden";
        }
    });

    document.getElementById("thumbnail").innerHTML = `<img src="${gallerydata[i].thumbnail}" height="300px">`
    document.getElementById("title").innerHTML = gallerydata[i].title;
    document.getElementById("date").innerHTML = `${gallerydata[i].startDate} - ${gallerydata[i].endDate}`;
    document.getElementById("admission").innerHTML = gallerydata[i].admission;
    document.getElementById("url").innerHTML = `<a href="${gallerydata[i].url}"></a>`;
    document.getElementById("openingtime").innerHTML = gallerydata2[i].openingTime;
    document.getElementById("access").innerHTML = gallerydata2[i].access;
    document.getElementById("article").innerHTML = "";
}

//テスト用
function test()
{
    alert(i);
}

//サイト読み込み時の処理
window.addEventListener("DOMContentLoaded", function() {
    getJSON();
    getJSON2();
    galleryMenuEdit();
    initMap();
})
