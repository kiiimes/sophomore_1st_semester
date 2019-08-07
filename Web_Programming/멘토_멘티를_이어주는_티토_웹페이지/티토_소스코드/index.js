// 페이지가 로드 되었을때 실행할 스크립트들

$(document).ready(function () { 
    $("#top").masonry({ 
        itemSelector: ".tile",
        columnWidth: 5
    });
})

$(document).ready(function () {
    $("#bottom").masonry({
        itemSelector: ".tile",
        columnWidth: 5
    });
}) // 각각 top과 bottom id에 해당하는 div에 masonry 플러그인을 적용

$(document).ready(function () {
    if (localStorage.totalPosts) { // 공지사항 게시판에 총 게시물이 1 이상일 경우
            for (var i = 2; i <= Number(localStorage.totalPosts); i++) { //전체 게시물의 수만큼 반복문 동작
                $('.notice-link section').append(
                    //<div class="posti postline>"
                    // <a class="title">제목</a>
                    // <a class="writer">작성자</a>
                    '<div class="post' + i + ' mainpost">' +
                    '<a href="javascript:;" onclick="open_post(' + i + ')" class="title">' + localStorage.getItem('post' + i + 'title') + '</a>' +
                    '</div>'
                ) // 공지사항 div의 후손중 section에 위의 html태그 내용들을 append
                $('body').append(
                    '<div class="black-back post-num' + i + '">' +
                    '<div class="white-post">' +
                    '<a href="javascript:;" class="x" onclick="close_post()"></a>' +
                    '<header>' + '<h1>' + localStorage.getItem('post' + i + 'title') + '</h1>' +
                    '<h6>' + localStorage.getItem('post' + i + 'time') + '</h6>' +
                    '</header>' +
                    '<section>' +
                    '<p>' + localStorage.getItem('post' + i + 'content') + '</p>' +
                    '</section>' +
                    '</div>'
                ) // body뒤에 게시글에 해당하는 html 태그 내용들을 append
            }
    }

})

function open_post(num) { // 글이 클릭되었을 때 실행될 함수
    $('.post-num' + num).show(); // 클릭된 글에 해당하는 num에 대한 포스트를 show
}

function close_post() { // x 버튼이 클릭 되었을 때 실행될 함수
    $('.black-back').hide();
}
