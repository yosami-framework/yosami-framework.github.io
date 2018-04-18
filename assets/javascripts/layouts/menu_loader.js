'use strict';

(function () {
  var lang = location.pathname.split('/')[1];
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/' + (lang == '_layouts' ? 'ja' : lang) + '/menu.json?' + Date.now());
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var menu = document.querySelector('#menu');
      var items = JSON.parse(xhr.responseText);

      items.forEach(function (item) {
        switch (item.type) {
          case "title":
            var h = document.createElement('h2');
            h.innerText = item.content;
            menu.appendChild(h);
            break;
          case "link":
            var a = document.createElement('a');
            a.innerText = item.name;
            a.href = item.path;
            menu.appendChild(a);
            break;
        }
      });
    }
  };
  xhr.send();
})();