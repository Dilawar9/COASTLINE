

// 1.1 header section right-sidebar 
if (document.getElementById("mySidenav")) {

  function open_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
      sidepanel.style.left = "0";
    } else {
      console.error("Error: Side panel element not found!");
    }
  }
  function close_aside() {
    "use strict";
    const sidepanel = document.getElementById("mySidenav");
    if (sidepanel) {
      sidepanel.style.left = "-355px";
    } else {
      console.error("Error: Side panel element not found!");
    }
  }

  let slid = document.getElementById("slid-btn");
  slid.onclick = () => {
    let dropdwon = document.getElementById("slid-drop");
    dropdwon.classList.toggle("aside-dropdwon");
  };

}

/* 1.11 Testionials Slider*/
if (document.querySelector(".Testimonials")) {

  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides() {
    showSlides(++slideIndex);
  }

  function minusSlides() {
    showSlides(--slideIndex);
  }

  function showSlides(n, event = null) {
    const slides = document.querySelectorAll(".mySlides");
    const imgContainer = document.querySelector(".Testimonials figure");
    const imgs = document.querySelectorAll(".Testimonials figure img");

    if (imgs.length !== 4) {
      console.error("Expected exactly 4 images, but found " + imgs.length);
      return;
    }

    if (event) {
      const clickedImg = event.target;
      const clickedImgIndex = Array.from(imgs).indexOf(clickedImg);
      if (clickedImgIndex !== -1) {
        slideIndex = clickedImgIndex + 1;
      }
    } else {
      slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;
    }

    slides.forEach((slide) => (slide.style.display = "none"));
    imgs.forEach((img) => img.classList.remove("active"));
    slides[slideIndex - 1].style.display = "flex";
    imgs[slideIndex - 1].classList.add("active");
    imgContainer.style.transition = "opacity 2s ease";
    imgContainer.style.opacity = "0";
    const orderIndices = [1, 2, 3, 4];
    for (let i = 0; i < imgs.length; i++) {
      let index = (slideIndex + i + imgs.length) % imgs.length;
      imgs[index].style.visibility = "hidden";
      setTimeout(() => {
        imgs[index].style.order = orderIndices[i];
        imgs[index].style.visibility = "visible";
      }, 0);
    }
    imgContainer.style.opacity = "1";
  }
  document.querySelectorAll(".Testimonials figure img").forEach((img, index) => {
    img.addEventListener("click", function (event) {
      showSlides(index + 1, event);
    });
  });
}

// 1.2 Hero section Background slider
const hero = document.querySelector('.Hero');
const bgHero = document.querySelector('.Hero::before');
if (hero !== null) {
  const images = [
    'url(../images/bg/hero-bg.png)',
    'url(../images/bg/hero-bg1.jpg)',
    'url(../images/bg/hero-bg2.jpg)',
  ];
  let currentIndex = 0;
  function changeBackgroundImage() {
    hero.classList.remove("animate")
    hero.style.setProperty('--bg-image', images[currentIndex]);
    setTimeout(() => {
      hero.classList.add("animate")
    }, 50);
    currentIndex = (currentIndex + 1) % images.length;
  }
  changeBackgroundImage();
  setInterval(changeBackgroundImage, 4500);
}

// 1.7 Project Section Tab-pan
if (document.querySelector(".tab-pane") || document.querySelector(".active_Tab")) {
  function switchTab(index) {
    var panes = document.querySelectorAll(".tab-pane");
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove("active_Tab");
      tabs[i].classList.remove("active_Tab");
    }
    panes[index].classList.add("active_Tab");
    tabs[index].classList.add("active_Tab");
  }
  switchTab(0);
}

// 1.4  partners section slider

$(".Partners_Slider").slick({
  arrows: false,
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 6,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        dots: true,
        slidesToScroll: 1,
      },
    },  
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
});

// 1.5  Company section slider 

$(".Company_Slider").slick({
  arrows: true,
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
});


// 1.6 services section slider 

$(".Services_Slider").slick({
  arrows: false,
  dots: true,
  infinite: true,
  autoplaySpeed: 2000,
  // autoplay:true,
  slidesToShow: 3,
  speed: 1000,
  slidesToScroll: 1,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
});

//1.10  stats section counter

function animateNumbers(num, finalValue, duration) {
  let start = null;
  const finalValueStr = num.getAttribute("data-final-value");
  const charCount = finalValueStr.length;
  num.style.display = "inline";
  num.style.width = `${charCount}ch`;
  const numberFormatter = new Intl.NumberFormat("en-US");
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    num.textContent = numberFormatter.format(Math.floor(progress * finalValue));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      num.style.display = "inline";
    }
  }
  window.requestAnimationFrame(step);
}
function startNumberAnimation() {
  const numbers = document.querySelectorAll(".number");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const finalValue = parseInt(
            entry.target.getAttribute("data-final-value")
          );
          animateNumbers(entry.target, finalValue, 2000);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  numbers.forEach((num) => observer.observe(num));
}
startNumberAnimation();
window.addEventListener("load", startNumberAnimation);



// 1.13  footer section message box
const footerform = document.querySelectorAll(".Subscribe-massage");
const footerMessag = document.querySelector(".Succes-box");
if (footerform !== null) {
  footerform.forEach((form)=>{
    form.addEventListener("submit",(event)=>{
      event.preventDefault();
      footerMessag.innerHTML = `
            <img src="assets/images/index/check-mark.png" alt="">
            <h4>Congratulations</h4>
            <h5>Form Submitted Successfully</h5>
        `;
        footerMessag.style.display = 'block';
        form.reset();
        setTimeout(() => {
            footerMessag.style.display = 'none';
        }, 5000);
    })
  })
}

// scroll to top

window.onscroll = function() {
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      scrollTopBtn.style.display = "block";
  } else {
      scrollTopBtn.style.display = "none";
  }
};

// Function to scroll the page to the top
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
  });
}