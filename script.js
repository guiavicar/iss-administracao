/* ISS Administração — interações do site */

// WhatsApp da ISS: (61) 99435-7462 — formato internacional, só dígitos.
// Se o número mudar, atualize aqui e nos links wa.me do index.html.
const WHATSAPP = '5561994357462';

/* --- header fixo ------------------------------------------------------ */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* --- menu mobile ------------------------------------------------------ */
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');

const closeNav = () => {
  nav.classList.remove('is-open');
  toggle.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeNav());

/* --- animação de entrada ---------------------------------------------- */
const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px' }
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

/* --- máscara simples de telefone -------------------------------------- */
const tel = document.getElementById('telefone');

tel.addEventListener('input', () => {
  const d = tel.value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) tel.value = d;
  else if (d.length <= 6) tel.value = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  else if (d.length <= 10) tel.value = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  else tel.value = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
});

/* --- formulário: envia a mensagem pelo WhatsApp ----------------------- */
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const texto = [
    'Olá, ISS Administração!',
    '',
    `Nome: ${data.get('nome')}`,
    `Telefone: ${data.get('telefone')}`,
    `E-mail: ${data.get('email')}`,
    `Serviço: ${data.get('servico')}`,
    '',
    data.get('mensagem') || 'Gostaria de receber uma proposta.',
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
});

/* --- ano no rodapé ---------------------------------------------------- */
document.getElementById('ano').textContent = new Date().getFullYear();
