// Hamburger
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const profileImg = document.querySelector('.profile-ring .profile-img');
  const profileRing = document.querySelector('.profile-ring');
  const profileModal = document.getElementById('profileModal');
  const profileModalImg = document.getElementById('profileModalImg');
  const profileModalCloseButtons = document.querySelectorAll('[data-profile-close]');

  if (!profileImg || !profileRing) return;

  const walker = document.createTreeWalker(profileRing, NodeFilter.SHOW_COMMENT);
  while (walker.nextNode()) {
    const comment = walker.currentNode.nodeValue || '';
    const match = comment.match(/data:image\/jpeg;base64,([^"]+)/);
    if (match) {
      profileImg.src = 'data:image/jpeg;base64,' + match[1].replace(/\s+/g, '');
      break;
    }
  }

    if (profileModalImg) {
      profileModalImg.src = profileImg.src;
    }

    const openProfileModal = () => {
      if (!profileModal || !profileModalImg) return;
      profileModalImg.src = profileImg.src;
      profileModal.classList.add('open');
      profileModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('profile-modal-open');
    };

    const closeProfileModal = () => {
      if (!profileModal) return;
      profileModal.classList.remove('open');
      profileModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('profile-modal-open');
    };

    profileImg.addEventListener('click', openProfileModal);
    profileImg.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProfileModal();
      }
    });

    profileModalCloseButtons.forEach((button) => {
      button.addEventListener('click', closeProfileModal);
    });

    profileModal?.addEventListener('click', (event) => {
      if (event.target === profileModal) {
        closeProfileModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeProfileModal();
      }
    });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('section[id], div[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--white)' : '';
  });
});

// Contact form opens the user's mail app with the message prefilled.
document.getElementById('contact-form')?.addEventListener('submit', sendMsg);

function sendMsg(event) {
  if (event) event.preventDefault();

  var nameEl    = document.getElementById('name');
  var emailEl   = document.getElementById('email');
  var subjectEl = document.getElementById('subject');
  var msgEl     = document.getElementById('msg');
  var btn       = document.getElementById('send-btn');
  var successEl = document.getElementById('form-success');
  var errorEl   = document.getElementById('form-error');

  // Validation
  var valid = true;
  [nameEl, emailEl, msgEl].forEach(function(el) {
    if (!el.value.trim()) {
      el.style.borderColor = '#f87171';
      valid = false;
    }
    else el.style.borderColor = '';
  });
  if (!valid) {
    errorEl.style.display = 'block';
    errorEl.textContent = '❌ Please fill in your name, email, and message before sending.';
    return;
  }

  var name    = nameEl.value.trim();
  var email   = emailEl.value.trim();
  var subject = subjectEl.value.trim() || ('Portfolio Contact from ' + name);
  var message = msgEl.value.trim();

  btn.disabled = true;
  btn.textContent = 'Opening mail app...';
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  var body = encodeURIComponent(
    'From: ' + name + ' <' + email + '>\n\n' +
    message + '\n\n---\nSent from the portfolio contact form.'
  );
  var sub  = encodeURIComponent(subject);
  var mailtoUrl = 'mailto:atyamrohith2005@gmail.com?subject=' + sub + '&body=' + body;

  var tempLink = document.createElement('a');
  tempLink.href = mailtoUrl;
  tempLink.rel = 'noopener';
  tempLink.style.display = 'none';
  document.body.appendChild(tempLink);
  tempLink.click();
  tempLink.remove();

  successEl.style.display = 'block';
  successEl.textContent = '✅ Your mail app should open now with the message prefilled.';
  nameEl.value = '';
  emailEl.value = '';
  subjectEl.value = '';
  msgEl.value = '';
  btn.textContent = '✉ Send Message';
  btn.disabled = false;
}