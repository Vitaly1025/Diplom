
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationarService } from 'src/app/services/stationar.service';
import { Observable } from 'rxjs';
import { ChartOptions, ChartType } from 'chart.js';
import { MapType, PlotInfo } from '../models/stationar';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  public mapType: MapType = 2;
  public plot$ = new Observable<PlotInfo>();
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'white'
      }
    },
    scales: {
      xAxes: [
        {
          // display: false,
        },
      ],
      yAxes: [
        {
          // display: false
        },
      ],
    },
  };
  constructor(private route: ActivatedRoute, private api: StationarService) {
    api.GetSeparetedPlotInfo(+route.snapshot.params.id,+route.snapshot.params.number);
    this.plot$ = api.separatedplotInfo;

    this.plot$.subscribe((r)=>{
      console.log(r);
    });
  }
  ngOnInit() {
  }

}
