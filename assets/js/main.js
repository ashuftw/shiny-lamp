// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}


// Typing animation — replaced on the home page by a static hero image (#home-image).
// The HTML element (<p id="home-quote">) and its CSS are commented out in layouts/index.html.
// window.quotes is still populated from hugo.toml via layouts/_default/baseof.html;
// remove that block too if the quotes config key is also dropped.
//
// const displayRandomQuote = () => {
//   const quoteElement = document.getElementById('home-quote');
//   if (quoteElement) {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const quote = quotes[randomIndex];
//     quoteElement.textContent = '';
//     quoteElement.style.opacity = '1';
//     const cursor = document.createElement('span');
//     cursor.className = 'typing-cursor';
//     cursor.textContent = '▌';
//     typeWriter(quote, quoteElement, cursor, 0);
//   }
// }
//
// const typeWriter = (text, element, cursor, index) => {
//   if (index < text.length) {
//     element.textContent = text.substring(0, index + 1);
//     element.appendChild(cursor);
//     setTimeout(() => {
//       typeWriter(text, element, cursor, index + 1);
//     }, 70); // typing speed in ms per character
//   } else {
//     cursor.style.animation = 'blink 1s infinite';
//   }
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   displayRandomQuote();
// });

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight';
    mobileMenu.style.display = 'none';
    mobileMenuVisible = false;
  }
}

// Social Share Toggle
//
let shareMenuVisible = false;
const shareMobileMenu = () => {
  let shareMenu = document.getElementById('share-links');
  if (shareMenuVisible == false) {
    shareMenu.style.animationName = 'bounceInRight';
    shareMenu.style.webkitAnimationName = 'bounceInRight';
    shareMenu.style.display = 'block';
    shareMenuVisible = true;
  } else {
    shareMenu.style.animationName = 'bounceOutRight';
    shareMenu.style.webkitAnimationName = 'bounceOutRight';
    shareMenu.style.display = 'none';
    shareMenuVisible = false;
  }
}

// Featured Image Toggle
//
const showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
}

const hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
}

// ToC Toggle
//
const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}

if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);
  listen('#share-btn', "click", shareMobileMenu);
  listen('#toc-btn', "click", toggleToc);
  listen('#img-btn', "click", showImg);
  listen('.bg-img', "click", hideImg);

  document.querySelectorAll('.post-year').forEach((ele) => {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();

    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }
    if (shareMenuVisible == true) {
      shareMobileMenu();
    }
  }, 250));
}