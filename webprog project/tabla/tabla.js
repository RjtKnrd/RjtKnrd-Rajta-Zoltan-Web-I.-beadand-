const form = document.getElementById('crudForm');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('searchInput');

let data = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const field1 = document.getElementById('field1').value.trim();
    const field2 = document.getElementById('field2').value.trim();
    const field3 = document.getElementById('field3').value.trim();
    const field4 = document.getElementById('field4').value.trim();

    if (validateFields(field1, field2, field3, field4)) {
        data.push({ field1, field2, field3, field4 });
        renderTable(data);
        form.reset();
    }
});

searchInput.addEventListener('input', function () {
    const term = searchInput.value.toLowerCase();
    const filteredData = data.filter(row =>
        Object.values(row).some(value => value.toLowerCase().includes(term))
    );
    renderTable(filteredData);
});

function validateFields(...fields) {
    return fields.every(field => field.length >= 2 && field.length <= 30);
}

function renderTable(dataArray) {
    tableBody.innerHTML = '';
    dataArray.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.field1}</td>
            <td>${row.field2}</td>
            <td>${row.field3}</td>
            <td>${row.field4}</td>
            <td>
                <button onclick="editRow(${index})">Szerkesztés</button>
                <button onclick="deleteRow(${index})">Törlés</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function editRow(index) {
    const item = data[index];
    document.getElementById('field1').value = item.field1;
    document.getElementById('field2').value = item.field2;
    document.getElementById('field3').value = item.field3;
    document.getElementById('field4').value = item.field4;
    deleteRow(index);
}

function deleteRow(index) {
    data.splice(index, 1);
    renderTable(data);
}