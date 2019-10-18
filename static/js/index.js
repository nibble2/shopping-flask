// 주문하기 API
function myOrder() {
    let store = 'nibble'
    let name = $('#order_name').val();
    let phone = $('#order_phone').val();
    let address = $('#sample3_address').val()+ " " + $('#sample3_detailAddress').val()+" "+ $('#sample3_extraAddress').val();
    let count = $('#order_count').val();
    let item = $('#order_count').val();

   $.ajax({
        type: "POST",
        url: "/order",
        data: {store_give: store, name_give: name, phone_give: phone, address_give: address, count_give: count, item_give: item },
        success: function(response) {
            if (response['result'] == 'success') {
                alert('주문 완료');
                window.location.reload();
            } else {
                alert('서버 에러');
            }
        }
    })
}

$(document).ready(function() {
    $('#order-box').html('');
    listing();
});

// 주문 가져오기 API
function listing() {
    $.ajax({
        type: "GET",
        url: "/order?store_give=nibble",
        data: {},
        success: function(response) {
            if (response['result'] == 'success') {
                let orders = response['orders'];
                for (let i = 0; i < orders.length; i++) {
                    make_order(orders[i]['item'], orders[i]['name'], orders[i]['phone'], orders[i]['count'], orders[i]['address'])
                }

            } else {
                console.log('실패');
            }
        }
    })
}

// 카드 만들기
function make_order(item, name, phone, count, address) {
    let temp_html =
        '<tr>\
            <td>' + item + '</td>\
            <td>' + name + '</td>\
            <td>' + phone + '</td>\
            <td>' + count + '</td>\
            <td>' + address + '</td>\
        </tr>';
    $('#order-box').append(temp_html);
}

// 다음 주소 api
// 우편번호 찾기 찾기 화면을 넣을 element
var element_wrap = document.getElementById('wrap');

function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
}

function sample3_execDaumPostcode() {
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample3_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample3_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample3_postcode').value = data.zonecode;
            document.getElementById("sample3_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample3_detailAddress").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.height = size.height+'px';
        },
        width : '100%',
        height : '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
}

// 이름 정규식
var nameJ = /^[가-힣]{2,6}$/;
// 휴대폰 번호 정규식
var phoneJ = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;

// 이름에 특수문자 들어가지 않도록 설정
$(document).ready(function() {
    $("#order_name").blur(function() {
		if (nameJ.test($(this).val())) {
				console.log(nameJ.test($(this).val()));
				$("#name_check").text('');
		} else {
			$('#name_check').text('이름을 확인해주세요!!');
			$('#name_check').css('color', 'red');
		}
	});
});

// 핸드폰 번호 유효성 검사
$(document).ready(function() {
    $('#order_phone').blur(function(){
        if(phoneJ.test($(this).val())){
            console.log(nameJ.test($(this).val()));
            $("#phone_check").text('');
        } else {
            $('#phone_check').text('휴대폰번호를 확인해주세요!!');
            $('#phone_check').css('color', 'red');
        }
    });
}) ;

// 핸드폰 번호 숫자 입력
$(document).ready(function() {
    $("#order_phone").keyup(function(event){
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[^0-9]/gi,''));
    });
}) ;

// 수량 유효성 검사
$(document).ready(function() {
    $('#order_counte').blur(function(){
        if(phoneJ.test($(this).val())){
            console.log(nameJ.test($(this).val()));
            $("#count_check").text('');
        } else {
            $('#count_check').text('휴대폰번호를 확인해주세요!!');
            $('#count_check').css('color', 'red');
        }
    });
}) ;

// 수량 숫자 입력
$(document).ready(function() {
    $("#order_count").keyup(function(event){
        var inputVal = $(this).val();
        $(this).val(inputVal.replace(/[^0-9]/gi,''));
    });
}) ;