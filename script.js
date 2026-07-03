document.addEventListener("DOMContentLoaded",()=>{

    const homePlay = document.querySelector(".home-play-btn");
    const homePopup = document.querySelector(".home-video-popup");
    const homeClose = document.querySelector(".home-close");
    const iframe = homePopup?.querySelector("iframe");


    if(homePlay && homePopup && iframe){

        homePlay.onclick = ()=>{

            homePopup.style.display = "flex";

            iframe.src = 
         "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1687981315682432%2F&show_text=false&width=476&t=0";

        };


    }


    if(homeClose){

        homeClose.onclick = ()=>{

            homePopup.style.display = "none";

            iframe.src = "";

        };

    }




const aboutPlay = document.querySelector(".about-play-btn");
const aboutPopup = document.querySelector(".about-video-popup");
const aboutClose = document.querySelector(".about-close");


if(aboutPlay){

    aboutPlay.onclick=()=>{

        aboutPopup.style.display="flex";

        aboutPopup.querySelector("iframe").src =
        "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1687981315682432%2F&show_text=false&width=476&t=0";

    };

}



if(aboutClose){

    aboutClose.onclick=()=>{

        aboutPopup.style.display="none";

        aboutPopup.querySelector("iframe").src="";

    };

}


});
const header = document.querySelector('.header');
const slide = document.querySelector(".Home .list");
const homepage = document.querySelector(".Home");

const first = document.getElementById("count");
const second = document.getElementById("count2");

const heading = document.querySelectorAll(".key-pain li");
const objimg = document.querySelectorAll(".image-point");

// let automaticallySlide = 7000;
// let timerRunning = 1000;
let autoInterval;
let animationTimeout;

let count1 = 0;
let count2 = 0;

const min = 10;
const max = 50;

let fire = false;


// ---------------- SCROLL HEADER ----------------

window.addEventListener('scroll', () => {
    header.classList.toggle(
        'scrolled',
        window.scrollY > 100
    );
});
document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".fa-bars");
    const nav = document.querySelector(".header nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("mobile-active");
        });

    }

});
// ---------------- SLIDER ----------------
const next = document.getElementById("home-next");
const per = document.getElementById("home-per");


let automiticallyslide = 7000;
let currentIndex = 0;
let timer=2000;


function simulation(type){

    const sliderlist = document.querySelectorAll(".Home .list .item");


    if(type === "next"){

        slide.appendChild(sliderlist[0]);

        currentIndex++;

        if(currentIndex >= sliderlist.length){
            currentIndex = 0;
        }

        homepage.classList.add("next");
    }


    if(type === "per"){

        slide.prepend(sliderlist[sliderlist.length - 1]);

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = sliderlist.length - 1;
        }

        homepage.classList.add("per");
    }

 animationTimeout=setTimeout(() => {
    homepage.classList.remove("next", "per");
}, timer);
}

next.onclick = () => simulation("next");

per.onclick = () => simulation("per");



function autoslide(){

    simulation("next");

}


autoInterval = setInterval(autoslide, automiticallyslide);



homepage.addEventListener("mouseenter",()=>{
    clearInterval(autoInterval);
 

});


homepage.addEventListener("mouseleave",()=>{

    clearInterval(autoInterval);

    autoInterval = setInterval(autoslide, automiticallyslide);

});
// ---------------- COUNTER ----------------

function countEx(){

    const interval = setInterval(()=>{


        if(count1 <= min){

            if(first)
            first.textContent = `${count1}+`;

            count1++;
         

        }



        if(count2 <= max){

            if(second)
            second.textContent = `${count2}+`;

            count2++;
       
        }



        if(count1 > min && count2 > max){

            clearInterval(interval);

        }


    },200);

}



// ---------------- COUNTER ON SCROLL ----------------


window.addEventListener("scroll",()=>{


    if(!fire){

        const homePosition = homepage.offsetTop;

        const screenBottom = window.scrollY + window.innerHeight;


        if(screenBottom > homePosition){

            fire = true;

            countEx();

        }

    }


});




// // ---------------- KEY PAIN IMAGE CHANGE ----------------


