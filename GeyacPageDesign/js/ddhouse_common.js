
	$(function(){
		//빈공간 클릭시 레이어팝업을 모두 닫는다.
		$('html').click(function() {
			if($("#ui-datepicker-div").css("display")==undefined || $("#ui-datepicker-div").css("display") == "none"){	//jquery 달력버튼 때문에.
				$(".popup").hide();
			}
		});
		
		
		$('.stopprop').on("click", function(e){
			e.stopPropagation();
		});
		
	});
	
	
	///레이어를 닫는다.
	function f_clearLayer(){
		if($("#ui-datepicker-div").css("display")==undefined || $("#ui-datepicker-div").css("display") == "none" ){	//jquery 달력버튼 때문에.
			$(".popup").hide();
		}
		$("#overlay").hide();
		$("#overlay2").hide();
	}
	
	

	
	
	
	function removeURLParameter(parameter, url) {
		if(!url) url = window.location.href;
		
	    //prefer to use l.search if you have a location/link object
	    var urlparts= url.split('?');   
	    if (urlparts.length>=2) {

	        var prefix= encodeURIComponent(parameter)+'=';
	        var pars= urlparts[1].split(/[&;]/g);

	        //reverse iteration as may be destructive
	        for (var i= pars.length; i-- > 0;) {    
	            //idiom for string.startsWith
	            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
	                pars.splice(i, 1);
	            }
	        }
	        

	        url= urlparts[0] + ((pars.length > 0)? '?'+pars.join('&') : '');
	        history.pushState(null, '', url);
	    } else {
	        //return url;
	    }
	}

	
	function getParameterByName(name, url){
		if(!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]"+name+"(=([^&#])|&|#|$)"),
			results = regex.exec(url);
		
		if (!results) return null;
		if (!results[2]) return '';
		
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	
	
	function size_insert_asset_popup(){
		if ($('#-popup-regist-wrap').is(':visible')) {
	        $('#-popup-regist-wrap').css('width', $(window).width() + 'px');
	        $('#-popup-regist-wrap').css('height', $(window).height() + 'px');

	        $('#outer_wrap, #-iframe-popup').css('height', $(window).height() - 40 + 'px');
	        $('#outer_wrap').css('margin-top', '20px');
	    }
	}



    function numberWithCommas(x) {
        if (x === undefined)
            return "";
        var parts=x.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
	
	
 function f_commaNum(num) {  
        var len, point, str;  
  
        num = num + "";  
        point = num.length % 3;
        len = num.length;  
  
        str = num.substring(0, point);  
        while (point < len) {  
            if (str != "") str += ",";  
            str += num.substring(point, point + 3);  
            point += 3;  
        }  
        return str;  
    } 
 
(function ($) {
	
	$.datepicker.regional['ko']= {
			  closeText:'닫기',
			  prevText:'이전달',
			  nextText:'다음달',
			  currentText:'오늘',
			  monthNames:['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUM)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
			  monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			  dayNames:['일','월','화','수','목','금','토'],
			  dayNamesShort:['일','월','화','수','목','금','토'],
			  dayNamesMin:['일','월','화','수','목','금','토'],
			  weekHeader:'Wk',
			  dateFormat:'yymmdd',
			  firstDay:0,
			  isRTL:false,
			  showMonthAfterYear:true,
			  yearSuffix:''
		 };
	$.datepicker.setDefaults($.datepicker.regional['ko']); 
	
	
    // 숫자 제외하고 모든 문자 삭제.
    $.fn.removeText = function(_v){
        //console.log("removeText: 숫자 제거 합니다.");
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = this.value.replace(/[^0-9\-]/g,'');
            });
        }
        else
        {
            return _v.replace(/[^0-9\-]/g,'');
        }
    };
     
    // php의 number_format과 같은 효과.
    $.fn.numberFormat = function(_v){
        this.proc = function(_v){
            var tmp = '',
                number = '',
                cutlen = 3,
                comma = ','
                i = 0,
                len = _v.length,
                mod = (len % cutlen),
                k = cutlen - mod;
                 
            for (i; i < len; i++)
            {
                number = number + _v.charAt(i);
                if (i < len - 1)
                {
                    k++;
                    if ((k % cutlen) == 0)
                    {
                        number = number + comma;
                        k = 0;
                    }
                }
            }
            return number;
        };
         
        var proc = this.proc;
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = proc($(this).removeText(this.value));
            });
        }
        else
        {
            return proc(_v);
        }
    };
     
     
    // 위 두개의 합성.
    // 콤마 불필요시 numberFormat 부분을 주석처리.
    $.fn.onlyNumber_Backup = function (p) {
        $(this).each(function(i) {
            //$(this).attr({'style':'text-align:right'});
        	$(this).css("text-align", "right");
             
            this.value = $(this).removeText(this.value);
            this.value = $(this).numberFormat(this.value);
             
            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
                this.value = $(this).numberFormat(this.value);
            });
        });
    };
     
    
    

    //개선된 숫자체크. (음수허용 및 천단위콤마처리)
    $.fn.onlyNumber = function (p) {
        $(this).each(function(i) {
        	$(this).css("text-align", "right");

        	
        	//초기 화면로딩 시  $('.onlynum').onlyNumber(); 호출에 의해 처리됨.
            this.value = $(this).removeText(this.value);
            if(this.value<0){	//음수일 경우
    			this.value = '-'+ ($(this).numberFormat(this.value.replace(/[^0-9]/g, '')));	
    		}else{
    			this.value = $(this).numberFormat(this.value);	
    		}
            
            
            var _cur=0;
            //정규식에 맞다면 롤백값을 위해 저장한다.
            $(this).bind('keydown',function(e){
            	/*if(e.keyCode==37 || e.keyCode==39){	
            		console.warn("come keyDown 방향키...");
            		return;
            	}*/
            	
            	
            	var regx = /^(-)?((([1-9]+[0]*)*)|0)?$/g;
            	var _chg = this.value.replace(/[^0-9\-]/g,'');
            	if(regx.test(_chg)){
                	_cur = this.value;
            	}
            });
            
            
            //정규식에 맞지않으면 keydown롤백값을 리턴하고 
            //맞으면 콤마처리 후 리턴.
            $(this).bind("keyup", function(e){
            	/*if(e.keyCode==37 || e.keyCode==39){
            		console.warn("come keyup 방향키....");
            		return;
            	}*/
            	
            	var regx = /^(-)?((([1-9]+[0]*)*)|0)?$/g;
            	var _chg = this.value.replace(/[^0-9\-]/g,'');
            	if(regx.test(_chg)){
            		if(_chg<0){	//음수일 경우
            			this.value = '-'+ ($(this).numberFormat(_chg.replace(/[^0-9]/g, '')));	
            		}else{
            			this.value = $(this).numberFormat(_chg);	
            		}
            		
            	}else{
            		this.value = _cur;
            	}
            	
            });
            
        });
    };
    
    
    

    //소수점,음수 허용.
    $.fn.onlyNumberFloat = function (p) {
        $(this).each(function(i) {
        	$(this).css("text-align", "right");

        	
        	//초기 화면로딩 시  $('.onlynum').onlyNumber(); 호출에 의해 처리됨.
            this.value = $(this).removeText(this.value);
            if(this.value<0){	//음수일 경우
    			this.value = '-'+ ($(this).numberFormat(this.value.replace(/[^0-9]/g, '')));	
    		}else{
    			this.value = $(this).numberFormat(this.value);	
    		}
            
            
            var _cur=0;
            //정규식에 맞다면 롤백값을 위해 저장한다.
            $(this).bind('keydown',function(e){
            	var regx = /^(-)?((([1-9]+[0]*)*)|0)?$/g;
            	var _chg = this.value.replace(/[^0-9\-]/g,'');
            	if(regx.test(_chg)){
                	_cur = this.value;
            	}
            });
            
            
            //정규식에 맞지않으면 keydown롤백값을 리턴하고 
            //맞으면 콤마처리 후 리턴.
            $(this).bind("keyup", function(e){
            	var regx = /^(-)?((([1-9]+[0]*)*)|0)?$/g;
            	var _chg = this.value.replace(/[^0-9\-]/g,'');
            	if(regx.test(_chg)){
            		if(_chg<0){	//음수일 경우
            			this.value = '-'+ ($(this).numberFormat(_chg.replace(/[^0-9]/g, '')));	
            		}else{
            			this.value = $(this).numberFormat(_chg);	
            		}
            		
            	}else{
            		this.value = _cur;
            	}
            	
            });
            
        });
    };
    
    
    
    
})(jQuery);
