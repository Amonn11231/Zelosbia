// Select the main page elements used by the interactive features.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

// Create the language selector and place it inside the navigation bar.
const languageControl = document.createElement('div');
languageControl.className = 'language-control';
languageControl.innerHTML = `
  <button class="language-button" type="button" aria-label="Change language" aria-expanded="false">
    <i class="fa-solid fa-globe" aria-hidden="true"></i>
    <span>Language</span>
  </button>
  <div class="language-menu" aria-hidden="true">
    <div id="google_translate_element"></div>
  </div>`;

const navbar = document.querySelector('.navbar');

if (navbar) {
  navbar.insertBefore(languageControl, menuButton || null);
}

const languageButton = languageControl.querySelector('.language-button');
const languageMenu = languageControl.querySelector('.language-menu');

if (languageButton && languageMenu) {
  languageButton.addEventListener('click', () => {
    const isOpen = languageControl.classList.toggle('open');
    languageButton.setAttribute('aria-expanded', String(isOpen));
    languageMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!languageControl.contains(event.target)) {
      languageControl.classList.remove('open');
      languageButton.setAttribute('aria-expanded', 'false');
      languageMenu.setAttribute('aria-hidden', 'true');
    }
  });
}

// Initialize Google Translate when the translation library becomes available.
window.googleTranslateElementInit = () => {
  if (window.google && google.translate) {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'af,ar,bg,ca,cs,da,de,el,en,es,fa,fi,fr,he,hi,hr,hu,id,it,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-TW',
        autoDisplay: false
      },
      'google_translate_element'
    );
  }
};

const translateScript = document.createElement('script');
translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
translateScript.async = true;
document.head.appendChild(translateScript);

// Add a darker background to the header after the user scrolls.
window.addEventListener(
  'scroll',
  () => {
    if (header) {
      header.classList.toggle('scrolled', window.pageYOffset > 20);
    }
  },
  { passive: true }
);

// Open and close the mobile navigation menu.
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks) {
      navLinks.classList.remove('open');
    }

    document.body.classList.remove('menu-open');

    if (menuButton) {
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
});

// Reveal sections smoothly as they enter the viewport.
const animatedElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('visible'));
}

// Expand and collapse service workflow details.
document.querySelectorAll('[data-accordion]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isOpen));
    content.classList.toggle('open', !isOpen);

    const icon = button.querySelector('i');

    if (icon) {
      icon.className = isOpen ? 'fa-solid fa-plus' : 'fa-solid fa-minus';
    }
  });
});

// Filter product cards by their selected category.
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;

    document.querySelectorAll('.product-card').forEach((card) => {
      card.classList.toggle(
        'hidden',
        filter !== 'all' && card.dataset.category !== filter
      );
    });
  });
});

// Add a floating WhatsApp contact button to every page.
const whatsappFloat = document.createElement('a');
whatsappFloat.className = 'whatsapp-float';
whatsappFloat.href = 'https://wa.me/6282171585608?text=Hello%20ZELOSBIA%20I%20would%20like%20to%20ask%20about%20your%20products%20or%20send%20an%20RFQ.';
whatsappFloat.target = '_blank';
whatsappFloat.rel = 'noopener';
whatsappFloat.setAttribute('aria-label', 'Chat with ZELOSBIA on WhatsApp');
whatsappFloat.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>';
document.body.appendChild(whatsappFloat);
