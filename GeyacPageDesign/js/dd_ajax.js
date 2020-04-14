
//구.법정동.아파트 선택시..
function f_sel(i_action, sch, gbn, option){
	
	
	if(typeof $("#selSomeGubun").val() != 'undefined' //사용자 등록시 (masterUserRegist.jsp) selSomeGubun값 참고.
			&& i_action=="select_dong_apt" 
			&& $("#selSomeGubun").val()!="APT" ){
			return false;
	}
	
	
	//아파트 등록화면에서 동/층 층 선택시.. 하단에 추가...
	if(i_action=="select_aptdong_floor2"){
		f_show_floor();
	}
	
	
	//매물등록화면에서 입주일자 초기화
	if(!(i_action=="select_aptdong_floor" || i_action=="select_aptdong_floor2") ){
		$("#area_asset_in_date2").html("(아파트/평형 선택시 자동으로 입력됩니다)");
	}
	
	
	
	$.ajax({
		url: "/masterJson.do", 
		type: "post",
		data: {
			"selAction":i_action,
			"selGuIdx" : $("#selGuIdx").val(),
			"selDongIdx" : $("#selDongIdx").val(),
			"selAptIdx" : $("#selAptIdx").val(),
			"selRiIdx" : $("#selRiIdx").val(), 
			"selAssetDong" : $("#selAssetDong").val(),
			"selPyungIdx" : $("#selPyungIdx").val(),
			"selBdIdx" : $("#selBdIdx").val()
		},
		/*async: false,*/
		dataType: "json",
		error: ajaxFail,
		success: function(data){
			
			
			var schHTML = "";
			if(i_action == "select_gu"){
				$("#selDongIdx option").remove();
				$("#selDongIdx").append('<option value="">읍면동 선택</option>');
				
				$.each(data, function(key, ele){
				    if (option === 'filter'){
				        if (data[key].DONG_NAME === '동빈동' || data[key].DONG_NAME === '유강리'){
				            return true;
                        }
					}
					$("#selDongIdx").append('<option value="'+data[key].DONG_IDX+'">'+data[key].DONG_NAME+'</option>');
				});

				if($("#area_sch").length){
					$("#area_sch").html(schHTML);
				}
				
				
				$("#selAptIdx option").remove();
				$("#selAptIdx").append('<option value="">단지 선택</option>');
				$("#selRiIdx option").remove();
				$("#selRiIdx").append('<option value="">리 선택</option>');
				
				//매물등록페이지(gbn==1) 인 경우 f_show()호출
				if(!sch && gbn=='apt_r'){	
					$("#selAssetDong option").remove();
					$("#selAssetDong").append('<option value="">= 선택 =</option>');
					$("#selAssetFloor option").remove();
					$("#selAssetFloor").append('<option value="">= 선택 =</option>');
					f_show_floor();
					
				}else if(!sch && gbn){
					if (typeof f_show === 'function')
                        f_show(); //하단에 구.법정동.리를 보여준다.
				}
				
			}else if(i_action == "select_dong_apt"){
				$("#selAptIdx option").remove();
				$("#selAptIdx").append('<option value="">단지 선택</option>');
				
				$.each(data, function(key, ele){
					$("#selAptIdx").append('<option value="'+data[key].APT_IDX+'">'+data[key].APT_NAME+'</option>');
					//=== 검색엔진영역이 있다면 하위를 적어준다. 
					/*
					if($("#area_sch").length){
						schHTML += '<span style="display:inline-block; width:180px; border:1px solid #eeeeee">';
						schHTML += data[key].APT_NAME+'</span>';
					}
					*/
				});
				if($("#area_sch").length){
					$("#area_sch").html(schHTML);
				}
				
				
				//매물등록페이지(gbn==1) 인 경우 f_show()호출
				if(!sch && gbn=='apt_r'){	
					$("#selAssetDong option").remove();
					$("#selAssetDong").append('<option value="">= 선택 =</option>');
					$("#selAssetFloor option").remove();
					$("#selAssetFloor").append('<option value="">= 선택 =</option>');
					f_show_floor();
					
				}else if(!sch && gbn){
					f_show(); //하단에 구.법정동.리를 보여준다.
				}
				
				
			
			//동선택시 부동산 목록
			}else if(i_action == "select_dong_agent"){
				$("#selAgentIdx option").remove();
				$("#selAgentIdx").append('<option value="">= 선택 =</option>');
				
				$.each(data, function(key, ele){
					$("#selAgentIdx").append('<option value="'+data[key].AGENT_IDX+'">'+data[key].AGENT_NM+'</option>');
				});
				
				
			}else if(i_action == "select_dong_ri"){
				//마이페이지 등록화면이면서 리가 없는 법정동 선택시 area_selRiIdx 를 안보이게 처리 및 아래 지번표시 란에도 없에준다.
				if(data.length>0){
					$("#area_selRiIdx").show();
				}else{
					$("#area_selRiIdx").hide();
					
					$("#show_land_ri").html("");
					$("#show_house_ri").html("");
					$("#show_factory_ri").html("");
				}
				
				$("#selRiIdx option").remove();
				$("#selRiIdx").append('<option value="">리 선택</option>');
				
				$.each(data, function(key, ele){
					$("#selRiIdx").append('<option value="'+data[key].RI_IDX+'">'+data[key].RI_NAME+'</option>');
				});
				
				//매물등록페이지(gbn==1) 인 경우 f_show()호출
				if(!sch && gbn=='apt_r'){	
					$("#selAssetDong option").remove();
					$("#selAssetDong").append('<option value="">= 선택 =</option>');
					$("#selAssetFloor option").remove();
					$("#selAssetFloor").append('<option value="">= 선택 =</option>');
					f_show_floor();
					
				}else if(!sch && gbn){
				    if (typeof f_show === 'function')
					    f_show(); //하단에 구.법정동.리를 보여준다.
				}
				
				
				
			}else if(i_action == "select_apt_pyung"){
				$("#selPyungIdx option").remove();
				$("#selPyungIdx").append('<option value="">평형 선택</option>');
				
				
				$.each(data, function(key, ele){
					$("#selPyungIdx").append('<option value="'+data[key].PYUNG_IDX+'">'+data[key].PYUNG_NAME+'</option>');
				});
				
				if(sch){
					f_sel('select_apt_aptdong', sch);//평호출 후 몇동몇동을 호출한다.
				}else{
					f_sel('select_apt_aptdong');//평호출 후 몇동몇동을 호출한다.
				}
				
				
				
				
				//매물등록페이지(gbn==1) 인 경우 f_show()호출
				if(!sch && gbn=='apt_r'){	
					$("#selAssetDong option").remove();
					$("#selAssetDong").append('<option value="">= 선택 =</option>');
					$("#selAssetFloor option").remove();
					$("#selAssetFloor").append('<option value="">= 선택 =</option>');
					f_show_floor();
					
				}else if(!sch && gbn){
					f_show(); //하단에 구.법정동.리를 보여준다.
				}
				
				
				
			}else if(i_action == "select_apt_pyungtype"){
				
				
				//타입이 있을경우에만 타입선택박스 표시한다.
				if(data!=''){
					$("#selTypeIdx option").remove();
					$("#selTypeIdx").append('<option value="" selected >타입 선택</option>'); 
					$.each(data, function(key, ele){
						$("#selTypeIdx").append('<option value="'+data[key].PYUNG_TYPE+'">'+data[key].PYUNG_TYPE_dispname+'</option>');
					});	
					$("#pyung_type_box").show();
				}else{
					$("#pyung_type_box").hide();
				}
				
					
				
			}else if(i_action == "select_apt_aptdong"){
				$("#selAssetDong option").remove();
				$("#selAssetDong").append('<option value="">= 선택 =</option>');
				
				
				$.each(data, function(key, ele){
					$("#selAssetDong").append('<option value="'+data[key].APTDONG_NAME+'">'+data[key].APTDONG_NAME+'</option>');
				});
				
				
			//몇층이 있는지 호출한다. 
			}else if(i_action == "select_aptdong_floor"){
				$("#selAssetFloor option").remove();
				$("#selAssetFloor").append('<option value="">= 선택 =</option>');
				$.each(data, function(key, ele){
					$("#selAssetFloor").append('<option value="'+data[key].FLOOR_NAME+'">'+data[key].FLOOR_NAME+'</option>');
				});
				
				//$("#show_asset_dong").html($("#selAssetDong").val());
				
				
				//매물등록페이지(gbn==1) 인 경우 f_show()호출
				if(!sch && gbn=='apt_r'){	
					f_show_floor();
				}
				
			//원룸빌딩 선택시 해당 방목록을 가져온다.
			}else if(i_action == "select_oneroom_building"){
				$("#selRoomIdx option").remove();
				$("#selRoomIdx").append('<option value="">= 선택 =</option>');
				$.each(data, function(key, ele){
					$("#selRoomIdx").append('<option value="'+data[key].ROOM_IDX+'">'+data[key].ROOM_NO+'</option>');
				});
			}

			//검색엔진화면이면 적용후 검색결과를 불러온다.
			if(sch && i_action!="select_apt_pyung"){
				f_search();
			}
		}
	});
	
	
}

