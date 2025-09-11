import fs from "node:fs";

// JSON 読み込み
const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

// 粒度を決める（ビン幅）
const binSize = 10; // 10 ごとにまとめる
const binCount = Math.ceil(1001 / binSize);
const counts = Array(binCount).fill(0);

// 集計
for (const num of data) {
  const binIndex = Math.floor(num / binSize);
  counts[binIndex]++;
}

// ラベル作成（例: "0-9", "10-19", ...）
const labels = Array.from({ length: binCount }, (_, i) => {
  const start = i * binSize;
  const end = start + binSize - 1;
  return `${start}-${end}`;
});

// HTML 出力
const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <canvas id="hist"></canvas>
  <script>
    const ctx = document.getElementById('hist');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(labels)},
        datasets: [{
          label: 'Frequency',
          data: ${JSON.stringify(counts)},
        }]
      },
      options: { 
        scales: { 
          x: { title: { display: true, text: "Value Ranges" } },
          y: { title: { display: true, text: "Count" } }
        } 
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync("histogram.html", html);
console.log("histogram.html をブラウザで開いてください");
