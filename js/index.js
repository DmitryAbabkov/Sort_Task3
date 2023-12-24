import '../style.css';
import db from '../db.json';

document.addEventListener('DOMContentLoaded', () => {
  const trParent = document.querySelector('tr');
  const tdParent = trParent.querySelectorAll('td');
  const data = [...db].reverse();
  const dataSortUpId = [...data].sort((a, b) => a.id - b.id).reverse();
  const dataSortUpYear = [...data].sort((a, b) => a.year - b.year).reverse();
  const dataSortUpGrade = [...data].sort((a, b) => a.imdb - b.imdb).reverse();
  const dataSortDownId = [...data].sort((a, b) => b.id - a.id).reverse();
  const dataSortDownYear = [...data].sort((a, b) => b.year - a.year).reverse();
  const dataSortDownGrade = [...data].sort((a, b) => b.imdb - a.imdb).reverse();

  function renderData(obj) {
    obj.forEach((item) => {
      const trCreate = document.createElement('tr');
      trCreate.setAttribute('data-id', item.id);
      trCreate.setAttribute('data-title', item.title);
      trCreate.setAttribute('data-year', item.year);
      trCreate.setAttribute('data-imdb', item.imdb);
      trCreate.innerHTML = `
    <td>${item.id}</td>
    <td>${item.title}</td>
    <td>${item.year}</td>
    <td>imdb: ${item.imdb}</td>`;
      trParent.after(trCreate);
    });
  }
  renderData(data);

  function deleteData() {
    const tr = document.querySelectorAll('tr');
    tr.forEach((item) => {
      if (item.dataset.id !== 'id') {
        item.remove();
      }
    });
  }

  function arrowDefinition(title, arrow, item) {
    const res = item;
    res.innerText = title;
    res.innerText += arrow;
    return res;
  }

  let counterString = 0;

  function sortString(dataObj, item, title) {
    deleteData();
    if (counterString === 0) {
      dataObj.sort((a, b) => a.title.localeCompare(b.title)).reverse();
      renderData(dataObj);
      arrowDefinition(title, '\u{2193}', item);
      counterString += 1;
    } else {
      dataObj.sort((a, b) => a.title.localeCompare(b.title));
      renderData(dataObj);
      arrowDefinition(title, '\u{2191}', item);
      counterString -= 1;
    }
  }

  let counter = 0;

  function sortRendering(dataUp, dataDown, item, title) {
    deleteData();
    if (counter === 0) {
      renderData(dataUp);
      const arrow = '\u{2193}';
      arrowDefinition(title, arrow, item);
      counter += 1;
    } else {
      renderData(dataDown);
      const arrow = '\u{2191}';
      arrowDefinition(title, arrow, item);
      counter -= 1;
    }
  }

  tdParent.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (index === 0) sortRendering(dataSortUpId, dataSortDownId, item, 'id');
      if (index === 1) sortString(data, item, 'title');
      if (index === 2) sortRendering(dataSortUpYear, dataSortDownYear, item, 'year');
      if (index === 3) sortRendering(dataSortUpGrade, dataSortDownGrade, item, 'imdb');
    });
  });
});
