$(document).ready(function () {// 웹페이지가 로드된후 바로 실행

	if (typeof (Storage) !== "undefined") { //local storage 지원 여부 확인
		if (localStorage.totaluser) { // totaluser변수가 있는지 확인
		} else {
			//totaluser 변수가 로컬 스토리지 내에 없을 경우
			localStorage.setItem('totaluser', '1'); // 전체 유저 1로 초기화
			localStorage.setItem('user1-ID', 'admin'); 
			// user + N + -ID 형식으로 아이디 설정 
			// 1번째 user ID 로 admin 설정
			localStorage.setItem('user1-PW', 'admin');
			// user + N + -PW 형식으로 비밀번호 설정
			// 1번째 user PW 로 admin 설정
			localStorage.setItem('user1-ADMIN', '1');
			// user + N + -ADMIN 형식으로 어드민 여부 설정
			// 1번째 user 를 어드민으로 설정

			
		}
	} else { // 지원이 안되는 경우 오류 메시지 출력
		alert('Current Browser does not support web storage');
	}

	if (sessionStorage.loggedIn == '1') change_loginfo();
	//sessionStorage에서 로그인 여부를 저장하는 변수인 loggedIn이 1일 경우 change_loginfo() 함수 호출

})

function menuOpen(no) {//outer-menu를 클릭했을 때 호출되는 함수, 메뉴의 번호를 인자로(no) 입력받는다.

	for (var i = 1; i < 3; i++) {// 반복문을 사용하여 모든 메뉴를 닫음
		if (i != no) { // i 가 열려는 메뉴가 아닐경우
			menuClose(i); // 메뉴를 닫고
			$(".outer-menu").find('.m' + i).addClass('smaller'); // smaller 클래스를 부여함
		}
	}

	$(".menu_no" + no).slideToggle(200); // 해당 메뉴를 열고 닫을 수 있도록 slideToggle api 사용
	$(".outer-menu").find('.m').addClass('smaller'); //바깥 메뉴에서 m클래스를 찾아 smaller 클래스 부여
	$(".m" + no).removeClass('smaller'); //클릭된 버튼에 대한 smaller 클래스 제거

}

function logtoreg() { // 로그인 창에서 회원가입 버튼 클릭시 작동하는 함수
	$('#login').hide();
	$('#sign').show(); 
}
function login() {
	$('#login').show(); // 로그인 버튼이 눌릴 경우 실행되는 함수

}

function signup() { // 회원가입 버튼이 눌릴 경우 실행되는 함수
	$('#sign').show();
}
function close_login() { // 로그인 창에서 x 버튼을 눌렀을때 실행되는 함수
	$('#login').hide();
}
function close_sign() { // 회원가입 창에서 x 버튼을 눌렀을때 실행되는 함수
	$('#sign').hide();
}
function smenuOpen() { // 재능기부 창에서 소메뉴중 열리는 메뉴를 클릭했을때 실행되는 함수
	$(".talent").slideToggle(200); // .talent 클래스에 해당하는 리스트를 열고 닫을 수 있도록 slideToggle api 사용
}
function menuClose(no) { // 메뉴를 닫을 때 사용하는 함수
	$(".menu_no" + no).slideUp(200); // 해당하는 메뉴를 slideUp 한다.
	$(".talent").slideUp(200); // talent 클래스에 해당하는 소메뉴는 하나밖에 없으므로 메뉴 번호에 상관없이 slideUp
}

