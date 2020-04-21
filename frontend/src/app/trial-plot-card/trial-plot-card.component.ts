import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { TrialPlotService } from '../services/trial-plot.service';
import { TreeService } from '../services/tree.service';
import { MappingService } from '../services/mapping.service';
import { ActivatedRoute } from '@angular/router';

import Chart from 'chart.js';
import { UIChart } from 'primeng/components/chart/chart';
import { ViewChild } from '@angular/core';
import { Map } from '../model/map';
import { MatTabChangeEvent } from '@angular/material';
import { ITree, ITreeGraph } from '../interfaces/interfaces';

@Component({
  selector: 'app-trial-plot-card',
  templateUrl: './trial-plot-card.component.html',
  styleUrls: ['./trial-plot-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrialPlotCardComponent implements OnInit {

  private trees: ITree[] = [];
  tree: ITree;
  private trialPlotId: number;
  private year: number;
  private areaTrialPlot;
  private characteristicId;

  treeSperciesInformation: { name: string, k: number, avgAge: number, avgTrunkH: number, avgBoreDiameter: number, N: number, sumOfTheAreasOfSections: number, avgCrownDiameter: number, fullness: number, stock: number, avgLengthCrown: number }[] = [];
  private numberOfTrees: number = 0;
  private numberOfBusinessTrees: number = 0; //количество деловых деревьев
  private numberOfWoodTrees: number = 0; //количество дровяных деревьев
  private numberOfDeadTrees: number = 0; //количество целых погибших деревьев
  private numberOfDeadTreesWithoutVolume: number = 0; //количество сухостоев без объема
  generalN: number = 0;
  generalStock: number = 0;
  generalSumOfTheAreasOfSections: number = 0;
  private generalFullness: number = 0;
  private pines: ITree[]; //сосен
  private spruces: ITree[]; //елей
  private oaks: ITree[]; //дубов
  private birches: ITree[]; //берез
  private aspens: ITree[]; //осин
  private blackAlder: ITree[]; //ольхи чёрной

  private selectedTabIndex;
  displayMap: boolean = false;
  displayGraph: boolean = false;
  displayTable: boolean = false;
  displayHeader: boolean = true;
  showMatTab: boolean = true;
  private allCharacteristicsTrialPlot;

  width = 94;
  height = 220;
  xMax;
  yMax: number;

  //////////Map/////////////////
  @ViewChild("mapChart") mapChart: UIChart;

  dataOfMap;
  optionsOfMap;
  private bores: Map[] = [];
  private crownes: Map[] = [];
  crownesJSON;
  // private tree;
  displayTree: boolean = false;

  //////////Graph/////////////////
  @ViewChild("graphChart") graphChart: UIChart;
  dataOfGraph: any;
  optionsOfGraph: any;
  private regression: { x: number, y: number }[] = [];

  private coordinatesOfTrees: ITreeGraph[] = [];

  constructor(private route: ActivatedRoute, private trialPlotService: TrialPlotService, private mappingService: MappingService,
    private treeService: TreeService) {
    this.trialPlotId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getAllCharacteristicsByTrialPlotId();
  }

  showTable(index) {
    this.selectedTabIndex = index;
    this.displayTable = true;
    this.showMatTab = false;
    this.displayMap = false;
    this.displayHeader = false;
  }

  showMap(id: number, index) {
    this.selectedTabIndex = index;
    this.getTreeCoordinatesWithBoreDiameterByTrialPlotCharacteristicId(id);
    this.getTreeCoordinatesWithCrownDiameterByTrialPlotCharacteristicId(id);
    this.displayMap = true;
    this.showMatTab = false;
    this.displayHeader = false;
  }

  showGraph(option: number, index?) {
     this.selectedTabIndex = index;
    this.coordinatesOfTrees.length = 0;
    this.regression.length = 0;
    if (option == 1) {
      this.getCharacteristicsForGraph(this.characteristicId, "heightAndAverageDiameterTrunkTreesByTrialPlotCharacteristicId/", "График зависимости h-ствола от его диаметра", "высота ствола, м");
    }
    if (option == 2) {
      this.getCharacteristicsForGraph(this.characteristicId, "diameterTrunkAndDiameterCroneTreesByTrialPlotCharacteristicId/", "График зависимости d-кроны от d-ствола", "диаметр кроны, м");
    }
    if (option == 3) {
      this.getCharacteristicsForGraph(this.characteristicId, "diameterTrunkAndLengthCroneTreesByTrialPlotCharacteristicId/", "График зависимости протяженности кроны от d-ствола", "протяженность кроны, %");
    }
    this.displayGraph = true;
    this.showMatTab = false;
    this.displayHeader = false;
  }

  closeMap() {
    this.bores.length = 0;
    this.crownes.length = 0;
    this.mapChart.reinit();
    this.displayTree = false;
    this.showMatTab = true;
    this.displayHeader = true;
  }

  closeGraph() {
    this.coordinatesOfTrees.length = 0;
    this.regression.length = 0;
    this.showMatTab = true;
    this.graphChart.reinit();
    this.displayHeader = true;
  }

  closeTable() {
    this.showMatTab = true;
    this.displayHeader = true;
  }

  getAllCharacteristicsByTrialPlotId() {
    this.trialPlotService.getAllCharacteristicsByTrialPlotId(this.trialPlotId).subscribe(data => {
      this.allCharacteristicsTrialPlot = data;
    });
  }

  mapSizeCalculation() {
    //for (let i = 0; i < this.crownes.length; i++) {
    //  if (this.xMax < this.crownes.) {

    //  }
    //}
    //this.xMax = this.crownes.reduce(function (prev, current) {
    //  return (prev.X > current.X) ? prev : current
    //});
    //this.yMax = this.crownes.reduce(function (prev, current) {
    //  return (prev.Y > current.Y) ? prev : current
    //});

    //console.log(this.crownes);
    //console.log(this.xMax);
    //console.log(this.yMax);

    this.xMax = this.crownes.reduce((a, b) => a.x > b.x ? a : b).x;
    this.yMax = this.crownes.reduce((a, b) => a.y > b.y ? a : b).y;
    this.width = this.xMax * 1.5;
    this.height = this.yMax * 3.38;
  }

  setDataForMap() {
    this.dataOfMap = {
      labels: "Координаты",
      datasets:
        [
          {
            label: ["Ствол"],
            backgroundColor: "rgba(73,65,53,0.2)",
            borderColor: "rgba(91,79,50,1)",
            hoverRadius: 3,
            data: this.bores
          },
          {
            label: ["Крона"],
            backgroundColor: "rgba(60,186,159,0.2)",
            borderColor: "rgba(60,186,159,1)",
            hoverRadius: 3,
            hoverBackgroundColor: "rgba(60,186,159,0.6)",
            data: this.crownes
          }
        ]
    },
      this.optionsOfMap = {
        tooltips: {
          enabled: false
        },
        animation: false,
        title: {
          display: true,
          text: 'Кликните по дереву для просмотра инфомации о нём'
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 5
            },
            scaleLabel: {
              display: true,
              labelString: "Y",
              position: 'left'
            }
          }],
          xAxes: [{
            ticks: {
              stepSize: 5
            },
            scaleLabel: {
              display: true,
              labelString: "X",
              position: 'bottom'
            }
          }]
        }
      }
  }

  setDataForGraph(title: string, label: string) {
    this.dataOfGraph = {
      datasets: [{
        label: '',
        data: this.regression,
        borderColor: 'red',
        pointRadius: 0.5,
        showLine: true,
        fill: false
      },
        {
          label: '',
          data: this.coordinatesOfTrees,
          borderColor: 'black',
          pointRadius: 1.5,
          showLine: false,
          fill: false
        }
      ]
    },
      this.optionsOfGraph = {
        tooltips: { enabled: false },
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: title
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: label,
              position: 'left'
            },
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "диаметр ствола, см",
              position: 'bottom'
            },
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }]
        }
      }
  }

  tabClick($event) {
    var object = this.allCharacteristicsTrialPlot[$event.index];
    var keys = Object.keys(object);
    var values = Object.values(object);
    this.areaTrialPlot = values[8];
    this.characteristicId = values[0];
    this.getTrees(values[11]);
    this.treeSperciesInformation.length = 0;
  }

  showTreeInfo(event: any) {
    this.displayTree = true;
    var id = this.trees[event.element._index].id;
    this.treeService.getTree(id).subscribe(data => {
      this.tree = this.buildTree(data[0]['id'], data[0]['tree_number'], data[0]['x'], data[0]['y'], data[0]['species'], data[0]['age'], data[0]['trunk_diameter_ns'], data[0]['trunk_diameter_we'], data[0]['trunk_height'], data[0]['crown_diameter_ns'], data[0]['crown_diameter_we'], data[0]['crown_length'], data[0]['category']);
    });
  }

  buildTree(id: number, tree_number: number, x: number, y: number, species: string, age: number, trunk_diameter_ns: number, trunk_diameter_we: number, trunk_height: number, crown_diameter_ns: number, crown_diameter_we: number, crown_length: number, category: string): ITree {
    var avr_trunk_diameter = this.truncated((trunk_diameter_ns + trunk_diameter_we) / 2, 2);
    var avr_crown_diameter = this.truncated((crown_diameter_ns + crown_diameter_we) / 2, 2);
    var trunk_volume = 0;
    var k = 0;

    if (species === "сосна") { k = 0.734917; }
    if (species === "ель") { k = 0.637832; }
    if (species === "дуб") { k = 0.661652; }
    if (species === "берёза") { k = 0.697597; }
    if (species === "осина") { k = 0.610513; }
    if (species === "ольха чёрная") { k = 0.724094; }

    trunk_volume = this.volume_calulation(avr_trunk_diameter, trunk_height, k);
    return { id: id, tree_number: tree_number, x: x, y: y, species: species, age: age, average_trunk_diameter: avr_trunk_diameter, trunk_height: trunk_height, trunk_volume: trunk_volume, average_crown_diameter: avr_crown_diameter, crown_length: crown_length, category: category };
  }

  volume_calulation(D: number, H: number, k: number) {
    return this.truncated((0.0000785398163 * D * D) * H ** (2 * k + 1) / ((2 * k + 1) * (H - 1.3) ** (2 * k)), 4);
  }

  truncated(num, decimalPlaces) {
    var numPowerConverter = Math.pow(10, decimalPlaces);
    return ~~(num * numPowerConverter) / numPowerConverter;
  }

  getTrees(year) {
    this.treeService.getTreesByTrialPlotCharacteristicIdAndYear(year, this.trialPlotId).subscribe(data => {
      this.trees = <ITree[]>data;
      this.numberOfBusinessTrees = this.trees.filter(tree => tree.category === "деловое дерево").length; //количество деловых деревьев
      this.numberOfWoodTrees = this.trees.filter(tree => tree.category === "дровяное дерево").length; //количество дровяных деревьев
      this.numberOfDeadTrees = this.trees.filter(tree => tree.category === "целое погибшее дерево").length; //количество целых погибших деревьев
      this.numberOfDeadTreesWithoutVolume = this.trees.filter(tree => tree.category === "сухостой у которого нельзя вычислить объем").length; //количество сухостоев без объёма
      
      this.pines = this.trees.filter(tree => tree.species === "сосна");
      this.speciesDataCalculation("Сосна", this.pines, 0.734917, 0.0016, -0.1274, 3.5964, 3.4709);

      this.spruces = this.trees.filter(tree => tree.species === "ель");
      this.speciesDataCalculation("Ель", this.spruces, 0.637832, 0.0008, -0.0826, 3.3437, -0.6896);

      this.oaks = this.trees.filter(tree => tree.species === "дуб");
      this.speciesDataCalculation("Дуб", this.oaks, 0.661652, 0.0003, -0.0387, 2.0145, 3.8245);

      this.birches = this.trees.filter(tree => tree.species === "берёза");
      this.speciesDataCalculation("Берёза", this.birches, 0.697597, 0.0003, -0.0248, 1.4938, 6.0969);

      this.aspens = this.trees.filter(tree => tree.species === "осина");
      this.speciesDataCalculation("Осина", this.aspens, 0.610513, 0.0006, -0.0567, 2.4333, 0.5828);

      this.blackAlder = this.trees.filter(tree => tree.species === "ольха чёрная");
      this.speciesDataCalculation("Ольха чёрная", this.blackAlder, 0.724094, 0.0009, -0.0762, 2.6573, 0.06479);

      this.generalSpeciesCalculation();
    });
  }

  generalSpeciesCalculation() {
    let initialValue = 0;
    this.generalN = this.truncated(this.treeSperciesInformation.reduce((a, currentValue) => a + currentValue.N, initialValue), 2);
    this.generalStock = this.truncated(this.treeSperciesInformation.reduce((a, currentValue) => a + currentValue.stock, initialValue), 2);
    this.generalSumOfTheAreasOfSections = this.truncated(this.treeSperciesInformation.reduce((a, currentValue) => + a + currentValue.sumOfTheAreasOfSections, initialValue), 2);
    this.generalFullness = this.truncated(this.treeSperciesInformation.reduce((a, currentValue) => a + currentValue.fullness, initialValue), 6);
  }

  getTreeCoordinatesWithBoreDiameterByTrialPlotCharacteristicId(id: number) {
    this.mappingService.getTreeCoordinatesWithBoreDiameterByTrialPlotCharacteristicId(id).subscribe(data => {
      for (let item of data) {
        this.bores.push(item);
      }
      this.setDataForMap();
      this.mapChart.refresh();
    }
    )
  }

  getTreeCoordinatesWithCrownDiameterByTrialPlotCharacteristicId(id: number) {
    this.mappingService.getTreeCoordinatesWithCrownDiameterByTrialPlotCharacteristicId(id).subscribe(data => {
      for (let item of data) {
        this.crownes.push(item);
      }
      this.setDataForMap();
      this.mapChart.refresh();
      this.mapSizeCalculation();
    }
    );
  }

  buildTreeGraph(f: number, s: number): ITreeGraph {
    var x = f;
    var y = s;
    return { x: x, y: y };
  }

  getCharacteristicsForGraph(id: number, path: string, title: string, label: string) {
    this.treeService.getDataTreesForGraph(id, path).subscribe(data => {
      var x: number[] = [];
      var y: number[] = [];
      for (let item of <ITreeGraph[]>data) {
        if (item.x != 0 && item.y != 0) {
          var tree = this.buildTreeGraph(item.y, item.x);
          x.push(item.x);
          y.push(item.y);
          this.coordinatesOfTrees.push(tree);
        }
      }

      this.regressionCalculation(y, x);

      this.setDataForGraph(title, label);
      this.graphChart.refresh();
    })
  }

  regressionCalculation(values_x, values_y) { //поиск регрессии по методу наименьших квадратов
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
      throw new Error('The parameters values_x and values_y need to have same size!');
    }

    if (values_length === 0) {
      return [[], []];
    }

    for (var v = 0; v < values_length; v++) {
      x = values_x[v];
      y = values_y[v];
      sum_x += x;
      sum_y += y;
      sum_xx += x * x;
      sum_xy += x * y;
      count++;
    }

    /*
    * y = x * m + b
    */
    var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    var b = (sum_y / count) - (m * sum_x) / count;

    for (var v = 0; v < values_length; v++) {
      x = values_x[v];
      y = x * m + b;

      this.regression.push({x: values_x[v], y: y});
    
    }
  }

  speciesDataCalculation(name: string, species, kOfSpecies, fullnessA, fullnessB, fullnessC, fullnessD) {
    if (species.length != 0) {

      let initialValue = 0;
      let k, avgAge, avgTrunkH, avgBoreDiameter, N, sumOfTheAreasOfSections, avgCrownDiameter, fullness, stock, avgLengthCrown, sumVolumes, Gh;

      k = this.truncated((species.length * 10) / this.trees.length, 2);
      avgAge = this.truncated(species.reduce((a, currentValue) => a + currentValue.age, initialValue) / species.length, 2);
      avgTrunkH = this.truncated(species.reduce((a, currentValue) => a + currentValue.trunk_height, initialValue) / species.length, 2);
      N = this.truncated((species.length * 1) / this.areaTrialPlot, 0);
      sumOfTheAreasOfSections = this.truncated(((species.reduce((a, currentValue) => a + 3.14*(currentValue.average_trunk_diameter * currentValue.average_trunk_diameter)/40000, initialValue))) / this.areaTrialPlot, 2);
      avgBoreDiameter = this.truncated(200 * Math.sqrt(sumOfTheAreasOfSections / (species.length * 3.14)), 2);
      avgCrownDiameter = this.truncated(species.reduce((a, currentValue) => a + currentValue.average_crown_diameter, initialValue) / species.length, 2);
      Gh = species.reduce((a, currentValue) => a + this.fullnessSpeciesCalculation(currentValue.trunk_height, fullnessA, fullnessB, fullnessC, fullnessD), initialValue);
      fullness = this.truncated(sumOfTheAreasOfSections / Gh, 6);
      sumVolumes = species.reduce((a, currentValue) => a + this.volume_calulation(currentValue.average_trunk_diameter, currentValue.trunk_height, kOfSpecies), initialValue);
      stock = this.truncated(sumVolumes / this.areaTrialPlot, 2);
      avgLengthCrown = this.truncated(species.reduce((a, currentValue) => a + currentValue.crown_length, initialValue) / species.length, 2);
      this.treeSperciesInformation.push({ name: name, k: k, avgAge: avgAge, avgTrunkH: avgTrunkH, avgBoreDiameter: avgBoreDiameter, N: N, sumOfTheAreasOfSections: sumOfTheAreasOfSections, avgCrownDiameter: avgCrownDiameter, fullness: fullness, stock: stock, avgLengthCrown: avgLengthCrown });
    }
  }

  fullnessSpeciesCalculation(h: number, a: number, b: number, c: number, d) {
    let Gh;
    Gh = a * (h ** 3) + b * (h ** 2) + c * h + h;
    return Gh;
  }
}