function ajaxFail(a,b,c){
	alert(a + " : "+b+ " : "+ c);
	alert("Ajax Fail!!!");
}

/* 탑메뉴 하이라이트 (각 탑메유 첫페이지에서 body onload) 
function topmenu_on(id)
{ 	$(id).css('background-color',"#05552b"); 
	$(topmenu).css('border-radius',"4px 4px 0px 0px");
}


function mpmenu_on(id)
{ 	
	$(id).css('background-color',"#1e7447"); $(id).css('color',"white"); 
	$(id).css('border-left',"#1e7447"); $(id).css('border-right',"#1e7447"); 
}
*/

/* 검색엔진 너비 조정 */

var owner_confirm = 0;
var my_memo = 0;
var interest = 0;

function btSwap(i)
{
		
	if (i == 0)
		{
		if (owner_confirm == 0)
			{
			owner_confirm = 1;
			$("#onr_cfrm").attr("src","../../img/btn/onr_cfrm_on.jpg");
			}
		else
			{
			owner_confirm = 0;
			$("#onr_cfrm").attr("src","../../img/btn/onr_cfrm.jpg");
			}
		}
	else if (i == 1)
		{
		if (my_memo == 0)
			{
			my_memo = 1;
			$("#my_memo").attr("src","../../img/btn/my_memo_on.jpg");
			}
		else
			{
			my_memo = 0;
			$("#my_memo").attr("src","../../img/btn/my_memo.jpg");
			}
		}
	else
		{
		if (interest == 0)
			{
			interest = 1;
			$("#interest").attr("src","../../img/btn/interest_on.jpg");
			}
		else
			{
			interest = 0;
			$("#interest").attr("src","../../img/btn/interest.jpg");			
			}
		}
}

