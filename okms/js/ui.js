$(document).ready(function(){
	
	//Top으로 버튼 초기진입시 미노출
	var $topBtn = $('.btn_top');

	$(window).scroll(function() {
		if ($('body, html').scrollTop() > 200) {
			$topBtn.addClass('on');
		} else {
			$topBtn.removeClass('on');
		}
	});
	
	//Top으로
	$topBtn.on('click', function(e){
	  	e.preventDefault();		
	  	$('body, html').animate({scrollTop:0}, '300');
	});

	//버튼에 on ui
	$('.toggleBtn').on('click', function(){
		btnToggleOnClass($(this));
	});

	//아코디언
	$('.drag_box .btn_arr').on('click', function(){
		$(this).closest('.drag_box').toggleClass('on');
	});

	//아코디언 전체 리스트 컨트롤
	$('.slideDown_btn_box button').on('click', function(){
		
		$('.drag_box').removeClass('on');
		$(this).children('.tooltip_label_bot').text('목록 전체 열기');

		if( $(this).hasClass('on') ){			
			$('.drag_box').removeClass('on');
			$(this).siblings('.tooltip_label_bot').text('목록 전체 열기');
		}else{			
			
			$('.drag_box').addClass('on');
			$(this).siblings('.tooltip_label_bot').text('목록 전체 닫기');
		}
	});

	//lnb 영역 토글
	$('.ico_fold').on('click', function(){
		$(this).closest('aside').toggleClass('fold');
	});

	//좌측 사이드바 사이즈 조절
	$(".resizable").resizable(
		{
			autoHide: true,
			handles: 'e',
			resize: function(e, ui) 
			{
				var parent = ui.element.parent();
				
				var remainingSpace = parent.width() - ui.element.outerWidth(),
					divTwo = ui.element.next(),
					divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width()))/parent.width()*100+"%";
					divTwo.width(divTwoWidth);
			},
			stop: function(e, ui) 
			{
				var parent = ui.element.parent();
				ui.element.css(
				{
					width: ui.element.width()/parent.width()*100+"%",
				});
			}
	});

	//드래그로 위치 변경
	$(".sortable,.sortable2").sortable({
		handle: ".btn_drag",
		cancel: ".txt_area",
		axis: 'y',
		placeholder: "ui-state-highlight",
		forcePlaceholderSize: true
	});

	//드래그로 위치 변경 - 내부 리스트 영역
	$( ".drag_area" ).sortable({
		handle: ".btn_drag",
		cancel: ".txt_cont",
		axis: 'y',
		placeholder: "ui-state-highlight",
		forcePlaceholderSize: true
	});

	// 목차 스크롤 이동
	$('.index_navi a').on('click', function(e){
		e.preventDefault();
		
		var $focusCon = $(this.hash);

		$('body, html').animate({
			scrollTop : $(this.hash).offset().top - 84
		},300)
		
		//네비게이션 active
		$(this).addClass('active');
		$('.index_navi a').not(this).removeClass('active');
		
		//해당 목차 닫혀 있으면 열기
		boxFocusOpen($focusCon);

		//목차 focus
		$focusCon.addClass('active', activeRemoveBack($focusCon) );
		$('.tit_area').not($focusCon).removeClass('active');
	});

	//각주 - 각주에서 리스트 이동 시 목차 닫혀 있으면 열기
	$('.footnote .col_min70').on('click', function(e){
		e.preventDefault();

		var $focusCon = $(this.hash);

		//해당 목차 닫혀있으면 열기
		boxFocusOpen($focusCon);
	});

	//각주 - 각주 리스트로 스크롤 이동
	$('.num, .footnote .col_mint70').on('click', function(e){
		e.preventDefault();

		$('body, html').scrollTop( $(this.hash).offset().top - 76 );
		$('html').css('scroll-behavior', 'unset')

	});

	//카테고리 아코디언
	$('.tree .btn_acco').on('click', function(){
		$(this).closest('li').toggleClass('on');
	});

	//툴팁
	$( "[id^=tooltip]" ).tooltip({
		position: {
			my: "right bottom",
			at: "center top"
		},
		trigger: 'hover',
		html: true
	});

	//메인 트리 구조 들여쓰기
	$('.index_navi ul').each(function (index , item) {
		index += 1;
		$(item).addClass('d' + index);
		$('.d' + index).css('text-indent',  index * 20 + 'px');
	});
	
});

function btnToggleOnClass(target){
	$(target).toggleClass('on');
}

function activeRemoveBack($focusCon) {
	setTimeout(function() {
		$focusCon.removeClass('active');
	}, 1600 );
}

function boxFocusOpen(hash){	
	if( hash.closest('.drag_box').hasClass('on') == false){
		hash.closest('.drag_box').addClass('on');
	}
}

