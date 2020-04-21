export class TrialPlotCharacteristic {

  private id: number;
  private x: number;
  private y: number;
  private region: string;             // -- область
  private foresty: string;            // -- лесхоз
  private silviculture: string;       // -- лесничество
  private survey: number;             // -- выдел
  private azimuth: number;            // -- азимут
  private width: number;              // -- ширина
  private height: number;             // -- высота
  private area: number;               // -- площадь
  private snapshot_number: number;    // -- снимок №
  private section: number;            // -- квартал
  private year: number;
  private trial_plot_id: number;

  constructor(id: number, x: number, y: number, region: string, foresty: string, silviculture: string,
    survey: number, azimuth: number, width: number, height: number, area: number, snapshot_number: number, section: number, year: number, trial_plot_id: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.region = region;
    this.foresty = foresty;
    this.silviculture = silviculture;
    this.snapshot_number = snapshot_number;
    this.section = section;
    this.survey = survey;
    this.azimuth = azimuth;
    this.width = width;
    this.height = height;
    this.area = area;
    this.year = year;
    this.trial_plot_id = trial_plot_id;
  }

  get Id() {
    return this.id;
  }

  set Id(id: number) {
    this.id = id;
  }

  get X() {
    return this.x;
  }

  set X(x: number) {
    this.x = x;
  }

  get Y() {
    return this.y;
  }

  set Y(y: number) {
    this.y = y;
  }

  get Region() {
    return this.region;
  }

  set Region(region: string) {
    this.region = region;
  }

  get Foresty() {
    return this.foresty;
  }

  set Foresty(foresty: string) {
    this.foresty = foresty;
  }

  get Silviculture() {
    return this.silviculture;
  }

  set Silviculture(silviculture: string) {
    this.silviculture = silviculture;
  }

  get SnapshotNumber() {
    return this.snapshot_number;
  }

  set SnapshotNumber(snapshotNumber: number) {
    this.snapshot_number = snapshotNumber;
  }

  get Survey() {
    return this.survey;
  }

  set Survey(survey: number) {
    this.survey = survey;
  }

  get Azimuth() {
    return this.survey;
  }

  set Azimuth(azimuth: number) {
    this.azimuth = azimuth;
  }

  get Width() {
    return this.survey;
  }

  set Width(width: number) {
    this.width = width;
  }

  get Height() {
    return this.height;
  }

  set Height(height: number) {
    this.height = height;
  }

  get Area() {
    return this.area;
  }

  set Area(area: number) {
    this.area = area;
  }

  get Section() {
    return this.section;
  }

  set Section(section: number) {
    this.section = section;
  }

  get Year() {
    return this.year;
  }

  set Year(year: number) {
    this.year = year;
  }

  get Trial_plot_id() {
    return this.year;
  }

  set Trial_plot_id(trial_plot_id: number) {
    this.trial_plot_id = trial_plot_id;
  }
}