function reg() { // 회원가입 함수
	var id, pw, repw; // 각각 아이디, 비밀번호, 비밀번호 확인을 임시로 받을 변수 선언

	id = document.getElementById('rid').value; 
	pw = document.getElementById('rpw').value;
	repw = document.getElementById('re-pw').value; // 각각의 필드에 해당하는 내용을 getElementById 메소드를 이용 변수에 저장

	if (id == "" || pw == "" || repw == "") { // 유효성 검사
		alert('아이디나 비밀번호 또는 비밀번호 확인 모두를 입력해 주세요'); // 빈칸이 있을경우 비밀번호나 패스워드를 입력해달라는 내용 alert
		return;// 빈칸이 있을경우 함수 종료
	}
	for (var i = 1; i<=Number(localStorage.totaluser); i++) { // 전체 user 수만큼 반복문을 돌려, 이미 사용된 아이디인지 여부 검사
		if (id == localStorage.getItem('user' + i + '-ID')) { // 반복문의 i를 활용 해당하는 키값에 해당하는 값이 입력된 값과 같은지 검사
			alert('이미 사용된 아이디 입니다');// 하나라도 같으면 이미 사용된 아이디 입니다 출력하고 함수 종료
			return;
		}
	}
	if (pw != repw) {//비밀번호와 비밀번호 확인 필드에 입력된 내용이 다를경우 경고 출력하고 함수 종료
		alert('비밀번호가 비밀번호 확인에 입력된 내용과 다릅니다. 다시 입력해주세요');
		return;
	}
	localStorage.totaluser = Number(localStorage.totaluser) + 1; // totaluser 수를 1 증가

	localStorage.setItem('user' + localStorage.totaluser + '-ID', id); // 증가된 totaluser에 따른 키값 생성 후 값 지정
	localStorage.setItem('user' + localStorage.totaluser + '-PW', pw);
	localStorage.setItem('user' + localStorage.totaluser + '-ADMIN', '0'); // 회원가입으로는 관리자가 아닌 계정 부여

	alert('가입이 완료되었습니다'); // 가입이 완료 되었다는 문구 출력
	close_sign(); // 회원가입 창 종료

	/*
	계정 관련 localStorage 키값
	user + N + - + (ID, PW, ADMIN) : 각각 ID, PW, ADMIN여부 에 해당하는 키값
	totaluser 전체 유저수 및 위의 변수의 N에 해당하는 번호가 될 키값
	*/

}

function chk_id(id) {
	for (var i = 1; i<=Number(localStorage.totaluser); i++) { // 전체 totaluser 수만큼 반복문 실행하여
		if (id == localStorage.getItem('user' + i + '-ID')) { //해당하는 id 가 있는지 확인
			return i; // 있으면 해당 user번호값 return
		}
	}

	return -1; // 없을경우 -1 return
}
function log_in() { // 로그인 함수
	var id, pw; // 각각 입력된 아이디와 비밀번호를 임시로 받을 변수

	id = document.getElementById('lid').value; // getElementById 메소드 사용하여 각 변수에 필드에 입력된 값 저장
	pw = document.getElementById('lpw').value;

	if (id == "" || pw == "") { // 유효성 검사
		alert('ID또는 비밀번호가 입력되지 않았습니다.'); // 필드에 데이터가 없는 경우 경고 출력하고 함수 종료
		return;
	}
	key = chk_id(id); // chk_id 함수 호출

	if (pw != localStorage.getItem('user' + key + '-PW') || key == -1) { // 받아온 user번호에 해당하는 비밀번호와 입력된 값이 같은지 확인, 
		//또는 리턴된 번호가 -1일경우 id가 없는것이므로 잘못된 id
		alert('잘못된 아이디나 비밀번호 입니다'); // 경고 호출
		return; // 함수 종료
	}

	//로그인에 성공한 경우
	sessionStorage.setItem('loggedIn', 1); // sessionStorage에 loggedIn을 키값으로 1 저장
	sessionStorage.setItem('is_Admin', localStorage.getItem('user'+key+'-ADMIN')); // is_Admin을 키값으로 ADMIN여부를 로컬스토리지에서 받아와서 저장
	sessionStorage.setItem('ID', localStorage.getItem('user'+key+'-ID')); // ID를 키값으로 ADMIN여부를 로컬스토리지에서 받아와서 저장
	change_loginfo(key); // change_loginfo(num) 함수 호출

	close_login(); // 로그인창 종료

}
function change_loginfo(num) { // 상단 로그인|회원가입 부분 ID|로그아웃 버튼으로 변경
	$('#upper-link').html('<br/>' +
		'<a class="sitemap-link">' + sessionStorage.ID + '</a>' +
		'<a class="header-bar">|</a>' +
		'<a class="-link" href="javascript:;" onclick="logout()">로그아웃</a>' // 로그아웃버튼은 ONCLICK시 logout()함수 호출
	)

	//jQuery 사용하여 html 변경
	//sessionStorage 에 저장된 ID값 불러와서 이용

}

function logout() {//로그아웃 함수
	sessionStorage.loggedIn = 0; //sessionStorage의 loggedIn 값 0으로 변경
	sessionStorage.is_Admin = 0; // is_Admin 값 0으로 변경
	sessionStorage.ID = ""; // ID값 빈 값으로 초기화
	$('#upper-link').html('<br/><a class="sitemap-link" href="javascript:;" onclick="login()">로그인</a><a class="header-bar">|</a><a class="-link" href="javascript:;" onclick="signup()">회원가입</a>');
	//jQuery 사용하여 원래 코드로 복귀
}
