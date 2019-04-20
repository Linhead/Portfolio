


window.addEventListener("load", function () {

const slides = document.querySelectorAll('#slides .slide');
for(let i=0; i<slides.length; i++) {
       slides[i].style.position = 'absolute';
   }
const slide = document.querySelector('#slides');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide,2000);
let playing = true;
const next = document.querySelector('#next-btn');
const previous = document.querySelector('#prev-btn');



const controls = document.querySelectorAll('.controls');
for(let i=0; i<controls.length; i++){
    controls[i].style.display = 'inline-block';
}




function nextSlide() {
    goToSlide(currentSlide+1);
}
 
function previousSlide() {
    goToSlide(currentSlide-1);
}
 
function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].className = 'slide showing';
}

function pauseSlideshow() {
    playing = false;
    clearInterval(slideInterval);
    
}
 
function playSlideshow() {
    playing = true;
    slideInterval = setInterval(nextSlide,2000);
}

slide.onmouseover=function(){
pauseSlideshow();
 };
  
 slide.onmouseout = function(){
playSlideshow();
  } 

  next.addEventListener("click", function () {
    pauseSlideshow();
    nextSlide();
}, false); 

previous.addEventListener("click", function () {
    pauseSlideshow();
    previousSlide();
}, false);
 
}, false);
