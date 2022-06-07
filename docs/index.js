var gallerydata = [];
var gallerydata2 = [];
var markerOptions = [];
var markers = [];
var markerID = [];
var iwopts = [];
var hoverinfos = [];

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
    request2.open("GET", "https://script.googleusercontent.com/macros/echo?user_content_key=waQ6VHdXN81Ak5am0kKHyOMEk-chJHeXmz_hRUjjM_DCPBjQw4aVOFX-lvowrIbpvXCCL1oqjAMVzwOiZIl1ZCII_D8gsTHVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEmHHJxhC_oe1Qmd2R-eXjoXgTxWUu4HYlJom6QacPSgNEmyKwSz32FPG-bn2sJSQBMlTA-c0F3yHHty0meKf-_VOxuX8xhGctz9Jw9Md8uu&lib=MabRb0sHcOdgcukW2MiMwBlocHvvcqee0", false);
    request2.send();
}

function initMap() {
    var mapPosition = { lat: 35.633, lng: 139.446 } //mapの中心
    var mapArea = document.getElementById("map");
    var mapOptions = {
        center: mapPosition,
        zoom: 10,
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
    var map = new google.maps.Map(mapArea, mapOptions);

    //配列を使用してマーカーを作成
    for (i=0; i < gallerydata.length+1; i++)
    {
        markerOptions[i] = {
            title: markerID[i],
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

        //mouseoverイベントを取得するListenerを追加
        google.maps.event.addListener(markers[i], 'mouseover', function(){
        hoverinfos[i].open(map, markers[i]);
        })

        //mouseoutイベントを取得するListenerを追加
        google.maps.event.addListener(markers[i], 'mouseout', function(){
        hoverinfos[i].close();
        })
    }
}

//テスト用
function test()
{
    alert("test");
}


//サイト読み込み時の処理
window.addEventListener("DOMContentLoaded", function() {
    getJSON();
    getJSON2();
    initMap();
})
