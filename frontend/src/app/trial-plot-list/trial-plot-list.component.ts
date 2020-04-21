import { Component, OnInit } from '@angular/core';
import { TrialPlotService } from '../services/trial-plot.service';
import { TreeService } from '../services/tree.service';
import { ITree } from '../interfaces/interfaces';
import { TrialPlotCharacteristic } from '../model/trial-plot-characteristic';


@Component({
  selector: 'app-trial-plot-list',
  templateUrl: './trial-plot-list.component.html',
  styleUrls: ['./trial-plot-list.component.css']
})
export class TrialPlotListComponent implements OnInit {

  panelOpenState = false;

  trialPlotsId = [];
  trialPlotCharacteristics: TrialPlotCharacteristic[] = [];

  trees;
  numberOfTrees: number = 0;
  numberOfBusinessTrees: number = 0; //количество деловых деревьев
  numberOfWoodTrees: number = 0; //количество дровяных деревьев
  numberOfDeadTrees: number = 0; //количество целых погибших деревьев
  numberOfDeadTreesWithoutVolume: number = 0; //количество сухостоев без объема
  pines: ITree[]; //сосен
  spruces: ITree[]; //елей
  oaks: ITree[]; //дубов
  birches: ITree[]; //берез
  aspens: ITree[]; //осин
  blackAlder: ITree[]; //ольхи чёрной

  constructor(private trialPlotService: TrialPlotService, private treeService: TreeService) { }

  ngOnInit() {
    this.getTrialPlotsCharacteristics();
  }


  getTrialPlotsCharacteristics() {
    this.trialPlotService.getAllTrialPlotCharacteristics().subscribe(data => {
      debugger;
      this.trialPlotCharacteristics = JSON.parse(JSON.stringify(data));
    });
  }

  getTrees(year: number, trialPlotId: number) {
    this.treeService.getTreesByTrialPlotCharacteristicIdAndYear(year, trialPlotId).subscribe(data => {
      this.trees = <ITree>data;
      this.numberOfBusinessTrees = this.trees.filter(tree => tree.category === "деловое дерево").length; //количество деловых деревьев
      this.numberOfWoodTrees = this.trees.filter(tree => tree.category === "дровяное дерево").length; //количество дровяных деревьев
      this.numberOfDeadTrees = this.trees.filter(tree => tree.category === "целое погибшее дерево").length; //количество целых погибших деревьев
      this.numberOfDeadTreesWithoutVolume = this.trees.filter(tree => tree.category === "сухостой у которого нельзя вычислить объем").length; //количество сухостоев без объёма

      this.pines = this.trees.filter(tree => tree.species === "сосна"); //сосны
      this.spruces = this.trees.filter(tree => tree.species === "ель"); //ели
      this.oaks = this.trees.filter(tree => tree.species === "дуб"); //дубы
      this.birches = this.trees.filter(tree => tree.species === "берёза"); //берёзы
      this.aspens = this.trees.filter(tree => tree.species === "осина"); //осины
      this.blackAlder = this.trees.filter(tree => tree.species === "ольха чёрная"); //ольха чёрная
    });
  }
}
