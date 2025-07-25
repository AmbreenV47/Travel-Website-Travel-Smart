
document.querySelector('.btn').addEventListener('click', function() {
  window.location.href = 'booking.html';
});

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


const menuBtn = document.getElementById('menu-btn');
const navlinks = document.getElementById('navlinks');

menuBtn.addEventListener('click', () => {
    navlinks.classList.toggle('open');
});


// const menuBtn = document.getElementById("menu-btn");
// const navlinks = document.getElementById("navlinks");
// const menuBtnIcon = menuBtn.querySelector("i");

// menuBtn.addEventListener("click", (e) => {
//     navlinks.classList.toggle("open");

//     const isOpen = navlinks.classList.contains("open");
//     menuBtnIcon.setAttribute("class", isOpen ? "ri-close-fill" : "ri-menu-line")
// });

// navlinks.addEventListener("click", (e) => {
//     navlinks.classList.remove("open");
//     menuBtnIcon.setAttribute("class", "ri-menu-line");
//   });

  document.addEventListener("DOMContentLoaded", () => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    
    ScrollReveal().reveal(".headerimage img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".headercontent p", {
      ...scrollRevealOption,
      delay: 250,
    });
    ScrollReveal().reveal(".headercontent h1", {
      ...scrollRevealOption,
      delay:700,
    });
    ScrollReveal().reveal(".headerbtns", {
      ...scrollRevealOption,
      delay: 1100,
    });
    // ScrollReveal().reveal(".form-wrapper", ".form-control", {
    //   ...scrollRevealOption,
    //   delay: 1500,
    // })
  });

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".container__left h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".container__left .container__btn", {
  ...scrollRevealOption,
  delay: 200,
});

ScrollReveal().reveal(".container__right h4", {
  ...scrollRevealOption,
  delay: 400,
});
ScrollReveal().reveal(".container__right h2", {
  ...scrollRevealOption,
  delay: 600,
});
ScrollReveal().reveal(".container__right h3", {
  ...scrollRevealOption,
  delay: 800,
});
ScrollReveal().reveal(".container__right p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".container__right .tent-1", {
  duration: 1000,
  delay: 1200,
});
ScrollReveal().reveal(".container__right .tent-2", {
  duration: 1000,
  delay: 1400,
});

ScrollReveal().reveal(".location", {
  ...scrollRevealOption,
  origin: "left",
  delay: 1600,
});

ScrollReveal().reveal(".socials span", {
  ...scrollRevealOption,
  origin: "top",
  delay: 1800,
  interval: 300,
});

