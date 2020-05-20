export interface Leshos {
    extendTrialPlots:       ExtendTrialPlot[];
    id:                     number;
    idForestType:           number;
    name:                   string;
    lesnichestvo:           string;
    kvartal:                number;
    vydel:                  number;
    trialPlots:             any[];
    idForestTypeNavigation: null;
}

export interface ExtendTrialPlot {
    treeCount:     number;
    breedStat:     BreedStat[];
    structureStat: StructureStat[];
    id:            number;
    number:        number;
    x:             number;
    y:             number;
    az:            number;
    length:        number;
    weight:        number;
    square:        number;
    idLeshos:      number;
}

export interface BreedStat {
    procent: number;
    breed:   string;
}

export interface StructureStat {
    taxationYear: number;
    volumeStat:   Stat;
    lengthStat:   Stat;
    ageStat:      Stat;
    polnotaStat:  Stat;
    diametrStat:  Stat;
    zapas:        number;
}

export interface Stat {
    С: number;
    Е: number;
    Б: number;
}
