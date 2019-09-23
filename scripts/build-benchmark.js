let rootPath = 'resources/';
let load = false;
let colors = {
  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
};
let containerChart = document.getElementById('benchmark-chart').getContext('2d');
var chartBenchmark = new Chart(containerChart, {
  type: 'bar',
  data: {
    labels: ['Graph Transactions', 'JSON'],
  },
  borderWidth: 2,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

function readResourcesFileFetch(pathFile) {
  return fetch(pathFile, {
    method: 'GET',
    // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer'
  }).then(response => response.json());
}

function readAllBenchmarkFetch() {
  let configuration = readResourcesFileFetch(rootPath + 'conf/benchmark-conf.json');
  configuration.then(function (confFile) {
    console.log(confFile);
    let files = confFile.files;

    for (let i = 0; i < files.length; i++) {
      console.debug('Road this file: ' + files[i]);
      let singleBenchmark = readResourcesFileFetch(rootPath + 'benchmark/' + files[i].toString());
      singleBenchmark.then(function (fileBenchmark) {
        console.debug('File benchmark: \n' + files[i] + ' with data\n', fileBenchmark);
        console.log('Real time one: ', fileBenchmark.benchmarks[0].real_time / 1000000000.0);
        console.log('Real time two: ', fileBenchmark.benchmarks[1].real_time / 1000000000.0);
        updateBarGraph(chartBenchmark, files[i].replace('.json', ''), colors.backgroundColor[i], colors.borderColor[i], [fileBenchmark.benchmarks[0].real_time / 1000000000.0, fileBenchmark.benchmarks[1].real_time / 1000000000.0]);
      });
    }
  });
}
/*Function to update the bar chart*/


function updateBarGraph(chart, label, color, borderColor, data) {
  chart.data.datasets.push({
    label: label,
    backgroundColor: color,
    borderColor: borderColor,
    data: data
  });
  chart.update();
}

function buildBenchmark() {
  if (load === true) {
    return;
  }

  readAllBenchmarkFetch();
  load = true;
}
//# sourceMappingURL=build-benchmark.js.map
