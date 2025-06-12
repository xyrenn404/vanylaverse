const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.closeBtn');
const backBtn = document.querySelector('.btn-back');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');

fetch('produk.json')
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('productList');
    if (!productList) return;
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.shortDesc}</p>
        <button class="openModalBtn"
          data-title="${product.title}"
          data-price="${product.price}"
          data-desc="${product.desc}"
          data-img="${product.img}">Cek Harga</button>
      `;
      productList.appendChild(card);
    });
    document.querySelectorAll('.openModalBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalTitle.textContent = btn.getAttribute('data-title');
        modalPrice.textContent = btn.getAttribute('data-price');
        modalDesc.innerHTML = btn.getAttribute('data-desc');
        modalImg.src = btn.getAttribute('data-img');
        modal.setAttribute('tabindex', '-1');
        modal.focus();
      });
    });
  });

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

backBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
  }
});

fetch('faq.json')
  .then(response => response.json())
  .then(faqs => {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;
    faqs.forEach(item => {
      const faqItem = document.createElement('div');
      faqItem.classList.add('faq-item');
      faqItem.innerHTML = `
        <button class="faq-question">
          ${item.question}
          <span class="faq-toggle">+</span>
        </button>
        <div class="faq-answer">${item.answer}</div>
      `;
      faqContainer.appendChild(faqItem);
    });
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        document.querySelectorAll('.faq-question').forEach(q => {
          q.classList.remove('active');
          q.nextElementSibling.style.display = 'none';
        });
        if (!isActive) {
          btn.classList.add('active');
          btn.nextElementSibling.style.display = 'block';
        }
      });
    });
  })
  .catch(error => {
    console.error('Gagal memuat FAQ:', error);
  });