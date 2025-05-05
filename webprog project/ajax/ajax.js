const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "ILAC1Sxyz123"; // Neptun + saját kód

function readData() {
  fetch(`${API_URL}?op=read&code=${CODE}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("data");
      const summary = document.getElementById("summary");
      container.innerHTML = "";

      let heights = [];

      data.list.forEach(item => {
        heights.push(parseFloat(item.height));
        container.innerHTML += `<div class="record">ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</div>`;
      });

      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);
      summary.innerHTML = `Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
    });
}

function createData() {
  const name = document.getElementById("cname").value.trim();
  const height = document.getElementById("cheight").value.trim();
  const weight = document.getElementById("cweight").value.trim();
  const msg = document.getElementById("create-msg");

  if (!name || !height || !weight || name.length > 30) {
    msg.innerText = "Hibás bemenet";
    return;
  }

  const form = new URLSearchParams({ op: "create", code: CODE, name, height, weight });
  fetch(API_URL, { method: "POST", body: form })
    .then(res => res.text())
    .then(result => msg.innerText = `Válasz: ${result}`);
}

function getDataForId() {
  const id = document.getElementById("uid").value.trim();
  fetch(`${API_URL}?op=read&code=${CODE}`)
    .then(res => res.json())
    .then(data => {
      const item = data.list.find(r => r.id === id);
      if (item) {
        document.getElementById("uname").value = item.name;
        document.getElementById("uheight").value = item.height;
        document.getElementById("uweight").value = item.weight;
      }
    });
}

function updateData() {
  const id = document.getElementById("uid").value.trim();
  const name = document.getElementById("uname").value.trim();
  const height = document.getElementById("uheight").value.trim();
  const weight = document.getElementById("uweight").value.trim();
  const msg = document.getElementById("update-msg");

  if (!id || !name || !height || !weight || name.length > 30) {
    msg.innerText = "Hibás bemenet";
    return;
  }

  const form = new URLSearchParams({ op: "update", code: CODE, id, name, height, weight });
  fetch(API_URL, { method: "POST", body: form })
    .then(res => res.text())
    .then(result => msg.innerText = `Válasz: ${result}`);
}

function deleteData() {
  const id = document.getElementById("did").value.trim();
  const msg = document.getElementById("delete-msg");
  if (!id) {
    msg.innerText = "ID mező üres";
    return;
  }

  const form = new URLSearchParams({ op: "delete", code: CODE, id });
  fetch(API_URL, { method: "POST", body: form })
    .then(res => res.text())
    .then(result => msg.innerText = `Válasz: ${result}`);
}