heading.forEach((title)=>{


    title.addEventListener("click",()=>{


        const index = title.dataset.index;


        heading.forEach(item=>{

            item.classList.remove("change");

        });


        title.classList.add("change");



        objimg.forEach(image=>{

            image.classList.remove("click");

        });



        if(objimg[index]){

            objimg[index].classList.add("click");

        }


    });


});


document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.service-card');
    const slides = document.querySelectorAll('.sevice-content');
    const prevBtn = document.getElementById('left');
    const nextBtn = document.getElementById('right');
    const dotsContainer = document.querySelector('.service-dots');
    const serviceContainer = document.querySelector('.service-container');

    const autoPlay = document.querySelector('.service2').dataset.autoplay === 'true';
    const delay = parseInt(document.querySelector('.service2').dataset.delay) || 3000;

    let currentIndex = 0;
    let autoSlideInterval;


    // Create dots automatically
function createDots(){

    dotsContainer.innerHTML = "";

    let totalDots;


    if(window.innerWidth <= 786){

        // Mobile
        totalDots = slides.length; // 6 dots

    }else{

        // Tablet + Laptop
        totalDots = 4; // 4 dots

    }



    for(let i = 0; i < totalDots; i++){


        let dot = document.createElement("span");

        dot.classList.add("dot");


        if(i === 0){

            dot.classList.add("active");

        }


        dot.addEventListener("click",()=>{

            currentIndex = i;

            updateSlider();

            resetAutoSlide();

        });


        dotsContainer.appendChild(dot);

    }

}


    function getSlideWidth(){

        return slides[0].offsetWidth + 
        parseInt(window.getComputedStyle(slider).gap);

    }



    function updateSlider(){

        let slideWidth = getSlideWidth();


        slider.style.transform =
        `translateX(-${currentIndex * slideWidth}px)`;


        document.querySelectorAll('.dot')
        .forEach((dot,index)=>{

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }



    function nextSlide(){

        if(currentIndex < slides.length-1){

            currentIndex++;

        }else{

            currentIndex = 0;

        }

        updateSlider();

    }



    function prevSlide(){

        if(currentIndex > 0){

            currentIndex--;

        }else{

            currentIndex = slides.length-1;

        }

        updateSlider();

    }



    function startAutoSlide(){

        if(autoPlay){

            autoSlideInterval =
            setInterval(nextSlide,delay);

        }

    }


    function stopAutoSlide(){

        clearInterval(autoSlideInterval);

    }


    function resetAutoSlide(){

        stopAutoSlide();
        startAutoSlide();

    }



    nextBtn.addEventListener(
        "click",
        ()=>{
            nextSlide();
            resetAutoSlide();
        }
    );


    prevBtn.addEventListener(
        "click",
        ()=>{
            prevSlide();
            resetAutoSlide();
        }
    );



    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );



 window.addEventListener("resize",()=>{

    createDots();

    updateSlider();

});

    createDots();
    updateSlider();
    startAutoSlide();


});// Add this to your existing script.js or add it at the end before closing body tag
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuIcon = document.querySelector('.fa-bars');
    const header = document.querySelector('.header');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            header.classList.toggle('mobile-active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && header.classList.contains('mobile-active')) {
            header.classList.remove('mobile-active');
        }
    });
    
    // Adjust service slider for mobile
    function adjustServiceSlider() {
        const serviceCard = document.querySelector('.service-card');
        const contents = document.querySelectorAll('.sevice-content');
        
        if (window.innerWidth <= 1000) {
            // On mobile, show all cards stacked
            contents.forEach(content => {
                content.style.display = 'block';
            });
        }
    }
    
    // Run on load and resize
    adjustServiceSlider();
    window.addEventListener('resize', adjustServiceSlider);
});


const track = document.querySelector(".commit-content");
const dotsContainer = document.querySelector(".commit-dots");
const slides = document.querySelectorAll(".commit-contenner");

let currentSlide = 0;
const delay = 4000;
let autoSlide;



// Create dots depending on screen size
function createDots(){

    dotsContainer.innerHTML = "";

    let totalDots;

    if(window.innerWidth <= 786){

        totalDots = slides.length; // 6 dots mobile

    }else{

        totalDots = Math.ceil(slides.length / 2); // 3 dots laptop

    }


    for(let i=0; i<totalDots; i++){

        let dot = document.createElement("span");

        dot.classList.add("dot2");

        if(i === 0){
            dot.classList.add("active2");
        }


        dot.addEventListener("click",()=>{

            clearInterval(autoSlide);

            goToSlide(i);

            startAuto();

        });


        dotsContainer.appendChild(dot);

    }

}