//브라우저 너비 체크
let windowResponsive = function() {
	const wrapper = document.getElementById('wrapper');
	
	//리사이즈 너비 체크
	window.addEventListener('resize', function(){
		windowWidthCheck(768, 'mo');
	});

	//초기 진입 시 너비 체크
	windowWidthCheck(768, 'mo');

	function windowWidthCheck( width, className ){
		if ( window.innerWidth <= width) {
			wrapper.classList.add(className);
			
		}else{
			wrapper.classList.remove(className);
		}
	}
}

//글자크기 확대,축소 기능
let resizeFont = function() {
	let	increment = document.getElementById('zoomIn'),
	decrement = document.getElementById('zoomOut'),
	defaultSize  = document.getElementById('defaultSize'),
	fsize     = document.querySelectorAll('.txt_cont'),
	step      = 1;		
	minSize   = 12;
	maxSize   = 18;
	currentFontSize = 14;

	if(increment || decrement || defaultSize) {
		for(var i = 0; i < fsize.length; ++i){
			fsize[i].style.fontSize = "14px";
		}

		function SetFontSize(index,fontSizeString){	
			fsize[index].style.fontSize = fontSizeString;
		}

		function GetFontSizeFromString(index){
			return parseInt(fsize[index].style.fontSize.replace("px", ""));
		}

		function FontSizeStringBuilder(originalFontSize,addedStep){
			return originalFontSize + addedStep + 'px';
		}

		function SetupEventListener(Element,EventString, limitSize, addedStep, isDefault){
			Element.addEventListener(EventString, function(){
				
				for(var i = 0; i < fsize.length; ++i){

					fsize[i].style.lineHeight = "1.7";
					
					if( GetFontSizeFromString(i) != limitSize){
						if(isDefault){
							SetFontSize(i, addedStep);
						}
						else{
							SetFontSize(i, FontSizeStringBuilder(parseInt(fsize[i].style.fontSize), addedStep));
						}
						currentFontSize = parseInt(fsize[i].style.fontSize);
					}
				}
				RefreshOpacity(currentFontSize);
			});
		}

		function RefreshOpacity(targetFontSize)
		{
			if ( targetFontSize == minSize )
			{
				decrement.style.opacity = "0.5";
			}
			else
			{
				decrement.style.opacity = "1";
			}
	
			if ( targetFontSize == maxSize )
			{
				increment.style.opacity = "0.5";
			}
			else
			{
				increment.style.opacity = "1";
			}
		}

		SetupEventListener(increment, "click", maxSize, step, false);
		SetupEventListener(decrement, "click", minSize, -step, false);
		SetupEventListener(defaultSize, "click", 14, "14px", true);
	}
};

//트리영역 마우스로 터치 드래그
let mouseDragX = function() {	
		
	const slider = document.querySelector('.category_tree');
	let isDown = false;
	let startX;
	let scrollLeft;		

	if(slider){
		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener('mouseleave', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mouseup', () => {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mousemove', (e) => {
			if(!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 3; //scroll-fast
			slider.scrollLeft = scrollLeft - walk;	  
		});
	};
};

//슬라이드
let carouselSlider = function() {
	let prevBtn = document.getElementById('prev');
	let ntexBtn = document.getElementById('next');
	let slideIndex = 1;

	
	if(prevBtn || ntexBtn) {

		showSlides(slideIndex);
		// 다음 슬라이드 표시
		function nextSlide() {
			showSlides(slideIndex += 1);
		}

		// 이전 슬라이드 표시
		function previousSlide() {
			showSlides(slideIndex -= 1);
		}

		// 슬라이드 기능
		function showSlides(n) {
			let slides = document.getElementsByClassName("slider_item");
			let itemTotalCount = slides.length;
			
			if (n > slides.length) {
				slideIndex = 1
			}
			if (n < 1) {
				slideIndex = slides.length;
			}
		
			for (let slide of slides) {
				slide.style.display = "none";
			}   
			slides[slideIndex - 1].style.display = "block"; 
			
			document.getElementById('totalIndex').innerText = itemTotalCount;
			document.getElementById('currentIndex').innerHTML = slideIndex;
		}

		// 이전 버튼 클릭이벤트
		prevBtn.addEventListener('click', (e) => {
			previousSlide();
		});

		// 다음 버튼 클릭이벤트
		ntexBtn.addEventListener('click', (e) => {
			nextSlide();
		});
	}	
}


//메인 트리 구조 들여쓰기
$('.index_navi ul').each(function (index , item) {
	index += 1;
	$(item).addClass('d' + index);
	$('.d' + index).css('text-indent',  index * 20 + 'px');
});




windowResponsive();
resizeFont();
mouseDragX();
carouselSlider();

