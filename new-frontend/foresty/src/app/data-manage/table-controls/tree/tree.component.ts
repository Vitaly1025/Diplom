import { TrialPlot } from './../../../models/response/response.trialplots';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormState } from 'src/app/models/form.state';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LeshosSpravochnik } from 'src/app/models/response/lesnichspravochnik';
import { BaseSpravochnik } from 'src/app/models/base.spravochnik';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CreateLeshosRequest } from 'src/app/models/requests/create-leshos.request';
import { MatTableDataSource } from '@angular/material/table';
import { ManageService } from 'src/app/services/manage.service';
import { LeshosResponse } from 'src/app/models/response/response.leshos';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { CreateTreetRequest } from 'src/app/models/requests/create-tree.request';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public formState$ = new BehaviorSubject<FormState>(FormState.CloseForm);
  public displayedColumns: string[] = [
    'id',
    'idBreedNavigation',
    'number',
    'numberKvadrata',
    'x',
    'y',
    'trialPlotNumber',
    'change',
    'drop'
  ];

  EmptyValidator(control: FormControl): { [s: string]: boolean } {
    return this ? null : {};
  }

  
  public createRequest: CreateTreetRequest = new CreateTreetRequest();
  private selectedLeshosId: number = null;
  public leshosForm = new FormGroup({
    number: new FormControl(''),
    x: new FormControl(''),
    y: new FormControl(''),
    IdPlot: new FormControl(''),
    idBreed: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdBreed),
    ]),
  });

  private leshosSpravochnik: LeshosSpravochnik[];
  private forestTypeSpravochnik: BaseSpravochnik[];
  private selectedChangedItem = null;
  public leshosOptions: Observable<string[]> = new Observable<string[]>();
  public lesnichOptions: Observable<string[]> = new Observable<string[]>();
  public breedTypeOptions: Observable<string[]> = new Observable<string[]>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public dataSource = new MatTableDataSource<any>();

  constructor(public api: ManageService) {
    api.GetTrees();
    api.treeAll.subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    });

    this.api.breedTypes.subscribe((resp) => {
      this.forestTypeSpravochnik = resp;
      this.breedTypeOptions = this.leshosForm.controls.idBreed.valueChanges.pipe(
        startWith(''),
        map((value) => this._breedTypeFilter(value))
      );
    });
  }
  public OpenCreateForm() {
    this.formState$.next(FormState.OpenFormForCreate);
    this.api.GetBreed();
  }
  public CloseForm() {
    this.formState$.next(FormState.CloseForm);
    this.createRequest = new CreateTreetRequest();
    this.leshosForm.reset();
  }
  public CreateItem() {

    this.createRequest.X = this.leshosForm.controls.x.value;
    this.createRequest.Y = this.leshosForm.controls.y.value;
    this.createRequest.IdPlot = this.leshosForm.controls.IdPlot.value;
    this.api.InsertTree(this.createRequest);
  }
  public ChangeItem() {
    this._breedTypeFilter(this.leshosForm.controls.typeLesa.value);
    // this.api.ChangeLeshos(this.selectedChangedItem, this.createRequest);
    
  }
  public DropItem(id: number) {
    this.api.DeleteLeshos(id);
  }
  public OpenEditForm(id: number) {
    this.api.GetForestTypeSpravochniki();
    this.api.GetLesnichSpravochniki();
    this.dataSource.data.forEach((el) => {
      if (el.id == id) {
        this.leshosForm.setValue({
          // leshosName: el.name,
          // kvartal: el.kvartal,
          // lesnichName: el.lesnichestvo,
          // vydel: el.vydel,
          // typeLesa: el.forestType,
        });
        this.selectedChangedItem = el.id;
      }
    });
    this.formState$.next(FormState.OpenFormForEditing);
  }
  ngOnInit() {}
  private _leshosFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.leshosSpravochnik
      .map((ls) => ls.leshosName)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.selectedLeshosId = this.leshosSpravochnik.findIndex(
        (t) => t.leshosName == filteredValues[0]
      );
    return filteredValues;
  }

  private _breedTypeFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.forestTypeSpravochnik
      .map((ls) => ls.name)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.createRequest.IdBreed = this.forestTypeSpravochnik.find(
        (t) => t.name === filteredValues[0]
      ).id;
    else this.createRequest.IdBreed = null;
    return filteredValues;
  }

}
