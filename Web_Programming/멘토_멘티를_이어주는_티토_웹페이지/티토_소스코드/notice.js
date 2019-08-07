$(document).ready(function () {// 창이 로드되면 호출
    $('#black-screen').hide();

    if (typeof (Storage) !== "undefined") {
        if (localStorage.totalPosts) {
            for (var i = 2; i <= Number(localStorage.totalPosts); i++) {//공지사항 게시판 총 포스트 수만큼 로드
                $('.posts').append(
                    //<div class="posti postline>"
                    // <a class="title">제목</a>
                    // <a class="writer">작성자</a> 형식으로 posts에 append됨
                    '<div class="post' + i + ' postline">' +
                    '<a href="javascript:;" onclick="open_post(' + i + ')" class="title">' + localStorage.getItem('post' + i + 'title') + '</a>' +
                    '<a class="writer">' + '관리자' + '</a>' + // 자유게시판과는 다르게 공지사항 게시판은 작성자 부분에 반드시 관리자로 append됨
                    '</div>'
                )
                $('body').append(
                    '<div class="black-back post-num' + i + '">' +
                    '<div class="white-post">' +
                    '<a href="javascript:;" class="x" onclick="close_post()"></a>' +
                    '<header>' + '<h1>' + localStorage.getItem('post' + i + 'title') + '</h1>' +// 번호에 해당하는 제목 로드
                    '<h6>' + localStorage.getItem('post' + i + 'time') + '</h6>' + // 번호에 해당하는 시간 로드
                    '</header>' +
                    '<section>' +
                    '<p>' + localStorage.getItem('post' + i + 'content') + '</p>' +// 번호에 해당하는 내용 로드
                    '</section>' +
                    '</div>'
                )
            }
        } else {// 전체 게시물 수가 정해지지 않은경우
            localStorage.setItem('totalPosts', '1');// 전체 게시물 수 1로 초기화
        }
    } else {
        alert('Current Browser does not support web storage');
    }

    $('.black-back').hide();
})
function write_post() { //글쓰기 창 호출 함수
    if (sessionStorage.loggedIn != 1) { // 로그인이 안된 경우
        alert('로그인 해주세요');
        return;
    }else if (sessionStorage.is_Admin != 1) { // 관리자가 아닌 경우
        alert('권한이 없습니다. (관리자만 작성가능합니다)');
        return; // 경고 호출 후 함수 종료
    }

    $('#black-screen').show();
}
function close_board() { // 글 작성 취소 함수
    $('#black-screen').hide();
}

function get_form() { // 글 작성 함수
    var title, text, time; // 각각 제목 내용 시간을 저장할 임시 변수 선언
    
    time = getTimeStamp(); // getTimeStamp() 함수를 사용 시간에 대한 문자열 저장
    title = document.getElementById("title").value;// 각 필드에 해당하는 값을 getElementById 메소드를 사용 저장
    text = document.getElementById("content").value;
    if (title == "") {
        alert('제목을 입력해주세요');
        return;
    } else if (text == "") {
        alert('내용을 입력해주세요');
        return;
    } // 유효성 검사, 제목과 내용중 입력되지 않은 경우 경고 후 함수 종료
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    localStorage.totalPosts = Number(localStorage.totalPosts) + 1;
    localStorage.setItem('post' + localStorage.totalPosts + 'title', title);
    localStorage.setItem('post' + localStorage.totalPosts + 'content', text);
    localStorage.setItem('post' + localStorage.totalPosts + 'time', time);
    /*
    공지사항 게시판 localStorage Key 값과 대응되는 변수
    totalPosts 전체 작성된 글 수 아래 값중 N에 해당
    post + N + (title, content, time) -- 각각 제목, 내용, 시간에 해당

    자유게시판과 달리 작성자가 필요 없음 (작성자가 관리자로 등록됨) 
    */


    $('.posts').append(
        //<div class="posti postline>"
        // <a class="title">제목</a>
        // <a class="writer">작성자</a> 의 형태로 posts에 append 해줌
        '<div class="post' + localStorage.totalPosts + ' postline">' +
        '<a href="javascript:;" onclick="open_post(' + localStorage.totalPosts + ')" class="title">' + title + '</a>' +
        '<a class="writer">' + '관리자' + '</a>' +
        '</div>'
    )
    $('body').append(
        //div class로 black-back, post-num 속성 부여
        '<div class="black-back post-num' +  localStorage.totalPosts + '">' + // 게시물 번호
        '<div class="white-post">' +
        '<a href="javascript:;" class="x" onclick="close_post()"></a>' +
        '<header>' + '<h1>' + title + '</h1>' + // 제목
        '<h6>' + time + '</h6>' + '<br/>' +  // 시간
        '</header>' +
        '<section>' +
        '<p>' + text + '</p>' + // 내용
        '</section>' +
        '</div>'
        //을 각각 게시물 내용으로 추가
    )

    $('#black-screen').hide();
    $('.black-back').hide(); // 새로생긴 요소들 hide();
}

function open_post(num) { // 포스트 여는 함수
    $('.post-num' + num).show(); // 해당 번호에 해당하는 포스트를 show
}

function close_post() { // 포스트 닫는 함수
    $('.black-back').hide();
}


function getTimeStamp() { // 시간을 문자열로 리턴해주는 함수
  var d = new Date(); // Date 클래스 생성자를 사용하여 d에 현재 시간 클래스 형태로 저장

  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

    // 년, 월, 일, 시, 분, 초에 해당하는 메소드를 leadingZeros 함수를 사용 문자열로 결합한다.

  return s; //문자열 s 리턴
}



function leadingZeros(n, digits) { // 0의 개수를 digits변수에 맞게 맞춰주는 함수
  var zero = ''; // zero 변수에 공백 개수를 받기 위해 빈 문자열로 초기화
  n = n.toString(); // n을 문자열로 변형

  if (n.length < digits) { // n의 길이가 digits보다 작으면
    for (i = 0; i < digits - n.length; i++) //반복문을 사용 digits-n의 길이 만큼 반복
      zero += '0'; //zero 변수에 0 추가
  }
  return zero + n; // zero에 n 이어붙인 문자열 리턴
}
