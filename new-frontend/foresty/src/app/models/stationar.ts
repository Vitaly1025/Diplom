import { ChartPoint } from 'chart.js';
export interface Plot {
    id: number;
    number: number;
    x: number;
    y: number;
    az: number;
    length: number;
    weight: number;
    square: number;
    idLeshos: number;
    tree: Tree[];
}

export interface Tree {
    id: number;
    idPlot: number;
    number: number;
    numberKvadrata: number;
    x: number;
    y: number;
    idBreed: number;
    idBreedNavigation: Breed;
    yearProperty: YearProperty[];
}

export interface Breed {
    id: number;
    name: string;
    cipher: string;
}

export interface YearProperty {
    year: number;
    treeProperty: TreeProperty;
}
export interface TreeProperty {
    id: number;
    taxationYear: number;
    age: number;
    jar: string;
    pokolenie: string;
    heightNaibDiametra: number;
    formaKrHorizontal: string;
    formaKrVertical: string;
    height: number;
    crownLength: number;
    diametrNs: number;
    diametrWe: number;
    crownDiametrNs: number;
    crownDiametrWe: number;
    idSuitability: number;
    idCraft: number;
    idTree: number;
    idTaxationYears: number;
    craftName: string;
    suitabilityName: string;
}


export class PlotInfo {
    public row: Row[];
    public kvadratCount: number;
    public id: number;
    public number: number;
    public length: number;
    public weight: number;
    public square: number;
    public idLeshos: number;
    public idTum: number;
    public idLTumNavigation: null;
    public tree: any[];


    /**
     *
     */
    constructor(object: any) {
        this.row = object.row;
        this.kvadratCount = object.kvadratCount;
        this.id = object.id;
        this.number = object.number;
        this.length = object.length;
        this.weight = object.weight;
        this.square = object.square;
        this.idLeshos = object.idLeshos;
        this.idTum = object.idTum;
        this.idLTumNavigation = object.idLTumNavigation
        this.tree = object.tree;

    }
    public get rowCount() {
        return (this.range(0, this.row.length - 1) as any).reverse();
    }
    
    public get rowLength() {
        return this.range(1, this.kvadratCount / this.row.length);
    }

    private range(start, end) {
        if (start === end) return [start];
        return [start, ...this.range(start + 1, end)];
    }
}

export interface Row {
    rowNumber: number;
    treeDict: TreeDict[];
}

export interface TreeDict {
    numberKvadrata: number;
    trees: Tree[];
}

export class BubbleChartData implements ChartPoint {
    public x: number;
    public y: number;
    public r: number;
    public treeNumber: number;
    /**
     *
     */
    constructor(x: number, y: number, r: number, treeNumber: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.treeNumber = treeNumber;
    }
}

export class LineChartData implements ChartPoint {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export enum MapType {
    BubbleCrown = 1,
    BubbleStvol,
    Right
}

export enum DependencyGraph {
    HeightDiametr = 0,
    HeightBeginKronDiametr,
    MaxDiametrDiametr
}

export enum PorodaZnach {
    Nothing = 0,
    Bereza,
    Sosna,
    El
}
