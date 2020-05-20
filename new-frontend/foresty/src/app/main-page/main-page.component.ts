import { Leshos } from './../models/general';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
  public leshozes$ = new Observable<Leshos[]>();

  constructor(api: MainService) { 
    api.getAllLeshozes();
    this.leshozes$ = api.leshozesList;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  };
  public barChartOptions: ChartOptions = {
    animation: {
      onComplete: function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
        var height = chartInstance.controller.boxes[0].bottom;
        ctx.textAlign = "center";
        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          Chart.helpers.each(meta.data.forEach(function (bar, index) {
            ctx.fillText(dataset.data[index], (bar._model.base + (bar._model.x - bar._model.base || 0 ) / 2), height - ((height - bar._model.y) / 2));
          }),this)
        }),this);
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: 'white'
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
        xAxes: [{
            display: false,
            scaleLabel:{
                display: false
            },
            gridLines: {
              display: false
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                zeroLineWidth: 1
            },
            stacked: true
        }]
    }
};


  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'horizontalBar';
  public pieChartLegend = true;

  ngOnInit() {
  }

}
