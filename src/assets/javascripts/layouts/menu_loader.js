(() => {
  const lang = location.pathname.split('/')[1];
  const xhr  = new XMLHttpRequest();

  xhr.open('GET', `/${lang == '_layouts' ? 'ja' : lang}/menu.json?${Date.now()}`);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const menu  = document.querySelector('#menu');
      const items = JSON.parse(xhr.responseText);

      items.forEach((item) => {
        switch(item.type) {
        case "title":
          const h = document.createElement('h2');
          h.innerText = item.content;
          menu.appendChild(h);
          break;
        case "link":
          const a = document.createElement('a');
          a.innerText = item.name;
          a.href = item.path;
          menu.appendChild(a);
          break;
        }
      });
    }
  }
  xhr.send();
})();
