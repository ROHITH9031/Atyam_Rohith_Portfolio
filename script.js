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