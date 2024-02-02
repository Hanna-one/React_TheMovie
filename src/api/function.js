export const setSwiper = (el, sec=false, breakpoint = false) => { 
  const swiper = new Swiper(el, {

    autoplay: (!sec) //undefined, null, false, '', 0
    ? false //sec 값을 안 넣으면 autoplay 안함.
    : { 
      delay: sec,
      disableOnInteraction: false, //터치하더라도 autoplay는 해라.
    },//autoplay

    loop: true,

    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },//navigation

    pagination: {
      el: '.pagination',
      type: 'bullets',
      clickable: true,
    },//pagination 

    slidesPerView: 1,
    slidesPerGroup : 1,

    breakpoints: (breakpoint) && { //breakpoint가 들어있으면 {값} 이 return됨.
      300:{
        slidesPerView: 2,
        slidesPerGroup : 2,
      },
      600: {
        slidesPerView: 3,
        slidesPerGroup : 3,
      },
      900: {
        slidesPerView: 4,
        slidesPerGroup : 4,
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup : 5,
      },
      1500: {
        slidesPerView: 6,
        slidesPerGroup : 6,
      },
    }//breakpoints

  });//new Swiper
}//setSwiper