function brdBtSwap(i)
{
	if (i==0) 	{ $(".brdbt_view").attr("src","../../img/btn/brdBt_view_on.jpg"); }
	else if (i==1) { $(".brdbt_message").attr("src","../../img/btn/brdBt_message_on.jpg");}
	else if (i==2) { $(".brdbt_done").attr("src","../../img/btn/brdBt_done_on.jpg");}
	else if (i==3) { $(".brdbt_report").attr("src","../../img/btn/brdBt_report_on.jpg");}
	else if (i==4) { $(".brdbt_interest").attr("src","../../img/btn/brdBt_interest_on.jpg");}
	else if (i==5) { $(".brdbt_interest_ccl").attr("src","../../img/btn/brdBt_interest_cancel_on.jpg");}
	else if (i==6) { $(".brdbt_done_ccl").attr("src","../../img/btn/brdBt_done_cancel_on.jpg");}
}

function brdBtBack(i)
{
	if (i==0) 	{ $(".brdbt_view").attr("src","../../img/btn/brdBt_view.jpg"); }
	else if (i==1) { $(".brdbt_message").attr("src","../../img/btn/brdBt_message.jpg");}
	else if (i==2) { $(".brdbt_done").attr("src","../../img/btn/brdBt_done.jpg");}
	else if (i==3) { $(".brdbt_report").attr("src","../../img/btn/brdBt_report.jpg");}
	else if (i==4) { $(".brdbt_interest").attr("src","../../img/btn/brdBt_interest.jpg");}
	else if (i==5) { $(".brdbt_interest_ccl").attr("src","../../img/btn/brdBt_interest_cancel.jpg");}
	else if (i==6) { $(".brdbt_done_ccl").attr("src","../../img/btn/brdBt_done_cancel.jpg");}
}

function se_length(i)
{
	if (i==1)
		{
			$("#ssb1").attr("width","158px");
			$("#ssb2").attr("width","158px");
			$("#ssb3").attr("width","158px");
			$("#ssb4").attr("width","158px");
			$("#ssb5").attr("width","158px");
			$("#ssb6").attr("width","158px");
		}
}

