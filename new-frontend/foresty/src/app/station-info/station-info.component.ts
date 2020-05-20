import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { StationarService } from '../services/stationar.service';
import { Plot, Tree } from '../models/stationar';
import { Observable, Subject } from 'rxjs';
import { ChartType, ChartOptions } from 'chart.js';
import { MapType } from '../models/stationar';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-station-info',
  templateUrl: './station-info.component.html',
  styleUrls: ['./station-info.component.scss'],
})
export class StationInfoComponent implements OnInit {
  private leshosId: number;
  private plotNumber: number;
  public plotInfo$ = new Observable<Plot>();
  public treeInfo$ = new Observable<Tree>();
  public bubbleChartType: ChartType = 'bubble';
  public mapType: MapType = 1;
  public treeNumber$ = new Subject<number>();


  public bubbleChartOptions: ChartOptions = {
    animation: {
      onComplete: function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
        var height = chartInstance.controller.boxes[0].bottom;
        ctx.textAlign = "center";
        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          Chart.helpers.each(meta.data.forEach(function (bar, index) {
            debugger;
            ctx.fillText(dataset.data[index].treeNumber, bar._model.x, bar._model.y);
          }),this)
        }),this);
      }
    },
    onClick: function(e, array) {
      var element = array[0];
      if(element)
        this.next(element._chart.config.data.datasets[element._datasetIndex].data[element._index].treeNumber)
    }.bind(this.treeNumber$),
    plugins: {
      datalabels: {
          anchor: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.x < 1000 ? 'end' : 'center';
          },
          align: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.x < 1000 ? 'end' : 'center';
          },
          color: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value.x < 1000 ? context.dataset.backgroundColor : 'white';
          },
          font: {
              weight: 'bold'
          },
          formatter: function (value, context) {
              return context.dataset.label;
          },
          offset: 2,
          padding: 0
      }
    },
    responsive: true,
    legend: {
      display: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            stepSize: 5,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 5,
          },
        },
      ],
    },
  };

  constructor(private route: ActivatedRoute, private api: StationarService) {
    this.leshosId = +route.snapshot.params.id;
    this.plotNumber = +route.snapshot.params.number;
    api.GetPlotInfo(this.leshosId, this.plotNumber);
    this.plotInfo$ = api.plotInfo;
    this.treeInfo$ = api.treeInfo;
    this.treeNumber$.subscribe((treeNumber) =>{
      api.GetTreeInfo(this.leshosId, this.plotNumber, treeNumber);
    })
  }

  ngOnInit() {}
}
