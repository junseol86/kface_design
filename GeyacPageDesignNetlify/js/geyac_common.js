$(document).ready(function() {
		
		//==기본처리
		//빈공간 클릭시 레이어팝업을 모두 닫는다.
		$('html').click(function() {
			if($("#ui-datepicker-div").css("display")==undefined || $("#ui-datepicker-div").css("display") == "none"){	//jquery 달력버튼 때문에.
				$(".popup").hide();
				$("#overlay").hide();
			}
		});
		$('.stopprop').on("click", function(e){
			e.stopPropagation();
		});
		$('.onlynum').onlyNumber();
		//기본처리 끝
		
		
		//quik 위치
		$(window).scroll(function (event) {
		    var scroll = $(window).scrollTop();
		    if(scroll>50){
		    	$('#quickbar').css("top", scroll-255);
		    }else{
		    	$('#quickbar').css("top", scroll-125); 	
		    }
		});
		//quik 위치 끝
		
		
		$("#agent_search_box").on("keypress", function(e){
			if(e.which==13){
				f_search_agent();
			}
		});
		
		
		//===== 약정사항 보이기, 감추기 
		$('#toggle_hidden_item').on('click', function(){
			if($(this).is(':checked')){
				$('.hidden_item').show();
				$('#hidden_item_desc').hide();
			}else{
				$('.hidden_item').hide();
				$('#hidden_item_desc').show();
			}
		});
		//default로 체크된걸로 한다.
		$('#toggle_hidden_item').prop("checked", true);
		$('.hidden_item').show();
		$('#hidden_item_desc').hide();
		//=====
		
			
		
		
		
		
		//====달력처리
		$(".calpopup").datepicker({changeYear:true});
		$(".calpopup").datepicker("option", "dateFormat", "yy-mm-dd");
		$(".calpopup").datepicker("option", "yearRange", "-5:+10");
		//=====
		
		
		
		//====특약사항 
		$('#gy_special_agree2').on( 'keyup', function (e){
	          $(this).css('height', 'auto' );
	          $(this).height( this.scrollHeight );
	    });
	    $('#gy_special_agree2').keyup();
	    //====특약사항 끝
		
		
		//매매대금 입력시 자동반영
		/* $('#gy_price_meme__disp').on("keyup", function(){
			$('#gy_price_meme').val($(this).val());
		}); */
		$('.changeprice').on('keyup', function(){
			var _t = $(this).attr('id').replace('__disp', '');	//타겟선택
			var vv = $(this).val().replace(/[^0-9\-]/g,'');
			
			var _unit = $('#gy_price_unit').val();	//만원, 천원, 원
			if(_unit=="만원"){ 
				vv = parseInt(vv) * 10000; 
			}else if(_unit=="천원"){ 
				vv = parseInt(vv) * 1000;
			}
			$('#'+_t).val(vv).onlyNumber();
		});
		//숫자,한자 변환 
		$('#gy_price_fmt , #gy_price_unit').on('change', f_changePrice);
		$('.changeprice').on('focusout focus', f_changePrice);
		
		
		
		
		
		
		//사업자번호, 주민번호처리.
		$('#gy_person_medo1_idno_gubun, #gy_person_medo2_idno_gubun, #gy_person_mesu1_idno_gubun, #gy_person_mesu2_idno_gubun').on("change", function(){
			var i_prefix = $(this).attr("id");
			var o = $(this);
			i_prefix = i_prefix.replace("gy_person_", "").replace("_gubun", "");	//medo1_idno
			
			if($(o).val()=='사업자등록번호'){
				$('#'+i_prefix+"_area-1").hide();
				$('#'+i_prefix+"_area-1").children('input').val('');
				$('#'+i_prefix+"_area-2").show();
			}else{
				$('#'+i_prefix+"_area-2").hide();
				$('#'+i_prefix+"_area-2").children('input').val('');
				$('#'+i_prefix+"_area-1").show();
			}
		})
		

		//모달팝업창 배경 클릭 시 보달 팝업창 닫기.
		$('.modal_bd').on("click", function(){
			f_modal_close('all');
		});
		
		
		
		/*//작성중, 작성완료 처리.
		var pre_chk_comp = $('input[name=modal_chk_comp]').val();
		$('input[name=modal_chk_comp]').on("click", function(){
			$('#comp_yn').val($(this).val());
			if(pre_chk_comp=="Y" && $(this).val()=="N"){
				alert("기존에 작성완료로 저장된 계약서입니다. 작성중으로 변경 후 저장하시면, 고객정보상의 매도,매수인, 계약갱신일자는 갱신되지 않습니다. 추후 작성완료로 변경 후 저장시 갱신됩니다.");
			}
			
		});*/
		
		
		
		//폴더처리 
		$('#modal_favorite_folder').on("change", function(){
			if($(this).val()=="newfolder"){
				$('#modal_newfolder_name').show();
			}else{
				$('#modal_newfolder_name').val("");
				$('#modal_newfolder_name').hide();	
			}
		});
		
		
		//확인설명서 클릭시 
		$('#confirm_btn').on('click', function(){
			if($('#gy_idx').val()==""){
				alert("작성하신 계약서를 먼저 저장하시기 바랍니다.");
			}else{
				if($('#confirm_idx').val()=="" || $('#confirm_idx').val()=="-1" ){
					f_modal('modal-confirm');
				}else{
					if(confirm("변경된 계약서 내용은 저장되지 않습니다. 확인설명서화면으로 이동하시겠습니까?")){
						f_goConfirm();
					}
				}
			}
		});
		
		
	});




	//중개업소 찾기
	function f_getAgentInfo(i_agent){
		
	}

	//신규계약서 작성 페이지로 이동
	function f_goRegist(){
		var frm = document.forms.frmMenu;
		frm.gy_cate01.value = "";
		frm.gy_idx.value = "";
		frm.selAction.value = "V";
		frm.action = "/memberGeyac.do";
		frm.submit();
	}

	//확인설명서로 이동
	function f_goConfirm(i_gbn){
		var frm = document.forms.frmMenu;
		frm.gy_idx.value = $('#gy_idx').val();
		frm.gy_cate01.value = $('#gy_cate01').val();
		frm.confirm_idx.value = $('#confirm_idx').val();
		if(i_gbn){
			frm.confirm_gubun.value = i_gbn;
		}
		frm.action = "/memberGeyacConfirm.do";
		frm.submit();
	}


	//계약서 삭제
	function f_deleteGeyac(){
		if(confirm("계약서를 삭제하시겠습니까?")){
			var frm = document.forms.frmRegist;
			frm.selAction.value = "delete";
			frm.method="post";
			frm.target="";
			frm.action = "/memberGeyac.do";
			frm.submit(); 
		}
	}
	
	//계약서 복사
	function f_copyGeyac(){
		if(confirm("계약서를 복사하시겠습니까?")){
			var frm = document.forms.frmRegist;
			frm.selAction.value = "copygeyac";
			frm.method="post";
			frm.target="";
			frm.action = "/memberGeyac.do";
			frm.submit(); 
		}
	}
	





	//========특약사항
	var _rowlimit = 14; //제한되는 라인 수.
	function limitLines(o, e, cnt) {
		if(cnt){
			_rowlimit = cnt;
		}
		var s = $(o).val();
		var arr_s = s.split(/\r*\n/);
		var rowcnt = arr_s.length;
		
		if (rowcnt > _rowlimit) {
			$('#gy_special_agree2').focus();
	
			var s_01 = "";
			var s_02 = "";
			for (var i = 0; i < arr_s.length; i++) {
				if (i >= _rowlimit) {
					if (i != _rowlimit)
						s_02 += '\r\n';
					s_02 += arr_s[i];
				} else {
					if (i != 0)
						s_01 += '\r\n';
					s_01 += arr_s[i];
				}
			}
			$(o).val(s_01);
			$('#gy_special_agree2').val(s_02);
		}
	}

	
	//입력제한
	function limitLines_no(o,e,cnt){
		if(cnt){
			_rowlimit = cnt;
		}
		var s = $(o).val();
		var arr_s = s.split(/\r*\n/);
		var rowcnt = arr_s.length;
		
		if (rowcnt > _rowlimit) {
			alert(cnt+"줄 까지 입력가능합니다.");
			
			var s_01 = "";
			var s_02 = "";
			for (var i = 0; i < arr_s.length; i++) {
				if (i >= _rowlimit) {
					if (i != _rowlimit)
						s_02 += '\r\n';
					s_02 += arr_s[i];
				} else {
					if (i != 0)
						s_01 += '\r\n';
					s_01 += arr_s[i];
				}
			}
			$(o).val(s_01);
		}
	} 
	
	

	
	//======다음주소 호출
	function f_callDaumAddr(_target, _focus, _jibun){
		daum.postcode.load(function(){
	        new daum.Postcode({
	            oncomplete: function(data) {
	            	//console.warn(data);
	            	/*
            		postcode: "791-270"
            		jibunAddress: "경북 포항시 북구 양덕동 467-1"
            		roadAddress: "경북 포항시 북구 장량중앙로 30"
            		buildingName: "양덕삼구트리니엔2차아파트"
            		*/
	            	
	            	//디폴트가 도로명주소로 입력..
	            	if(_jibun){
	            		if(data.jibunAddress==""){
		            		$('#'+_target).val(data.autoJibunAddress+' '+data.buildingName);
		            	}else{
		            		$('#'+_target).val(data.jibunAddress+' '+data.buildingName);
		            	}	
	            	}else{
	            		$('#'+_target).val(data.roadAddress+' '+data.buildingName);
	            	}
            		$('#'+_focus).focus();
            		
	            },
	            theme: {
	            	bgColor: "#D9EFD6", //바탕 배경색
		  			searchBgColor: "#1C6148", //검색창 배경색
		  			pageBgColor: "#F1F2F1", //페이지 배경색
		  			queryTextColor: "#F8F8F8", //검색창 글자색
		  			outlineColor: "#4AAC8F" //테두리
	            }
	        }).open();
	    });			
	}
	
	
	
	
