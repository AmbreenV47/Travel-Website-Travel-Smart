let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");

// Smooth scrolling and page linking
navLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute("href").substring(1); // Get target section ID
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
    }
  });
});

window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(section => {
    let offset = section.offsetTop - 150; // Adjust for fixed nav or similar
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active"); // Remove active class from all links
      });
      document.querySelector("nav a[href='#" + id + "']").classList.add("active"); // Highlight the current link
    }
  });
};


let items = document.querySelectorAll('.slider .list .item');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let lastPosition = items.length - 1;
let firstPosition = 0;
let active = 0;

nextBtn.onclick = () => {
    active = active + 1;
    setSlider();
}
prevBtn.onclick = () => {
    active = active - 1;
    setSlider();
}
const setSlider = () => {
    let oldActive = document.querySelector('.slider .list .item.active');
    if(oldActive) oldActive.classList.remove('active');
    items[active].classList.add('active');
    // 
    nextBtn.classList.remove('d-none');
    prevBtn.classList.remove('d-none');
    if(active == lastPosition) nextBtn.classList.add('d-none');
    if(active == firstPosition) prevBtn.classList.add('d-none');
}
setSlider();

// set diameter
const setDiameter = () => {
    let slider = document.querySelector('.slider');
    let widthSlider = slider.offsetWidth;
    let heightSlider = slider.offsetHeight;
    let diameter = Math.sqrt(Math.pow(widthSlider, 2) + Math.pow(heightSlider, 2));
    document.documentElement.style.setProperty('--diameter', diameter+'px');
}
setDiameter();
window.addEventListener('resize', () => {
    setDiameter();
});

//Activities

CustomEase.create("cubic", "0.83, 0, 0.17, 1");
let isAnimating = false;

function splitTextIntoSpans(selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
            .split("")
            .map(function (char) {
                return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
            })
            .join("");
        element.innerHTML = splitText;
    });
}

function initializeCards() {
    let cards = Array.from(document.querySelectorAll(".card"));
    gsap.to(cards, {
        y: (i) => -15 + 15 * i + "%",
        z: (i) => 15 * i,
        duration: 1,
        ease: "cubic",
        stagger: -0.1,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".copy h1");
    initializeCards();

    gsap.set("h1 span", { y: -200 });
    gsap.set(".slides .card:last-child h1 span", { y: 0 });
});

document.addEventListener("click", function () {
    if (isAnimating) return;

    isAnimating = true;

    let slider = document.querySelector(".slides");
    let cards = Array.from(slider.querySelectorAll(".card"));
    let lastCard = cards.pop();
    let nextCard = cards[cards.length - 1];

    gsap.to(lastCard.querySelectorAll("h1 span"), {
        y: 200,
        duration: 0.75,
        ease: "cubic",
    });
    
    gsap.to(lastCard, {
        y: "+=150%",
        duration: 0.75,
        ease: "cubic",
        onComplete: () => {
            slider.prepend(lastCard);
            initializeCards();
            gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });
            isAnimating = false; // Reset the flag
        },
    });

    gsap.to(nextCard.querySelectorAll("h1 span"), {
        y: 0,
        duration: 0.75, // Match duration to card animation for consistency
        ease: "cubic",
        stagger: 0.05,
    });
});

// gsap.registerPlugin(ScrollTrigger);

// function addImageScaleAnimation() {
//     gsap.utils.toArray("section").forEach((section, index) => {
//         const image = document.querySelector(`#preview-${index + 1} img`);

//         const startCondition = index === 0 ? "top top" : "bottom bottom";
    
//         gsap.to(image, {
//             scrollTrigger: {
//                 trigger: section,
//                 start: startCondition,
//                 end: () => {
//                     const viewportHeight = window.innerHeight;
//                     const sectionBottom = section.offsetTop + section.offsetHeight;
//                     const additionalDistance = viewportHeight * 0.5;
//                     const endValue = sectionBottom - viewportHeight + additionalDistance;
//                     return `+=${endValue}`;
//                 },
//                 scrub: 1,
//             },
//             scale: 3,
//             ease: "none",
//         });
//     });
// }
// addImageScaleAnimation();

// function animateClipPath(
//     sectionId,
//     previewId,
//     startClipPath,
//     endClipPath,
//     start = "top center",
//     end = "bottom top"
// ) {
//     let section = document.querySelector(sectionId);
//     let preview = document.querySelector(previewId);

//     ScrollTrigger.create({
//         trigger: section,
//         start: start,
//         end: end,
//         onEnter: () => {
//             gsap.to(preview, {
//                 scrollTrigger: {
//                     trigger: section,
//                     start: start,
//                     end: end,
//                     scrub: 0.125,
//                 },
//                 clipPath: endClipPath,
//                 ease: "none"
//             });
//         },
//     });
// }

// animateClipPath(
//     "#section-1",
//     "#preview-1",
//     "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//     "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
// );

// const totalSections = 7;

// for (let i = 2; i <= totalSections; i++) {
//     let currentSection = `#section-${i}`;
//     let prevPreview = `#preview-${i - 1}`;
//     let currentPreview = `#preview-${i}`;

//     animateClipPath(
//         currentSection,
//         prevPreview,
//         "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//         "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
//         "top bottom",
//         "center center"
//     );
    
//     if (i < totalSections) {
//         animateClipPath(
//             currentSection,
//             currentPreview,
//             "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
//             "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//             "center center",
//             "bottom top"
//         );
//     }
// }


// // let slides = document.querySelectorAll('.slider .list .item');
// // let next = document.getElementById('next');
// // let prev = document.getElementById('prev');
// // let thumbnails = document.querySelectorAll('.thumbnail .item');

// // // config param
// // let countItem = slides.length;
// // let itemActive = 0;
// // // event next click
// // next.onclick = function(){
// //     itemActive = itemActive + 1;
// //     if(itemActive >= countItem){
// //         itemActive = 0;
// //     }
// //     showSlider();
// // }
// // //event prev click
// // prev.onclick = function(){
// //     itemActive = itemActive - 1;
// //     if(itemActive < 0){
// //         itemActive = countItem - 1;
// //     }
// //     showSlider();
// // }
// // // auto run slider
// // let refreshInterval = setInterval(() => {
// //     next.click();
// // }, 5000)
// // function showSlider(){
// //     // remove item active old
// //     let itemActiveOld = document.querySelector('.slider .list .item.active');
// //     let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
// //     itemActiveOld.classList.remove('active');
// //     thumbnailActiveOld.classList.remove('active');

// //     // active new item
// //     slides[itemActive].classList.add('active');
// //     thumbnails[itemActive].classList.add('active');

// //     // clear auto time run slider
// //     clearInterval(refreshInterval);
// //     refreshInterval = setInterval(() => {
// //         next.click();
// //     }, 5000)
// // }

// // // click thumbnail
// // thumbnails.forEach((thumbnail, index) => {
// //     thumbnail.addEventListener('click', () => {
// //         itemActive = index;
// //         showSlider();
// //     })
// // })