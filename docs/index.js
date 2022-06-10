var gallerydata = [];
var gallerydata2 = [];
var markerOptions = [];
var markers = [];
var markerID = [];
var iwopts = [];
var hoverinfos = [];

var map;
var new_element;

function getJSON(){
    let request = new XMLHttpRequest();
    //alert("データを取得しています");

    //json読み込み時の処理
    request.onreadystatechange = function() {
        //全てのデータを受信。正常に処理された場合
        if(request.readyState == 4 && request.status == 200) {
            //alert(request.responseText);
            gallerydata = JSON.parse(request.responseText); //JSONデータをパース
        }
    };
    request.open("GET", "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec?sheet=events", false);
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
        }
    };
    request2.open("GET", "https://script.google.com/macros/s/AKfycbxhZ4ww0rLhp6A72xu4HznL5g-cA6BqosnggI2xlzzqrQKqVbq2HTLZO8MpdnaIkZLG_Q/exec", false);
    request2.send();
}

/*
function JSONDelete()
{
    for(i=0; i < gallerydata.length; i++)
    {
        if(gallerydata[i].title = "")
        {
            delete(gallerydata[i]);
            delete(gallerydata2[i]);
        }
    }
}
*/

function initMap() {
    var mapPosition = { lat: 35.702, lng: 139.394 } //mapの中心
    var mapArea = document.getElementById("map");
    var mapOptions = {
        center: mapPosition,
        zoom: 11,
        styles: [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi.business"
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {},
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "elementType": "labels"
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {},
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {},
    {},
    {}
    ]
    };
    
    //マップを設置
    map = new google.maps.Map(mapArea, mapOptions);

    /*
    //マーカーの設定
    var markerOption = {
        title: "marker",
        map: map,
        position: mapPosition, //設置場所
        icon: '', //アイコンのURL
    };
    
    //設定したマーカーを設置
    var marker = new google.maps.Marker(markerOption);

    //マーカーホバー時の内容
    var iwopt = {
        content: 'hello',
        position: mapPosition,
    };

    //インフォの設定
    var hoverinfo = new google.maps.InfoWindow(iwopt);

    //mouseoverイベントを取得するListenerを追加
    google.maps.event.addListener(marker, 'mouseover', function(){
        hoverinfo.open(map, marker);
    })

    //mouseoutイベントを取得するListenerを追加
    google.maps.event.addListener(marker, 'mouseout', function(){
        hoverinfo.close();
    })
    */

    //配列を使用してマーカーを作成
    for (i=0; i < gallerydata.length; i++)
    {
        markerOptions[i] = {
            title: '',
            map: map,
            position: new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon),
            icon:'', //アイコンのURL
        }

        markers[i] = new google.maps.Marker(markerOptions[i]);

        iwopts[i] = {
            content: gallerydata[i].title,
            position: new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon),
        }

        //インフォの設定
        hoverinfos[i] = new google.maps.InfoWindow(iwopts[i]);

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
            //横のメニューが対応してスクロール
            var scrollPos = i * 160; //gallerydataのheight150 + margin10;
            var scroll_element = document.getElementById("scroll");
            scroll_element.scrollTo(0, scrollPos);

            //クリックしたmarkerが中心になるようにパン
            map.panTo(new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon));
        })
    }
}

//メニュー編集用
function galleryMenuEdit()
{
    var fragment = document.createDocumentFragment(); //frangmentを追加
    var scroll_element = document.getElementById('scroll'); //id属性scrollを取得

    for(i=0; i < gallerydata.length; i++)
    {
        //新しい要素を追加
        new_element = document.createElement('p');
        new_element.textContent = gallerydata[i].title + '\n' + gallerydata[i].venue;

        //galleryMenuクラスを付与
        new_element.classList.add("galleryMenu");

        //fragmentに追加
        fragment.appendChild(new_element);
    }

    //scrollの末尾に一括挿入
    scroll_element.appendChild(fragment);
    //menuClick();
}

function allGallery()
{
    alert("すべて");
}

function opening()
{
    alert("営業中");
}

function free()
{
    alert("入場無料");
}


//メニュークリック処理
function menuClick()
{
    /*
    var gallery_element = document.getElementsByClassName('galleryMenu')
    gallery_element.addEventListener('click', function(){
        map.panTo(new google.maps.LatLng(gallerydata2[i].lat, gallerydata2[i].lon));
        alert("menu now");
    });
    */

    document.getElementsById('scroll').addEventListener('click', function(){
        alert("A");
    })
}


//テスト用
function test()
{
    alert(gallery.length);
}

//サイト読み込み時の処理
window.addEventListener("DOMContentLoaded", function() {
    getJSON();
    getJSON2();
    //JSONDelete();
    galleryMenuEdit();
    initMap();
})