//	담당자 추가.
	function f_addParty(i_gbn){
		if(i_gbn=='medo'){
			if($('#table_medo2').is(':visible')){
				alert('별지작성은 준비중입니다.');
			}else{
				$('#table_medo2').show();
			}
		}else if(i_gbn=='mesu'){
			if($('#table_mesu2').is(':visible')){
				alert('별지작성은 준비중입니다.');
			}else{
				$('#table_mesu2').show();
			}
		}else if(i_gbn=='agent'){
			
			if(!$('#table_agent1').is(':visible')){
				$('#table_agent1').show();
				$('#agent_delete_button').show();
			}else if(!$('#table_agent2').is(':visible')){
				$('#table_agent2').show();
			}else{
				alert('별지작성은 준비중입니다.');
			}
		}else{
			return false;
		}
	}
	
	//담당자 삭제.
	function f_deleteParty(i_gbn){
		if(i_gbn=='medo'){
			$('#gy_person_medo2_gubun, #gy_person_medo2_addr, #gy_person_medo2_idno_gubun, #gy_person_medo2_idno, #gy_person_medo2_tel, #gy_person_medo2_name').val("");
			$('#medo2_idno_area-2').hide();
			$('#medo2_idno_area-1').children('input').val('');
			$('#medo2_idno_area-2').children('input').val('');
			$('#medo2_idno_area-1').show();
			$('#table_medo2').hide();
        
        
		}else if(i_gbn=='mesu'){
			$('#gy_person_mesu2_gubun, #gy_person_mesu2_addr, #gy_person_mesu2_idno_gubun, #gy_person_mesu2_idno, #gy_person_mesu2_tel, #gy_person_mesu2_name').val("");
			$('#mesu2_idno_area-2').hide();
			$('#mesu2_idno_area-1').children('input').val('');
			$('#mesu2_idno_area-2').children('input').val('');
			$('#mesu2_idno_area-1').show();
			$('#table_mesu2').hide();
			
         
			
		}else if(i_gbn=='agent'){
			if($('#table_agent2').is(':visible')){
				$('#gy_agent2_addr, #gy_agent2_regno, #gy_agent2_name, #gy_agent2_tel').val("");
				$('#table_agent2').hide();	
			}else if($('#table_agent1').is(':visible')){
				$('#gy_agent1_addr, #gy_agent1_regno, #gy_agent1_name, #gy_agent1_tel').val("");
				$('#table_agent1').hide();
				
				$('#agent_delete_button').hide();
			}
			
		}else{
			return false;
		}
	}
	
	
	
	
	
	//금액을 형식에 맞게 변경한다.
	//	mysql bigint , java long 으로 처리 
	//	원단위로 등록한다.
	function f_changePrice(){
		var _fmt = $('#gy_price_fmt').val();	//숫자, 한글, 한자, 한글+숫자
		var _unit = $('#gy_price_unit').val();	//만원, 천원, 원
		
		
		$('.changeprice').each(function(){
			var _ori = $('#'+$(this).attr("id").replace("__disp", "")).val();
			var _orival = _ori.replace(/[^0-9\-]/g,'');
			var _chgval = 0;
			
			
			var _unit_multiple = 1;
			if(_unit=="만원"){
				_chgval = parseInt(_orival/10000);
				_unit_multiple = 10000;
			}else if(_unit=="천원"){
				_chgval = parseInt(_orival/1000);
				_unit_multiple = 1000;
			}else{
				_chgval = parseInt(_orival);
				_unit_multiple = 1;
			}
			$(this).val( _chgval );
			
			
			
			if($(this).is(":focus")){	//무조건 숫자로 변환
				$(this).onlyNumber();
				if($(this).val()==0) $(this).val("");
				
			}else{
				if(_fmt=="한글"){
					$(this).val(num2hangul(_chgval*_unit_multiple));
				}else if(_fmt=="한자"){
					$(this).val(num2hanja(_chgval*_unit_multiple));
				}else if(_fmt=="한글+숫자"){
					$(this).val(_chgval);
					$(this).onlyNumber();
					$(this).val(num2hangul(_chgval*_unit_multiple) +" ("+$(this).val()+")");
				}else{
					$(this).onlyNumber();
				}
				
				
				//숫자표기일 경우 뒤에 단위를붙인다. 
				if(_fmt=="숫자"){
					if(_unit=="만원"){
						$(this).val($(this).val()+" 만");
					}else if(_unit=="천원"){
						$(this).val($(this).val()+" 천");
					}else{
					}
				}
				
			}
		});
		
	}

	//매매,전세,월세,연세 변경
	function f_change_kind(o){
		if($('#gy_idx').val()!=""){
			if(!confirm("계약서 양식이 변경됩니다. 계속하시겠습니까?")){
				return false;
			}
		}
		
		var frm = document.forms.frmMenu;
		
		frm.selAction.value = "change_kind";
		frm.gy_idx.value = $('#gy_idx').val();
		frm.gy_cate01.value = $('#gy_cate01').val();
		frm.gy_kind.value = $('#gy_kind').val();
		
		frm.action = "/memberGeyac.do";
		frm.submit();
	}
	
	
	//잔액계산
	function f_changeBalance(){
		
		if($('#gy_cate01').val()=="01"){
			var p = $('#gy_price_meme').val().replace(/[^0-9\-]/g,'');
			var p_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p_yung = $('#gy_price_yungja').val().replace(/[^0-9\-]/g,'');
			var p_imde = $('#gy_price_imdebojeung').val().replace(/[^0-9\-]/g,'');
			var p_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			var p_jung2 = $('#gy_price_jungdo2').val().replace(/[^0-9\-]/g,'');
			
			if($('#gy_price_yungja_comment').val()=="매도인이 잔금지급일까지 말소한다." || $('#gy_price_yungja_comment').val()=="매수인이 인수하지 아니한다." ){
				p_yung = 0;
			}
			if($('#gy_price_imdebojeung_comment').val()=="매도인이 잔금지급일까지 말소한다." || $('#gy_price_imdebojeung_comment').val()=="매수인이 인수하지 아니한다." ){
				p_imde = 0;
			}
			var bal = (parseInt(p)||0) - (parseInt(p_cont)||0) - (parseInt(p_yung)||0) - (parseInt(p_imde)||0) - (parseInt(p_jung1)||0) - (parseInt(p_jung2)||0);
			
			$("#gy_price_balance").val(bal);
			$("#gy_price_balance__disp").val(bal);
			$("#gy_price_balance__disp").onlyNumber();
			
		}else if($('#gy_cate01').val()=="02"){
			var p = $('#gy_price_bunyang').val().replace(/[^0-9\-]/g,'');
			var p_paid = $('#gy_price_paid').val().replace(/[^0-9\-]/g,'');
			
			var bal = (parseInt(p)||0) - (parseInt(p_paid)||0);
			
			$("#gy_price_willpay").val(bal);
			$("#gy_price_willpay__disp").val(bal);
			$("#gy_price_willpay__disp").onlyNumber();
			
			
			
			
			
			var p2 = $('#gy_price_deal').val().replace(/[^0-9\-]/g,'');
			var p2_yung = $('#gy_price_yungja').val().replace(/[^0-9\-]/g,'');
			var p2_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p2_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			//var p2_jung2 = $('#gy_price_jungdo2').val().replace(/[^0-9\-]/g,'');
			var p2_jung2 = 0;
			
			if($('#gy_price_yungja_comment').val()=="매도인이 잔금지급일까지 말소한다." || $('#gy_price_yungja_comment').val()=="매수인이 인수하지 아니한다." ){
				p2_yung = 0;
			}
			var bal2 = (parseInt(p2)||0) - (parseInt(p2_cont)||0) - (parseInt(p2_yung)||0) - (parseInt(p2_jung1)||0) - (parseInt(p2_jung2)||0);
			
			$("#gy_price_balance").val(bal2);
			$("#gy_price_balance__disp").val(bal2);
			$("#gy_price_balance__disp").onlyNumber();
			
			
			
		}else if($('#gy_cate01').val()=="03"){
			var p = $('#gy_price_gwon').val().replace(/[^0-9\-]/g,'');
			var p_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			var p_jung2 = $('#gy_price_jungdo2').val().replace(/[^0-9\-]/g,'');
			
			var bal = (parseInt(p)||0) - (parseInt(p_cont)||0) - (parseInt(p_jung1)||0) - (parseInt(p_jung2)||0);
			
			$("#gy_price_balance").val(bal);
			$("#gy_price_balance__disp").val(bal);
			$("#gy_price_balance__disp").onlyNumber();
			
			
			
		}else if($('#gy_cate01').val()=="04"){
			var p = $('#gy_price_imdebojeung').val().replace(/[^0-9\-]/g,'');
			var p_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			
			var bal = (parseInt(p)||0) - (parseInt(p_cont)||0) - (parseInt(p_jung1)||0);
			
			$("#gy_price_balance").val(bal);
			$("#gy_price_balance__disp").val(bal);
			$("#gy_price_balance__disp").onlyNumber();
			
		}else if($('#gy_cate01').val()=="05"){
			var p = $('#gy_price_gwon').val().replace(/[^0-9\-]/g,'');
			var p_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			
			var bal = (parseInt(p)||0) - (parseInt(p_cont)||0) - (parseInt(p_jung1)||0);
			
			$("#gy_price_balance").val(bal);
			$("#gy_price_balance__disp").val(bal);
			$("#gy_price_balance__disp").onlyNumber();
			
			
		}else if($('#gy_cate01').val()=="06"){
			var p = $('#gy_price_bojeung').val().replace(/[^0-9\-]/g,'');
			var p_cont = $('#gy_price_contract').val().replace(/[^0-9\-]/g,'');
			var p_jung1 = $('#gy_price_jungdo1').val().replace(/[^0-9\-]/g,'');
			var p_cha = $('#gy_price_chaim').val().replace(/[^0-9\-]/g,''); 
				
			var bal = (parseInt(p)||0) - (parseInt(p_cont)||0) - (parseInt(p_jung1)||0);
			
			$("#gy_price_balance").val(bal);
			$("#gy_price_balance__disp").val(bal);
			$("#gy_price_balance__disp").onlyNumber();
			
			
			var bo_change = (parseInt(p)||0) + (parseInt(p_cha)||0)*100; 
			//환산보증금 계산. 
			$('#gy_price_bojeung_change').val(bo_change);
			$('#gy_price_bojeung_change__disp').val(bo_change);
			$('#gy_price_bojeung_change__disp').onlyNumber();
			
			
			
		}
		
		
			
		
	}
	
	

	
	
	
	//카테고리(아파트, 분양권, 권리양도양수)
	function f_change_cate(o){
		if($('#gy_idx').val()!=""){
			if(!confirm("계약서 양식이 다릅니다, 신규작성화면으로 이동합니다\n\n계속하시겠습니까?")){
				return false;
			}
		}
		
		var frm = document.forms.frmMenu;
		frm.selAction.value = "V";
		frm.gy_cate01.value = $('#gy_cate01').val();
		
		frm.action = "/memberGeyac.do";
		frm.submit();
	}
	
	

	
	//====숫자를 한글로 변환
	function num2hangul(num){
		num = num+"";
		num = num.replace(/[^0-9\-]/g,'');
		
		var i, j = 0, k = 0;
	    var han1 = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구");
	    var han2 = new Array("", "만", "억", "조", "경", "해", "시", "양", "구", "간");
	    var han3 = new Array("", "십", "백", "천");
	    var result = "", hangul = num + "", pm = "";
	    var str = new Array(), str2 = "";
	    var strTmp = new Array();

	    if (parseInt(num) == 0) return "0"; //입력된 숫자가 0일 경우 처리
	    if (hangul.substring(0, 1) == "-") { //음수 처리
	        pm = "마이너스 ";
	        hangul = hangul.substring(1, hangul.length);
	    }
	    if (hangul.length > han2.length * 4) return "too much number"; //범위를 넘는 숫자 처리 자리수 배열 han2에 자리수 단위만 추가하면 범위가 늘어남.

	    for (i = hangul.length; i > 0; i = i - 4) {
	        str[j] = hangul.substring(i - 4, i); //4자리씩 끊는다.
	        for (k = str[j].length; k > 0; k--) {
	            strTmp[k] = (str[j].substring(k - 1, k)) ? str[j].substring(k - 1, k) : "";
	            strTmp[k] = han1[parseInt(strTmp[k])];
	            if (strTmp[k]) strTmp[k] += han3[str[j].length - k];
	            str2 = strTmp[k] + str2;
	        }
	        str[j] = str2;
	        if (str[j]) result = str[j] + han2[j] + result;
	        j++; str2 = "";
	    }
	    return pm + result; //부호 + 숫자값
	}
	
	
	//===숫자를 한자로 변환
	function num2hanja(num) {
		num = num+"";
	    var i, j = 0, k = 0;
	    var han1 = new Array("", "壹", "貳", "參", "四", "五", "六", "七", "八", "九");
	    var han2 = new Array("", "萬", "億", "조", "경", "해", "시", "양", "구", "간");
	    var han3 = new Array("", "拾", "百", "阡");
	    var result = "", hangul = num + "", pm = "";
	    var str = new Array(), str2 = "";
	    var strTmp = new Array();

	    if (parseInt(num) == 0) return "0"; //입력된 숫자가 0일 경우 처리
	    if (hangul.substring(0, 1) == "-") { //음수 처리
	        pm = "마이너스 ";
	        hangul = hangul.substring(1, hangul.length);
	    }
	    if (hangul.length > han2.length * 4) return "too much number"; //범위를 넘는 숫자 처리 자리수 배열 han2에 자리수 단위만 추가하면 범위가 늘어남.

	    for (i = hangul.length; i > 0; i = i - 4) {
	        str[j] = hangul.substring(i - 4, i); //4자리씩 끊는다.
	        for (k = str[j].length; k > 0; k--) {
	            strTmp[k] = (str[j].substring(k - 1, k)) ? str[j].substring(k - 1, k) : "";
	            strTmp[k] = han1[parseInt(strTmp[k])];
	            if (strTmp[k]) strTmp[k] += han3[str[j].length - k];
	            str2 = strTmp[k] + str2;
	        }
	        str[j] = str2;
	        if (str[j]) result = str[j] + han2[j] + result;
	        j++; str2 = "";
	    }
	    return pm + result; //부호 + 숫자값
	}
	
	
	
	
	
	function do_validate(){
		//매도,매수 사업자번호 처리
		if($('#gy_person_medo1_idno_gubun').val()=='사업자등록번호'){
			$('#gy_person_medo1_idno').val( $('#medo1_idno_3').val()+'-'+$('#medo1_idno_4').val()+'-'+$('#medo1_idno_5').val() );
		}else{
			$('#gy_person_medo1_idno').val( $('#medo1_idno_1').val()+'-'+$('#medo1_idno_2').val() );
		}
		if($('#gy_person_medo2_idno_gubun').val()=='사업자등록번호'){
			$('#gy_person_medo2_idno').val( $('#medo2_idno_3').val()+'-'+$('#medo2_idno_4').val()+'-'+$('#medo2_idno_5').val() );
		}else{
			$('#gy_person_medo2_idno').val( $('#medo2_idno_1').val()+'-'+$('#medo2_idno_2').val() );
		}
		if($('#gy_person_mesu1_idno_gubun').val()=='사업자등록번호'){
			$('#gy_person_mesu1_idno').val( $('#mesu1_idno_3').val()+'-'+$('#mesu1_idno_4').val()+'-'+$('#mesu1_idno_5').val() );
		}else{
			$('#gy_person_mesu1_idno').val( $('#mesu1_idno_1').val()+'-'+$('#mesu1_idno_2').val() );
		}
		if($('#gy_person_mesu2_idno_gubun').val()=='사업자등록번호'){
			$('#gy_person_mesu2_idno').val( $('#mesu2_idno_3').val()+'-'+$('#mesu2_idno_4').val()+'-'+$('#mesu2_idno_5').val() );
		}else{
			$('#gy_person_mesu2_idno').val( $('#mesu2_idno_1').val()+'-'+$('#mesu2_idno_2').val() );
		}
		
		
		if($('#table_medo2').is(":visible") && $('#gy_person_medo2_name').val()==""){
			alert("매도인 추가 시 추가된 매도인(대리인, 공동명의인)성명은 필수 입력사항입니다.");
			$('#gy_person_medo2_name').focus();
			f_modal_close('modal-save');
			return false;
		}
		if($('#table_mesu2').is(":visible") && $('#gy_person_mesu2_name').val()==""){
			alert("매수인 추가 시 추가된 매수인(대리인, 공동명의인)성명은 필수 입력사항입니다.");
			$('#gy_person_mesu2_name').focus();
			f_modal_close('modal-save');
			return false;
		}
		
		
		//메모처리
		$('#gy_memo').val($('#quick_gy_memo').val());
		
		
		return true;
	}
	
	
	var _modal_target = "";
	//모달창 열고 닫기
	function f_modal(i_id, _target){
		
		//필수값 체크
		if(i_id=="modal-save"){
			if($('#gy_title').val()==''){
				alert('제목을 입력해주세요');
				return false;
			}
			
			//소재지 체크
			if($('#gy_loc').val()==""){
				alert("소재지를 입력해주시기 바랍니다.");
				$('#gy_loc').focus();
				return false;
			}
			
			
			/*
			if(($('#gy_cate01').val()=="01" || $('#gy_cate01').val()=="02") && $('#gy_loc_dong').val()==""){
				alert("소재지-동정보를 입력해주시기 바랍니다.");
				$('#gy_loc_dong').focus();
				return false;
			}
			if(($('#gy_cate01').val()=="01" || $('#gy_cate01').val()=="02") && $('#gy_loc_ho').val()==""){
				alert("소재지-호수정보를 입력해주시기 바랍니다.");
				$('#gy_loc_ho').focus();
				return false;
			}
			
			
			//매매대금 체크
			if(($('#gy_cate01').val()=="01" || $('#gy_cate01').val()=="02") && $('#gy_price_meme').val()==""){
				alert("매매대금(보증금)을 입력해주시기 바랍니다.");
				$('#gy_price_meme__disp').focus();
				return false;
			}
			if(($('#gy_cate01').val()=="03") && $('#gy_price_gwon').val()==""){
				alert("총권리금을 입력해주시기 바랍니다.");
				$('#gy_price_gwon__disp').focus();
				return false;
			}
			if(($('#gy_cate01').val()=="04") && $('#gy_price_imdebojeung').val()==""){
				alert("임대보증금을 입력해주시기 바랍니다.");
				$('#gy_price_imdebojeung__disp').focus();
				return false;
			}
			if(($('#gy_cate01').val()=="05") && $('#gy_price_gwon').val()==""){
				alert("총권리금을 입력해주시기 바랍니다.");
				$('#gy_price_gwon').focus();
				return false;
			}
			if(($('#gy_cate01').val()=="06") && $('#gy_price_bojeung').val()==""){
				alert("보증금을 입력해주시기 바랍니다.");
				$('#gy_price_bojeung__disp').focus();
				return false;
			}
			if($('#gy_price_balance_date').val()==""){
				alert("잔금날짜를 입력해주시기 바랍니다.");
				$('#gy_price_balance_date').focus();
				return false;
			}
			
			if($('#gy_date').val()==""){
				alert("계약일자를 입력해주시기 바랍니다.");
				$('#gy_date').focus();
				return false;
			}
			
			
			
			if($('#gy_person_medo1_name').val()==""){
				alert("매도인(임대인)성명을 입력해주시기 바랍니다.");
				$('#gy_person_medo1_name').focus();
				return false;
			}
			if($('#gy_person_mesu1_name').val()==""){
				alert("매수인(임차인)성명을 입력해주시기 바랍니다.");
				$('#gy_person_mesu1_name').focus();
				return false;
			}
			
			*/
			
			
		}
		
		$('.modal_bd').show();
		$('#'+i_id).show();
		
		
		if(_target){
			_modal_target = _target;
		}else{
			_modal_target = "";
		}
	}
	function f_modal_close(i_id){
		$('.modal_bd').hide();
		if(i_id=="modal-confirm" || i_id=="all"){
			//입력된 사항 init 처리 
			$('#modal-confirm').hide();
		}
		if(i_id=="modal-save" || i_id=="all"){
			//입력된 사항 init 처리 
			$('#modal-save').hide();
		}
		if(i_id=="modal-search-agent" || i_id=="all"){
			//입력된 사항 init 처리
			$('#modal-search-agent').hide();
		}
	}
	
	

	//개업공인중개사무소를 찾는다.
	function f_search_agent(){
		if($('#agent_search_box').val()==""){
			alert("검색어를 입력해주세요!");
			return;
		}
		$.ajax({
			url: "/masterJson.do", 
			type: "post",
			data: {
				"selAction": "geyac_search_agent",
				"searchGubun" : $("#agent_search_gubun").val(), 
				"searchText" : $("#agent_search_box").val()
			},
			dataType: "json",
			error: function(){
				alert('중개사무소를 불러올 수 없습니다.');
			},
			success: function(data){
				$('#agent_list').html("");
				var i=1;
				if(data && data.length>0){
					$.each(data, function(key, ele){
						$('#agent_list').append('<li><span class="title">'+(i++)+'. '+data[key].AGENT_NICK +' 공인중개사 사무소</span> (대표자:'+data[key].AGENT_PERSON_NM+')     '+data[key].AGENT_PERSON_PHONE+' <a href="javascript: f_selAgent(\''+data[key].AGENT_ADDR+'\', \''+data[key].AGENT_BPNUM+'\', \''+data[key].AGENT_NICK+'\', \''+data[key].AGENT_TEL+'\', \''+data[key].AGENT_PERSON_NM+'\')" class="btn">선택</a></li>');
					});
				}else{
					$('#agent_list').html("");
					$('#agent_list').append('<li style="text-align:center;">중개업소를 검색해주세요.</li>');
				}
			}
		});
	}

	//해당 부동산의 정보를 가져온다.
	function f_selAgent(_addr, _bpnum, _nick, _tel, _ceo){
		
		if(_modal_target=="agent1"){
			$('#gy_agent1_addr').val(_addr);
			$('#gy_agent1_regno').val(_bpnum);
			$('#gy_agent1_name').val(_nick + " 공인중개사사무소");
			$('#gy_agent1_tel').val(_tel);
			$('#gy_agent1_ceo').val(_ceo);
			
		}else if(_modal_target=="agent2"){
			$('#gy_agent2_addr').val(_addr);
			$('#gy_agent2_regno').val(_bpnum);
			$('#gy_agent2_name').val(_nick + " 공인중개사사무소");
			$('#gy_agent2_tel').val(_tel);
			$('#gy_agent2_ceo').val(_ceo);
		}

		
		f_modal_close('all');
	}

	
	
	
	
	
	
	
	
	
	