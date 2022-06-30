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
            position: new google.maps.LatLng(gallerydata2[gallerydata[i].venueId-1].lat, gallerydata2[gallerydata[i].venueId-1].lon),
            icon:new google.maps.MarkerImage(
                'images/pin.png', //マーカー画像のURL
                new google.maps.Size(80,50),    //マーカー画像のサイズ
            )
        }

        markers[i] = new google.maps.Marker(markerOptions[i]);

        
        var gw = [];
        gw[i] = gallerydata[i].thumbnail.width;
        gallerydata[i].thumbnail.height = 20;
        gallerydata[i].thumbnail.width = gw[i] * (20 / gallerydata[i].height);
        

        //ホバー時のインフォの内容の設定
        var ContentStr = [];
        ContentStr = `<p class="hover"><img src="${gallerydata2[gallerydata[i].venueId-1].photo}" height="130px" class="img"></a></p><br>
        <p class="venue">${gallerydata[i].venue}<p><br>
        <p><button type="button" onclick="moveURL(${i})" class="hpButton">会場HP</button><p>`; //ボタンを押すとURLのページに遷移
        iwopts[i] = {
            content: ContentStr, 
            position: new google.maps.LatLng(gallerydata2[gallerydata[i].venueId-1].lat, gallerydata2[gallerydata[i].venueId-1].lon),
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

            //選択したメニュー以外の枠線を消す
            for (a=0; a < gallerydata.length; a++)
            {
                document.getElementById(a).style.borderWidth = "0px";
            }
            //クリックしたメニューに枠線をつける
            document.getElementById(i).style.border = "solid 3px white";

            //クリックしたmarkerが中心になるようにパン
            map.panTo(new google.maps.LatLng(gallerydata2[gallerydata[i].venueId-1].lat, gallerydata2[gallerydata[i].venueId-1].lon));

            //離れすぎていたらズーム
            var currentZoom = map.getZoom();
            if (currentZoom != 12)
            {
                map.setZoom(12);
            }
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
        galleryMenuText[i] = `<div class="gmthumbnail"><img src="${gallerydata[i].thumbnail}" height="150px"></div>
        <div class="gmcontent"><div class="gmtit">${gallerydata[i].title}</div><a class="gmbutton" onclick="popUp(${i})">read more</a></div>`

        //新しい要素を追加
        new_element = document.createElement('p');
        new_element.innerHTML = galleryMenuText[i];

        //galleryMenuクラスを付与
        new_element.classList.add("galleryMenu");

        new_element.id = i;

        //クリック時イベント
        new_element.addEventListener('click', function(){
            //クリックした展示と対応したギャラリーのmarkerが中心になるようにパン
            map.panTo(new google.maps.LatLng(gallerydata2[gallerydata[elementID].venueId-1].lat, gallerydata2[gallerydata[elementID].venueId-1].lon));

            //離れすぎていたらズーム
            var currentZoom = map.getZoom();
            if (currentZoom != 12)
            {
                map.setZoom(12);
            }

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
            }
            //クリックしたメニューに枠線をつける
            this.style.border = "solid 3px white";
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

//モーダル生成
function popUp(i)
{
    var modal = document.getElementById("modal");
    modal.style.visibility = "visible";
    modal.classList.add("fadeinmodal");
    var black = document.getElementById("black");
    black.classList.remove("fadeout");
    black.style.visibility = "visible";
    black.classList.add("fadein")
    //モーダル以外をクリックしたらモーダルを閉じる
    black.addEventListener('click', (event) =>{
        if(event.target.closest('#black'))
        {
            black.classList.remove("fadein");
            modal.classList.remove("fadeinmodal");

            modal.style.visibility = "hidden";
            black.classList.add("fadeout");
            
        }
    });

    document.getElementById("thumbnail").innerHTML = `<img src="${gallerydata[i].thumbnail}" class="photo">`
    document.getElementById("title").innerHTML = gallerydata[i].title;
    document.getElementById("venue").innerHTML = gallerydata[i].venue;
    document.getElementById("admission").innerHTML = gallerydata[i].admission;
    document.getElementById("url").innerHTML = `<a href="${gallerydata[i].url}"><font color="white">${gallerydata[i].url}</a>`;
    document.getElementById("openingtime").innerHTML = gallerydata2[gallerydata[i].venueId-1].openingTime;
    document.getElementById("access").innerHTML = gallerydata2[gallerydata[i].venueId-1].station + " " + gallerydata2[gallerydata[i].venueId-1].access;
    document.getElementById("ricense").innerHTML = gallerydata2[gallerydata[i].venueId-1].photoLicense;

    if (i === 7)
    {
        document.getElementById("modal").style.overflow = "auto";
        document.getElementById("article").style.height = "auto";
        document.getElementById("article").style.padding = "20px";
        document.getElementById("article").style.visibility = "visible";
        document.getElementById("article").innerHTML = "もののイメージを積み重ね、時間という抽象的な概念を１つの画面上に表現し過去、未来、今の時間に実体を与える試みをしている大橋麻里子のこの作品展は、タイトルである「cross story」にある通り、時間軸によって自分が見たり感じたりした記録を一つの作品の画面上に存在させ、それぞれの物語を交差させる意図を持ちます。それにより私たちは走馬灯的に作家自身の記憶に思いを馳せることができ、元の時間軸から切り離されたモチーフ達は新しい１つの作品の枠組みの中で交わり合い新たなストーリーを作り上げていくのではないでしょうか。";
    }
    else if (i === 5)
    {
        document.getElementById("modal").style.overflow = "auto";
        document.getElementById("article").style.height = "auto";
        document.getElementById("article").style.padding = "20px";
        document.getElementById("article").style.visibility = "visible";
        document.getElementById("article").innerHTML = "「TAMAのアートは百花繚乱」という展示は、多摩信用金庫の所蔵品から構成されるコレクション展です。<br>人間国宝にも選ばれた陶工藤本能道、日本画家の佐藤多持、篆刻家の本田谷庵など、多摩を中心に創作活動をした作家たちの作品を並べ、多摩の文化の豊かさを紹介しまています。<br>美術館の中には資料室が併設されており、モネ・ダリなど著名な海外作家についての資料集を読めるだけではなく、多摩に関する美術、芸術に関する資料を探すことができます。<br>たましん歴史美術館は多摩信用金庫の６階にあることもあってか、あまり人がおらず静かなので落ち着いて鑑賞することができ、資料室でもゆっくり本を読むことができました。<br>では、この展示でコレクションされている作品の中から佐藤多持の作品について紹介したいと思います。<br>佐藤多持は1919年に東京府多摩郡国分寺町に生まれ、真言宗観音寺の次男として生まれ、1937年に東京美術学校日本画科に入学しました。戦後間もないころに尾瀬へのスケッチ旅行で水芭蕉に出会って以来、一貫して水芭蕉をモチーフとして描き続けていたが、次第にその作風は具体的なものから半球形や垂直線、水平線などの抽象的なパターンによる構成も経て1960年代から大きな墨線の円弧を使用した抽象画である“水芭蕉曼荼羅“シリーズへと移行していきました。<br>独特な水芭蕉の曲線美と宗教観と宇宙、世界の在り方を表現する曼荼羅を組み合わせ芸術的な抽象画として表現した水芭蕉曼荼羅は、曼荼羅という名前の通り彼の生まれた寺である真言宗観音寺の宗教観や世界観が受け継がれていると考えられます。仏や菩薩など諸仏諸尊の集会する楼閣を模式的に上下左右対称的に描かれるとされる曼荼羅とは少し違う不規則性を持った形で描かれる水芭蕉曼荼羅ですが、これは佐藤多持が自分自身で曼荼羅を解釈し、自分が感動した水芭蕉という形で曼荼羅を表現する佐藤多持の世界観と宗教観を窺い知ることができます。不規則性を持った曲線や円弧を絵画として描くうえで、曼荼羅のようなシンメトリックな気持ちよさを水芭蕉の曲線に見出したのではないでしょうか。"
    }
    else if (i === 53)
    {
        document.getElementById("modal").style.overflow = "auto";
        document.getElementById("article").style.height = "auto";
        document.getElementById("article").style.padding = "20px";
        document.getElementById("article").style.visibility = "visible";
        document.getElementById("article").innerHTML = "兒嶋画廊は閑静な住宅街の中にひっそりたたずむ小さな画廊です。丘の上APTの建物は建築家である藤本昭信氏による建築作品である「トタンの家」であり、かつて隣接していた「丘の上アパート」の名前を継承しArt Perspective Textileの頭文字をとって名付けられました。<br>現在開催されている赤瀬川原平と三木富雄の展覧会「共に1937年生まれ、真のダダイストだった」は前衛芸術家であった赤瀬川原平と、同じ年に生まれ、人間の耳をモチーフにした彫刻を多数発表したことで有名な三木富雄の二人が取り上げられています。<br>1960年代から前衛芸術家として活動した記録(三木富雄の「耳」や赤瀬川源平の「千円札」など)がこの作品展によって追うことができます。<br>三木富雄は1963年から1978年に急逝するまで左耳をモチーフとして作品を作り続けたが、そこには「耳に選ばれた」という三木の呪いのようなアイデンティティがあったのではないでしょうか。"
    }
    else
    {
        document.getElementById("article").innerHTML = "";
        document.getElementById("article").style.height = "0px";
        document.getElementById("article").style.padding = "0px";
        document.getElementById("article").style.visibility = "hidden";
    }
}

//サイト読み込み時の処理
window.addEventListener("DOMContentLoaded", function() {
    getJSON();
    getJSON2();
    galleryMenuEdit();
    initMap();
})

//検索欄に入入力するたびにリアルタイム検索
document.getElementById("searchbox").addEventListener('input', search);
