const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
}));

const filterButtons = document.querySelectorAll('.filter-button');
const workCards = document.querySelectorAll('.work-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  workCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Radar Studio enquiry — ${data.get('service')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Service: ${data.get('service')}`,
    '',
    'Project details:',
    data.get('message')
  ].join('\n');
  status.textContent = 'Your email app should open with the enquiry prepared. Review it before sending.';
  window.location.href = `mailto:peterkosi40@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
