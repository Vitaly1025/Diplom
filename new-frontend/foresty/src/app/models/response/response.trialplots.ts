export interface TrialPlot {
    id:               number;
    number:           number;
    length:           number;
    weight:           number;
    square:           number;
    idLeshos:         number;
    idTum:            number;
    idLTumNavigation: IDLTumNavigation;
    leshosName:       string;
    tree:             any[];
}

export interface IDLTumNavigation {
    id:   number;
    name: string;
}