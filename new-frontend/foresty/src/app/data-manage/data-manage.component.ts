import { BaseSpravochnik } from './../models/base.spravochnik';
import { LeshosSpravochnik } from './../models/response/lesnichspravochnik';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { LeshosResponse } from './../models/response/response.leshos';
import { ManageService } from './../services/manage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormState } from '../models/form.state';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CreateLeshosRequest } from '../models/requests/create-leshos.request';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.scss'],
})
export class DataManageComponent implements OnInit {
  public formState$ = new BehaviorSubject<FormState>(FormState.CloseForm);
  public displayedColumns: string[] = [
    'id',
    'name',
    'lesnichestvo',
    'kvartal',
    'vydel',
    'forestType',
    'change',
    'drop',
  ];

  EmptyValidator(control: FormControl): { [s: string]: boolean } {
    return this ? null : {};
  }
  public createRequest: CreateLeshosRequest = new CreateLeshosRequest();
  private selectedLeshosId: number = null;
  public leshosForm = new FormGroup({
    leshosName: new FormControl(''),
    kvartal: new FormControl(''),
    lesnichName: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdLesnichSpravochnik),
    ]),
    vydel: new FormControl(''),
    typeLesa: new FormControl('', [
      Validators.required,
      this.EmptyValidator.bind(this.createRequest.IdForestType),
    ]),
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
  public dataSource = new MatTableDataSource<LeshosResponse>();

  constructor(public api: ManageService) {
    api.GetAllLeshozes();
    api.leshosAll.subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
    this.api.lesnichSpravochniki.subscribe((resp) => {
      this.leshosSpravochnik = resp;
      this.leshosOptions = this.leshosForm.controls.leshosName.valueChanges.pipe(
        startWith(''),
        map((value) => this._leshosFilter(value))
      );
      this.lesnichOptions = this.leshosForm.controls.lesnichName.valueChanges.pipe(
        startWith(''),
        map((value) => this._lesnichFilter(value))
      );
    });
    this.api.forestTypes.subscribe((resp) => {
      this.forestTypeSpravochnik = resp;
      this.forestTypeOptions = this.leshosForm.controls.typeLesa.valueChanges.pipe(
        startWith(''),
        map((value) => this._forestTypeFilter(value))
      );
    });
  }
  public OpenCreateForm() {
    this.formState$.next(FormState.OpenFormForCreate);
    this.api.GetForestTypeSpravochniki();
    this.api.GetLesnichSpravochniki();
  }
  public CloseForm() {
    this.formState$.next(FormState.CloseForm);
    this.createRequest = new CreateLeshosRequest();
    this.leshosForm.reset();
  }
  public CreateItem() {
    this.createRequest.Kvartal = this.leshosForm.controls.kvartal.value;
    this.createRequest.Vydel = this.leshosForm.controls.vydel.value;
    this.api.InsertLeshos(this.createRequest);
  }
  public ChangeItem() {
    this._forestTypeFilter(this.leshosForm.controls.typeLesa.value);
    this._leshosFilter(this.leshosForm.controls.leshosName.value);
    this._lesnichFilter(this.leshosForm.controls.lesnichName.value);
    this.createRequest.Kvartal = this.leshosForm.controls.kvartal.value;
    this.createRequest.Vydel = this.leshosForm.controls.vydel.value;
    this.api.ChangeLeshos(this.selectedChangedItem, this.createRequest);
    
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
          leshosName: el.name,
          kvartal: el.kvartal,
          lesnichName: el.lesnichestvo,
          vydel: el.vydel,
          typeLesa: el.forestType,
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

  private _forestTypeFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    let filteredValues = this.forestTypeSpravochnik
      .map((ls) => ls.name)
      .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    if (filteredValues.length === 1)
      this.createRequest.IdForestType = this.forestTypeSpravochnik.find(
        (t) => t.name === filteredValues[0]
      ).id;
    else this.createRequest.IdForestType = null;
    return filteredValues;
  }

  private _lesnichFilter(value: string): string[] {
    if (value === null) {
      return [''];
    }
    const filterValue = value.toLowerCase();
    if (this.selectedLeshosId) {
      let filteredValues = this.leshosSpravochnik[
        this.selectedLeshosId
      ].lesnichSpravochniks
        .map((ls) => ls.lesnichName)
        .filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
      if (filteredValues.length == 1)
        this.createRequest.IdLesnichSpravochnik = this.leshosSpravochnik[
          this.selectedLeshosId
        ].lesnichSpravochniks.find(
          (t) => t.lesnichName === filteredValues[0]
        ).id;
      else this.createRequest.IdLesnichSpravochnik = null;
      return filteredValues;
    } else {
      return [''];
    }
  }
}
