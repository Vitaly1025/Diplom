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
import { CreateTrialPlotRequest } from 'src/app/models/requests/create-trialplot.request';
@Component({
  selector: 'trialplot',
  templateUrl: './trialplot.component.html',
  styleUrls: ['./trialplot.component.scss']
})
export class TrialplotComponent implements OnInit {

  public formState$ = new BehaviorSubject<FormState>(FormState.CloseForm);
  public displayedColumns: string[] = [
    'id',
    'number',
    'length',
    'weight',
    'leshosName',
    'tumName',
    'change',
    'drop'
  ];

  EmptyValidator(control: FormControl): { [s: string]: boolean } {
    return this ? null : {};
  }
  public createRequest: CreateTrialPlotRequest = new CreateTrialPlotRequest();
  private selectedLeshosId: number = null;
  public leshosForm = new FormGroup({
    number: new FormControl(''),
    length: new FormControl(''),
    weight: new FormControl(''),
    idLeshos: new FormControl(''),
    tum: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdTum),
    ])
  });

  private leshosSpravochnik: LeshosSpravochnik[];
  private forestTypeSpravochnik: BaseSpravochnik[];
  private selectedChangedItem = null;
  public leshosOptions: Observable<string[]> = new Observable<string[]>();
  public lesnichOptions: Observable<string[]> = new Observable<string[]>();
  public forestTypeOptions: Observable<string[]> = new Observable<string[]>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public dataSource = new MatTableDataSource<TrialPlot>();

  constructor(public api: ManageService) {
    api.GetTrialPlots();
    api.trialPlotAll.subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
    this.api.tumSP.subscribe((resp) => {
      this.forestTypeSpravochnik = resp;
      this.forestTypeOptions = this.leshosForm.controls.tum.valueChanges.pipe(
        startWith(''),
        map((value) => this._tumFilter(value))
      );
    });
  }
  public OpenCreateForm() {
    this.formState$.next(FormState.OpenFormForCreate);
    this.api.GetTum();
  }
  public CloseForm() {
    this.formState$.next(FormState.CloseForm);
    this.createRequest = new CreateTrialPlotRequest();
    this.leshosForm.reset();
  }
  public CreateItem() {
    this.createRequest.Length = +this.leshosForm.controls.length.value;
    this.createRequest.Weight = +this.leshosForm.controls.weight.value;
    this.createRequest.Number = +this.leshosForm.controls.number.value;
    this.createRequest.IdLeshos = +this.leshosForm.controls.idLeshos.value;
    this.api.InsertTrialPlot(this.createRequest);
  }
  public ChangeItem() {
    this._tumFilter(this.leshosForm.controls.typeLesa.value);
    this._leshosFilter(this.leshosForm.controls.leshosName.value);
    this.createRequest.Length = this.leshosForm.controls.length.value;
    this.createRequest.Weight = this.leshosForm.controls.weight.value;
    this.createRequest.Number = this.leshosForm.controls.weight.value;
    // this.api.ChangeLeshos(this.selectedChangedItem, this.createRequest);
    
  }
  public DropItem(id: number) {
    this.api.DeleteLeshos(id);
  }
  public OpenEditForm(id: number) {
    this.api.GetTum();
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

  private _tumFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.forestTypeSpravochnik
      .map((ls) => ls.name)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.createRequest.IdTum = this.forestTypeSpravochnik.find(
        (t) => t.name === filteredValues[0]
      ).id;
    else this.createRequest.IdTum = null;
    return filteredValues;
  }
}
