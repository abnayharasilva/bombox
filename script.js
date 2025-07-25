document.addEventListener("DOMContentLoaded", function () {
  // 📱 Menu Mobile
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => nav?.classList.toggle("active"));

  // ✨ AOS
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // 🎬 Controle de galeria
  const slideIndices = {}; // Armazena índice por galeria

  // 📸 Abrir galeria
  window.abrirGaleria = function (servico) {
    document.querySelectorAll('.galeria').forEach(g => g.classList.remove('ativa'));
    const galeria = document.getElementById(`galeria-${servico}`);
    if (!galeria) return;
    galeria.classList.add('ativa');
    slideIndices[servico] = 0;
    mostrarSlide(servico);
  };

  // 🔒 Fechar galeria
  window.fecharGaleria = function (servico) {
    document.getElementById(`galeria-${servico}`)?.classList.remove('ativa');
  };

  // 👁️ Mostrar slide atual
  function mostrarSlide(servico) {
    const slides = document.querySelectorAll(`#galeria-${servico} .slide`);
    slides.forEach(s => s.classList.remove('ativo'));
    if (slides.length) {
      slides[slideIndices[servico]]?.classList.add('ativo');
    }
  }

  // 🔀 Mudar slide
  window.mudarSlide = function (direcao) {
    const galeria = document.querySelector('.galeria.ativa');
    if (!galeria) return;

    const servico = galeria.id.replace('galeria-', '');
    const slides = galeria.querySelectorAll('.slide');
    if (!slides.length) return;

    slideIndices[servico] = (slideIndices[servico] + direcao + slides.length) % slides.length;
    mostrarSlide(servico);
  };

  // 🚫 Impedir clique no slider de fechar galeria
  document.querySelectorAll('.galeria .slider').forEach(slide => {
    slide.addEventListener('click', e => e.stopPropagation());
  });

  // ➡️⬅️ Controle das setas
  document.querySelectorAll('.seta-direita, .seta-esquerda').forEach(seta => {
    seta.addEventListener('click', e => {
      e.stopPropagation();
      const direcao = seta.classList.contains('seta-direita') ? 1 : -1;
      mudarSlide(direcao);
    });
  });

  // 🖱️ Clique no fundo escuro para fechar
  document.querySelectorAll('.galeria').forEach(galeria => {
    galeria.addEventListener('click', e => {
      if (e.target === galeria) galeria.classList.remove('ativa');
    });
  });

  // ⎋ ESC para fechar todas
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.galeria').forEach(g => g.classList.remove('ativa'));
    }
  });

  // 🔄 Botão "Ver mais"
  document.querySelectorAll('.btn.ver-mais').forEach(botao => {
    botao.addEventListener('click', () => {
      const card = botao.closest('.card');
      card?.classList.toggle('mostrando');
      botao.textContent = card?.classList.contains('mostrando') ? 'Ver menos' : 'Ver mais';
    });
  });
});
