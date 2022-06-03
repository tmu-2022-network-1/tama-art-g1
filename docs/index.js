var mapContent = [];
var mapTitle = [];
var mapLat = [];
var mapLng = [];
var mapAddress = [];
var mapID = [];

function getJSON(){
    let request = new XMLHttpRequest();
    alert("データを取得しています");

    //json読み込み時の処理
    request.onreadystatechange = function() {
        //全てのデータを受信。正常に処理された場合
        if(request.readyState == 4 && request.status == 200) {
            alert(request.responseText);
            var gallerydata = JSON.parse(request.responseText); //JSONデータをパース

            var elem = document.getElementById("output_title")
            elem.innerText = gallerydata[0].title; //指定の位置に取得したデータを追加

            for(i=0; i < gallerydata.length + 1; i++)
            {
                mapTitle[i] = gallerydata[i].title;
                mapLat[i] = gallerydata[i].lat;
                mapLng[i] = gallerydata[i].lon;
                mapID[i] = gallerydata[i].id;

            }
        }
    };
    request.open("GET", "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec?sheet=events", false);
    request.send();
}

function initMap() {
    var mapPosition = { lat: 35.633, lng: 139.446 }
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

    //マーカーの設定
    var markerOptions1 = {
        title: "marker",
        map: map,
        position: mapPosition, //設置場所
        icon: '', //アイコンのURL
    };
    
    //設定したマーカーを設置
    var marker1 = new google.maps.Marker(markerOptions1);

    //コジコジ万博の場所
    let latlng2 = {lat: 35.7039604, lng: 139.4093263};

    let latlng3 = new google.maps.LatLng(mapLat[0], mapLng[0]);
    
    //gallerydata[0]を使ったマーカーを作成
    var markerOptions2 = {
        title: "marker2",
        map: map,
        position: latlng2, //設置場所 配列むり？
        icon: '', //アイコンのURL
    };

    //直前の設定のマーカーを設置
    var marker2 = new google.maps.Marker(markerOptions2);

    //マーカーホバー時の内容
    var iwopts1 = {
        content: 'hello',
        position: latlng2
    };

    //gallerydataを使用したデータ
    var iwopts0 = {
        content: mapTitle[0],
        position: latlng3,
    }

    /*
    //配列を使用してjsonデータからマーカーを作成
    function markerCreate(){
        for (i=0; i < mapID.length; i++)
        {

        //マーカーの設定
        var markerOptions = {
            title: mapID[i],
            map: map,
            position: new google.maps.LatLng(mapLat[i], mapLng[i]),
            icon: '',
        }
        //マーカーホバー時の内容
        var iwopts = {
            content: mapTitle[i],
            position: new google.maps.LatLng(mapLat[i], mapLng[i]),
        }

        var markers = new google.maps.Marker(markerOptions);

        var hoberinfo = new google.maps.InfoWindow(iwopts);

        //mouseoverイベントを取得するListenerを追加
        google.maps.event.addListener(markers, 'mouseover', function(){
            hoverinfo.open(map, markers);
        })

        //mouseoutイベントを取得するListenerを追加
        google.maps.event.addListener(markers, 'mouseout', function(){
            hoverinfo.close();
        })

        }
    }
    */

    //インフォの設定
    var hoverinfo1 = new google.maps.InfoWindow(iwopts1);

    //mouseoverイベントを取得するListenerを追加
    google.maps.event.addListener(marker1, 'mouseover', function(){
        hoverinfo1.open(map, marker1);
    })

    //mouseoutイベントを取得するListenerを追加
    google.maps.event.addListener(marker1, 'mouseout', function(){
        hoverinfo1.close();
    })

    var hoverinfo2 = new google.maps.InfoWindow(iwopts0);
    
    
    google.maps.event.addListener(marker2, 'mouseover', function(){
        hoverinfo2.open(map, marker2);
    })

    google.maps.event.addListener(marker2, 'mouseout', function(){
        hoverinfo2.close();
    })
    
}

//サイト読み込み時の処理（アクティブにすると複数回読み込まれるけどないとjsonが後になるので配列に反映されない）
window.addEventListener("load", function() {
    getJSON();
    initMap();
})
