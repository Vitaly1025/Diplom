export interface Tree {
    id:                number;
    idPlot:            number;
    number:            number;
    numberKvadrata:    number;
    x:                 number;
    y:                 number;
    idBreed:           number;
    trialPlotNumber:   number;
    idBreedNavigation: IDBreedNavigation;
    yearProperty:      any[];
}

export interface IDBreedNavigation {
    id:     number;
    name:   string;
}