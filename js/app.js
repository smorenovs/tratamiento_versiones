/* app.js — lógica principal de la presentación */

/* ── Login ──────────────────────────────────────────────────── */
const USERS = { pablo: 'Vs999*', adrian: 'Vs999*', santiago: 'Vs999*' };

function doLogin() {
  const user = document.getElementById('login-user').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;
  const err  = document.getElementById('login-error');
  if (USERS[user] && USERS[user] === pass) {
    const screen = document.getElementById('login-screen');
    screen.classList.add('hidden');
    setTimeout(() => screen.remove(), 400);
  } else {
    err.classList.add('show');
    document.getElementById('login-pass').value = '';
    document.getElementById('login-pass').focus();
  }
}

/* ── Tabs (scoped al .tabs-container más cercano) ───────────── */
function switchTab(e, id) {
  const container = e.currentTarget.closest('.tabs-container');
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById(id).classList.add('active');
}

/* ── Page switcher ──────────────────────────────────────────── */
const PAGE_MAP = { informe: 'translateX(0)', gitlab: 'translateX(-100%)', ejemplos: 'translateX(-200%)', priorizacion: 'translateX(-300%)' };
document.querySelectorAll('.ps-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.pages-row').style.transform =
      PAGE_MAP[btn.dataset.page] || 'translateX(0)';
    document.querySelectorAll('.ps-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Modal: Problemas Críticos ──────────────────────────────── */
const modalProblemas = document.getElementById('modal-problemas');
document.getElementById('kpi-problemas').addEventListener('click', () => {
  modalProblemas.hidden = false;
});
document.getElementById('modal-close-problemas').addEventListener('click', () => {
  modalProblemas.hidden = true;
});
modalProblemas.addEventListener('click', e => {
  if (e.target === modalProblemas) modalProblemas.hidden = true;
});

/* ── Modal: Caso de Uso de Tarea ────────────────────────────── */
const modalTarea = document.getElementById('modal-tarea');

function complejidadIcon(c) {
  if (c === 'Alta')  return '🔴';
  if (c === 'Media') return '🟡';
  return '🟢';
}

function tipoBadgeClass(tipo) {
  return 'tipo-' + tipo.toLowerCase();
}

function openTareaModal(taskId) {
  const t = COMPRAS_TASKS.find(t => t.id === taskId);
  if (!t) return;

  document.getElementById('mt-titulo').textContent = `TAREA ${t.id} — ${t.tema}`;

  document.getElementById('mt-badges').innerHTML =
    `<span class="split-tag tag-modulo">${t.modulo}</span>` +
    `<span class="tipo-badge ${tipoBadgeClass(t.tipo)}">${t.tipo}</span>` +
    `<span class="split-tag tag-epica">${t.cliente}</span>` +
    `<span class="split-tag tag-media">${complejidadIcon(t.complejidad)} ${t.complejidad}</span>`;

  document.getElementById('mt-hu').textContent = t.hu;

  document.getElementById('mt-caso').innerHTML =
    `<tr><td>Actor</td><td>${t.actor}</td></tr>` +
    `<tr><td>Precondición</td><td>${t.precondicion}</td></tr>` +
    `<tr><td>Flujo normal</td><td>${t.flujo}</td></tr>` +
    `<tr><td>Flujo alternativo</td><td>${t.alternativo || '—'}</td></tr>` +
    `<tr><td>Postcondición</td><td>${t.postcondicion}</td></tr>` +
    `<tr><td>Excepción</td><td>${t.excepcion || '—'}</td></tr>`;

  document.getElementById('mt-criterios').innerHTML =
    t.criterios.map(c => `<li>${c}</li>`).join('');

  modalTarea.hidden = false;
  modalTarea.scrollTop = 0;
}

document.querySelectorAll('.task-table tr[data-task-id]').forEach(row => {
  row.addEventListener('click', () => openTareaModal(+row.dataset.taskId));
});
document.getElementById('modal-close-tarea').addEventListener('click', () => {
  modalTarea.hidden = true;
});
modalTarea.addEventListener('click', e => {
  if (e.target === modalTarea) modalTarea.hidden = true;
});

/* ── ESC cierra cualquier modal abierto ─────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalProblemas.hidden = true;
    modalTarea.hidden = true;
  }
});

/* ── Progress bars (IntersectionObserver) ───────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  ['login-user', 'login-pass'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });

  document.querySelectorAll('.subcat-bar[data-w]').forEach(b => {
    b.style.width = b.dataset.w;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.subcat-bar').forEach(bar => {
          const w = bar.dataset.w;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = w; }, 80);
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.subcats').forEach(s => observer.observe(s));

  lucide.createIcons();
});
