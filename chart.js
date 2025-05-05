document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("data-table");
  const ctx = document.getElementById("chart").getContext("2d");
  let chart;

  const rows = 5;
  const cols = 5;
  const dataMatrix = [];

  function generateTable() {
    for (let i = 0; i < rows; i++) {
      const tr = document.createElement("tr");
      const rowData = [];
      for (let j = 0; j < cols; j++) {
        const num = Math.floor(Math.random() * 100);
        rowData.push(num);
        const td = document.createElement("td");
        td.textContent = num;
        tr.appendChild(td);
      }
      dataMatrix.push(rowData);
      tr.dataset.index = i;
      tr.addEventListener("click", () => drawChart(rowData, i));
      table.appendChild(tr);
    }
  }

  function drawChart(data, index) {
    const labels = data.map((_, i) => `#${i + 1}`);
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `Sor #${index + 1}`,
            data,
            borderColor: "#007bff",
            fill: false
          }
        ]
      }
    });
  }

  generateTable();
});
