const weddingDate = new Date('2026-11-21T16:00:00-06:00');
const two = value => String(value).padStart(2, '0');

function updateCountdown() {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  document.querySelector('#days').textContent = String(Math.floor(distance / 86400000)).padStart(3, '0');
  document.querySelector('#hours').textContent = two(Math.floor(distance / 3600000) % 24);
  document.querySelector('#minutes').textContent = two(Math.floor(distance / 60000) % 60);
  document.querySelector('#seconds').textContent = two(Math.floor(distance / 1000) % 60);
}

document.querySelector('#openInvite').addEventListener('click', () => {
  document.querySelector('#opening').classList.add('hidden');
  document.body.classList.remove('locked');
  setTimeout(() => document.querySelector('#opening').remove(), 800);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

function downloadCalendar() {
  const content = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Elena y Mateo//Boda//ES','BEGIN:VEVENT','UID:elena-mateo-2026@example.com','DTSTAMP:20260810T120000Z','DTSTART:20261121T220000Z','DTEND:20261122T060000Z','SUMMARY:Boda de Elena y Mateo','LOCATION:Hacienda La Esperanza, El Marqués, Querétaro','DESCRIPTION:¡Nos vemos para celebrar!','END:VEVENT','END:VCALENDAR'].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([content], { type: 'text/calendar' }));
  link.download = 'boda-elena-mateo.ics'; link.click(); URL.revokeObjectURL(link.href);
}
document.querySelectorAll('.calendar-btn').forEach(button => button.addEventListener('click', downloadCalendar));

document.querySelector('#bankButton').addEventListener('click', () => {
  const panel = document.querySelector('#bankDetails');
  panel.classList.toggle('visible');
  document.querySelector('#bankButton b').textContent = panel.classList.contains('visible') ? '−' : '+';
});

document.querySelector('#rsvpForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  localStorage.setItem('boda-elena-mateo-rsvp', JSON.stringify({ ...data, submittedAt: new Date().toISOString() }));
  document.querySelector('#thanks').classList.add('visible');
});
document.querySelector('#closeThanks').addEventListener('click', () => document.querySelector('#thanks').classList.remove('visible'));

updateCountdown(); setInterval(updateCountdown, 1000);
