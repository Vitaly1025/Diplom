import { TreeProperty } from './../../../models/response/response.tree-property';
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
import { CreateTreePropertyRequest } from 'src/app/models/requests/create-treeproperty.request';

@Component({
  selector: 'tree-property',
  templateUrl: './tree-property.component.html',
  styleUrls: ['./tree-property.component.scss']
})
export class TreePropertyComponent implements OnInit {

  public formState$ = new BehaviorSubject<FormState>(FormState.CloseForm);
  public displayedColumns: string[] = [
    'id',
    'suitabilityName',
    'age',
    'jar',
    'pokolenie',
    'formaKrHorizontal',
    'formaKrVertical',
    'height',
    'heightNaibDiametra',
    'crownLength',
    'diametrNs',
    'diametrWe',
    'crownDiametrNs',
    'crownDiametrWe',
    'year',
    'change',
    'drop'
  ];

  EmptyValidator(control: FormControl): { [s: string]: boolean } {
    return this ? null : {};
  }
  public createRequest: CreateTreePropertyRequest = new CreateTreePropertyRequest();
  private selectedLeshosId: number = null;

  public leshosForm = new FormGroup({
    age: new FormControl(''),
    year: new FormControl(''),
    treeId: new FormControl(''),
    jar: new FormControl(''),
    pokolenie: new FormControl(''),
    height: new FormControl(''),
    heightNaibDiametra: new FormControl(''),
    crownLength: new FormControl(''),
    diametrNs: new FormControl(''),
    diametrWe: new FormControl(''),
    crowndiametrNs: new FormControl(''),
    crowndiametrWe: new FormControl(''),
    idCraft: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdCraft),
    ]),
    idSuit: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdSuitability),
    ]),
  });

  private leshosSpravochnik: BaseSpravochnik[];
  private forestTypeSpravochnik: BaseSpravochnik[];
  private selectedChangedItem = null;
  public craftOptions: Observable<string[]> = new Observable<string[]>();
  public suitOptions: Observable<string[]> = new Observable<string[]>();
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public dataSource = new MatTableDataSource<TreeProperty>();

  constructor(public api: ManageService) {
    api.GetTreeProperty();
    api.propertyAll.subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    });
    this.api.craftTypes.subscribe((resp) => {
      this.leshosSpravochnik = resp;
      this.craftOptions = this.leshosForm.controls.idCraft.valueChanges.pipe(
        startWith(''),
        map((value) => this._craftFilter(value))
      );    
    });
    this.api.suitTypes.subscribe((resp) => {
      this.forestTypeSpravochnik = resp;
      this.suitOptions = this.leshosForm.controls.idSuit.valueChanges.pipe(
        startWith(''),
        map((value) => this._suitFilter(value))
      );
    });
  }
  public OpenCreateForm() {
    this.formState$.next(FormState.OpenFormForCreate);
    this.api.GetSuit();
    this.api.GetCraft();
  }
  public CloseForm() {
    this.formState$.next(FormState.CloseForm);
    this.createRequest = new CreateTreePropertyRequest();
    this.leshosForm.reset();
  }
  public CreateItem() {
    this.createRequest.Age = this.leshosForm.controls.age.value;
    this.createRequest.Jar = this.leshosForm.controls.jar.value;
    this.createRequest.Pokolenie = this.leshosForm.controls.pokolenie.value;
    this.createRequest.Height = this.leshosForm.controls.height.value;
    this.createRequest.HeightNaibDiametra = this.leshosForm.controls.heightNaibDiametra.value;
    this.createRequest.CrownLength = this.leshosForm.controls.crownLength.value;
    this.createRequest.DiametrNs = this.leshosForm.controls.diametrNs.value;
    this.createRequest.DiametrWe = this.leshosForm.controls.diametrWe.value;
    this.createRequest.CrownDiametrNs = this.leshosForm.controls.crowndiametrNs.value;
    this.createRequest.CrownDiametrWe = this.leshosForm.controls.crowndiametrWe.value;
    this.createRequest.IdTree = this.leshosForm.controls.treeId.value;
    this.createRequest.TaxationYear = this.leshosForm.controls.year.value;
    this.api.InsertTreeProperty(this.createRequest);
  }
  public ChangeItem() {
    // this._suitFilter(this.leshosForm.controls.typeLesa.value);
    // this._craftFilter(this.leshosForm.controls.leshosName.value);
    // this._lesnichFilter(this.leshosForm.controls.lesnichName.value);
    // this.createRequest.Kvartal = this.leshosForm.controls.kvartal.value;
    // this.createRequest.Vydel = this.leshosForm.controls.vydel.value;
    // this.api.ChangeLeshos(this.selectedChangedItem, this.createRequest);
    
  }
  public DropItem(id: number) {
    // this.api.DeleteLeshos(id);
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
  private _craftFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.leshosSpravochnik
      .map((ls) => ls.chipher)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.createRequest.IdCraft = this.leshosSpravochnik.find(
        (t) => (t as any).chipher === filteredValues[0]
      ).id;
    else this.createRequest.IdCraft = this.leshosSpravochnik[0].id;
    return filteredValues;
  }

  private _suitFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.forestTypeSpravochnik
      .map((ls) => ls.name)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.createRequest.IdSuitability = this.forestTypeSpravochnik.find(
        (t) => t.name === filteredValues[0]
      ).id;
    else this.createRequest.IdSuitability = null;
    return filteredValues;
  }


}
