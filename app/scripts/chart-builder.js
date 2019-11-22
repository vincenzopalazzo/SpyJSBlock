// Copyright (c) 2018-2019 Vincenzo Palazzo vicenzopalazzodev@gmail.com
// Distributed under the Apache License Version 2.0 software license,
// see https://www.apache.org/licenses/LICENSE-2.0.txt

'use strict';

var PATH_CONF = 'resources/conf/';
var PATH_RES_BEN = 'resources/benchmark/';

var BENCHMARK = ['benckmark-graphtx-json', 'scalability'];

var colors = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ],
  borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
};

class ChartBuilder{

    constructor(idCanvasTag, configurationFile, benchamarkName, typeChart, labels){
        this.chartTag = document.getElementById(idCanvasTag);
        this.nameFileConfiguration = configurationFile;
        this.typeChart = typeChart;
        this.benchamarkName = benchamarkName;
        this.labels = labels;
        this.chart = new Chart(this.chartTag, {
          type: this.typeChart,
          data: {
            labels: this.labels,
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
    }

    intChart(){
      this.readConfiguration(PATH_CONF + this.nameFileConfiguration);
    }

    readConfiguration(path){
      self = this;
      this.daoLocalFile = new DAOLocalFile();
      let configPromisse = this.daoLocalFile.loadFile(path);
      configPromisse.then(function(configData) {
          let files;
          if(self.benchamarkName == BENCHMARK[0]){
            files = configData.files;
          }else{
            files = configData.scalabilityFile;
          }
          console.debug('The files are: ' + files);
          self.readDataForBuildChart(files);
      }).catch(ex => console.error(ex));
    }

    readDataForBuildChart(filesArray){
      self = this;
      filesArray.forEach(function (fileName) {
        let filePrimisse = self.daoLocalFile.loadFile(PATH_RES_BEN + fileName);
        filePrimisse.then(function(fileData) {
          console.debug('File data contains: ' + fileData);
          self.buildChart(fileName, fileData);
        })
      });
    }

    buildChart(nameFile, fileData){
        if(this.benchamarkName === BENCHMARK[0]){
          console.debug('File benchmark: \n', fileData);
          console.log('Real time one: ', fileData.benchmarks[0].real_time / 1000000000.0);
          console.log('Real time two: ', fileData.benchmarks[1].real_time / 1000000000.0);
          let index = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
          this.updateBarGraph(nameFile.replace('.json', ''),
            colors.backgroundColor[index],
            colors.borderColor[index],
            [
              fileData.benchmarks[0].real_time / 1000000000.0,
              fileData.benchmarks[1].real_time / 1000000000.0
            ]);
          }else{
            //TODO FOR other chart
          }
        
    }

    updateBarGraph(label, color, borderColor, data) {
        this.chart.data.datasets.push({
          label: label,
          backgroundColor: color,
          borderColor: borderColor,
          data: data
        });
        this.chart.update();
      }
}
