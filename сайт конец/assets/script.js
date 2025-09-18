
document.addEventListener('DOMContentLoaded', function(){
  // AOS init (loaded via CDN in pages)
  if(window.AOS) AOS.init({duration:700,once:true,offset:80});

  // Modal handling for bank open buttons
  document.querySelectorAll('.open-account').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const bank = this.dataset.bank || this.getAttribute('data-bank') || 'Банк';
      const modal = document.getElementById('ref-modal');
      modal.querySelector('.modal-title').textContent = 'Открыть счёт — ' + bank;
      const code = Math.random().toString(36).slice(2,10);
      modal.querySelector('#ref-link').value = `https://partner.example.com/ref?bank=${encodeURIComponent(bank)}&code=${code}`;
      modal.classList.add('show');
    });
  });

  // Close modal
  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el=>{
    el.addEventListener('click', function(e){
      if(e.target !== this) return;
      document.querySelector('.modal-backdrop.show')?.classList.remove('show');
    });
  });

  document.querySelectorAll('.copy-ref').forEach(btn=>{
    btn.addEventListener('click', function(){
      const input = document.getElementById('ref-link');
      input.select();
      try{
        navigator.clipboard.writeText(input.value);
        btn.textContent = 'Скопировано!';
        setTimeout(()=>btn.textContent='Скопировать ссылку',1500);
      }catch(e){
        input.select();
        document.execCommand('copy');
        btn.textContent = 'Скопировано!';
        setTimeout(()=>btn.textContent='Скопировать ссылку',1500);
      }
    });
  });

  // Close modal on Esc
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape') document.querySelector('.modal-backdrop.show')?.classList.remove('show');
  });
});
