// AOS 초기화
AOS.init({
    duration: 1000, // 애니메이션 지속 시간 
    easing: 'ease-in-out',
    once: false, // 스크롤 할 때마다 실행되도록 설정
});

// Swiper 초기화 및 AOS 연동 로직
const swiper = new Swiper('.gallery', {
    // 기본 옵션
    loop: true, // 무한 반복
    speed: 800, // 슬라이드 넘어가는 속도
    effect: 'fade', // 페이드 효과 (좌우 슬라이드가 좋으면 'slide'로 변경)
    fadeEffect: {
        crossFade: true
    },
    
    // 네비게이션
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // 페이지네이션
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // AOS 연동 이벤트
    on: {
        // 슬라이드가 넘어가기 시작할 때 (모든 애니메이션 숨김)
        slideChangeTransitionStart: function () {
            // 모든 aos 요소에서 'aos-animate' 클래스 제거 -> 투명해짐
            document.querySelectorAll('.swiper-slide [data-aos]').forEach(el => {
                el.classList.remove('aos-animate');
            });
        },

        // 슬라이드 이동이 끝나고 화면에 보일 때 (애니메이션 실행)
        slideChangeTransitionEnd: function () {
            // 현재 활성화된 슬라이드(.swiper-slide-active) 내부의 요소만 선택
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                activeSlide.querySelectorAll('[data-aos]').forEach(el => {
                    // 약간의 딜레이 후 클래스 추가 (브라우저 렌더링 보장)
                    setTimeout(() => {
                        el.classList.add('aos-animate');
                    }, 50);
                });
            }
        }
    }
});

// 3. 페이지 로드 시 첫 번째 슬라이드 애니메이션 강제 실행 (안전장치)
window.addEventListener('load', () => {
    setTimeout(() => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            activeSlide.querySelectorAll('[data-aos]').forEach(el => {
                el.classList.add('aos-animate');
            });
        }
    }, 100);
});