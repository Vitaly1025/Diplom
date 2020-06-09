import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../services/main.service';
import { StationarService } from '../services/stationar.service';
import { Plot, Tree, PorodaZnach } from '../models/stationar';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ChartType, ChartOptions } from 'chart.js';
import { MapType } from '../models/stationar';
import * as Chart from 'chart.js';
import * as regression from 'regression';

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
  public scatterChartType: ChartType = 'scatter';
  public mapType: MapType = 1;

  public dependencyBreed$ = new BehaviorSubject<PorodaZnach>(0);
  public treeNumber$ = new Subject<number>();

  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      onComplete: function () {
        var chartInstance = this.chart;
        var ctx = chartInstance.ctx;
        var height = chartInstance.controller.boxes[0].bottom;
        ctx.textAlign = "center";
        Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          var data = dataset.data.map(t => {
              let b = [];
              b.push(t.x ? +t.x : 0, t.y ? +t.y : 0);
              return b;
          });
      
          var dataInCanvasCoordinates = meta.data.map(t => {
            let b = [];
            b.push(isNaN(t._model.x) ? 0 : +t._model.x, isNaN(t._model.y) ? 0 : +t._model.y );
            return b
        }); 
          var arrCoordinat = [];
          dataInCanvasCoordinates.forEach(element => {
            arrCoordinat.push(element);
          });

          var arr = [];
          data.forEach(element => {
            arr.push(element);
          });

          var funcCoordinates = regression.polynomial(arrCoordinat, { order: 2, precision: 40 });
          var func =            regression.polynomial(arr, { order: 2, precision: 40 });
          
          var xMax = chartInstance.boxes[2].right;
          var currentX = 0;
          var step = 10;
          var arr = [];
          while(xMax > currentX){
            arrCoordinat.push(new Object({ x: currentX, y: funcCoordinates.equation[0]*Math.pow(currentX,2) + funcCoordinates.equation[1] * currentX + funcCoordinates.equation[2] }));
            currentX += step;
          }
          ctx.moveTo(chartInstance.boxes[3].right, chartInstance.boxes[3].bottom);
          ctx.lineJoin = 'round';
          ctx.beginPath();
          arrCoordinat.forEach((point) => {
              ctx.lineTo(point.x,point.y);
          });
  
          ctx.stroke();
          ctx.font = "20px Arial";
          ctx.fillStyle = "white"
          ctx.fillText(`R= ${func.r2.toFixed(4)}`, chartInstance.boxes[2].right - 150, chartInstance.boxes[2].bottom - 80);
          ctx.fillText(`y= ${func.equation[0].toFixed(4)}x² ${func.equation[1] > 0 ? '+'+func.equation[1].toFixed(4): func.equation[1].toFixed(4)}x ${func.equation[2] > 0 ? '+'+func.equation[2].toFixed(4): func.equation[2].toFixed(4)}`, chartInstance.boxes[2].right - 150, chartInstance.boxes[2].bottom - 50);
        }),this);
      }
    },
    legend: {
      labels: {
        fontColor: 'white'
      }
    }
  }
 
  public PrintWindow(){
      let str = `${location.origin}/print/${this.leshosId}/${this.plotNumber}`;
      console.log(str);
      window.open(str,'_blank');
  }

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
      display: true,
      labels: {
        fontColor: 'white'
      }
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


  public ChangeDependency(event){
      this.dependencyBreed$.next(+event.value);
  }

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