function goToSlide(index){

    currentSlide = index;


    let slideMove;


    if(window.innerWidth <= 786){

        // mobile one card
        slideMove = index * 101;
        console.log("mobile size")

    }else if(window.innerWidth >= 786 && window,innerWidth <= 1024){

        // laptop two cards
        slideMove = index * 102;
        console.log("teblet size")

    }else{
        slideMove = index * 103;
        console.log("laptop size")
    }


    track.style.transform =
    `translateX(-${slideMove}%)`;



    document.querySelectorAll(".dot2")
    .forEach(dot=>dot.classList.remove("active2"));


    document.querySelectorAll(".dot2")[index]
    .classList.add("active2");

}




function startAuto(){

    autoSlide = setInterval(()=>{


        let total;


        if(window.innerWidth <= 786){

            total = slides.length;

        }else{

            total = Math.ceil(slides.length / 2);

        }


        currentSlide = (currentSlide + 1) % total;


        goToSlide(currentSlide);


    },delay);

}




window.addEventListener("resize",()=>{

    clearInterval(autoSlide);

    createDots();

    currentSlide = 0;

    goToSlide(0);

    startAuto();

});



createDots();
goToSlide(0);
startAuto();
const videos = [
  { id: "HDsCri1-oHE", title: "Shoulder Pain" },
  { id: "dXAhB-GR5Qw", title: "Shoulder Pain" },
  { id: "exOOeyYZyYs", title: "Neck and Back Pain" }
];


let autoSlideInterval = null;
const AUTO_SLIDE_TIME = 4000;

// Elements
const mainThumb = document.getElementById("mainThumbnail");
const popup = document.querySelector(".video-popup");
const iframe = document.querySelector(".video-popup iframe"); // ✅ FIXED

/* ---------------- AUTO SLIDE ---------------- */

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextVideo, AUTO_SLIDE_TIME);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

/* ---------------- UPDATE MAIN ---------------- */

function updateMainVideo() {
  mainThumb.src = `https://img.youtube.com/vi/${videos[currentIndex].id}/hqdefault.jpg`;
}

/* ---------------- POPUP ---------------- */

function openPopup() {
  stopAutoSlide();
  popup.style.display = "flex";
  iframe.src = `https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=1`;
}

function closePopup() {
  popup.style.display = "none";
  iframe.src = "";
  startAutoSlide();
}

/* ---------------- NAVIGATION ---------------- */

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  updateMainVideo();
  if (popup.style.display === "flex") {
    iframe.src = `https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=1`;
  }
}

function prevVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateMainVideo();
  if (popup.style.display === "flex") {
    iframe.src = `https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=1`;
  }
}

/* ---------------- EVENTS ---------------- */

document.querySelector(".next-video").addEventListener("click", nextVideo);
document.querySelector(".prev-video").addEventListener("click", prevVideo);
document.querySelector(".next-video-popup").addEventListener("click", nextVideo);
document.querySelector(".prev-video-popup").addEventListener("click", prevVideo);

document.getElementById("playMain").addEventListener("click", openPopup);
document.querySelector(".close-btn").addEventListener("click", closePopup);

// Grid click
document.querySelectorAll(".video-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    currentIndex = index;
    updateMainVideo();
    openPopup();
  });
});

/* ---------------- INIT ---------------- */

updateMainVideo();
startAutoSlide();

// --------------------------------------------------------

                    // backend form

   
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const serviceForm = document.getElementById("serviceForm");

    if (!serviceForm) return;

    const statusBox = document.getElementById("formStatus");
    const submitBtn = serviceForm.querySelector("button");

    serviceForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(serviceForm);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            issues: formData.get("issues")
        };

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {

            const response = await fetch("/service-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {

                statusBox.className = "form-status success";
                statusBox.textContent = "✅ Request sent successfully!";

                serviceForm.reset();

            } else {

                statusBox.className = "form-status error";
                statusBox.textContent = result.message;

            }

        } catch (error) {

            statusBox.className = "form-status error";
            statusBox.textContent = "❌ Server error. Please try again.";

        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";

    });

});