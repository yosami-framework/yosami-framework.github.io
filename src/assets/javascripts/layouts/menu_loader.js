(() => {
  const lang = location.pathname.split('/')[1];
  const xhr  = new XMLHttpRequest();

  xhr.open('GET', `/${lang == '_layouts' ? 'ja' : lang}/menu.json`);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const menu  = document.querySelector('#menu');
      const items = JSON.parse(xhr.responseText);

      items.forEach((item) => {
        const a = document.createElement('a');
        a.innerText = item.title;
        a.href = item.path;
        menu.appendChild(a);
      });
    }
  }
  xhr.send();
})();
