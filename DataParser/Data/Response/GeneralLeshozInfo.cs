using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace Data.Response
{
    public class GeneralLeshozInfo : Leshos
    {
        public GeneralLeshozInfo(Leshos leshos)
        {
            base.Id = leshos.Id;
            base.IdForestTypeNavigation = leshos.IdForestTypeNavigation;
            base.Kvartal = leshos.Kvartal;
            base.Lesnichestvo = leshos.Lesnichestvo;
            base.Name = leshos.Name;
            base.Vydel = leshos.Vydel;
            ExtendTrialPlots = leshos.TrialPlots.Select(tp => new ExtendTrialPlots(tp)).ToList();
        }
        public new ICollection<ExtendTrialPlots> ExtendTrialPlots { get; set; }
    }
    public class ExtendTrialPlots : TrialPlot
    {
        public ExtendTrialPlots(TrialPlot plot)
        {
            base.Az = plot.Az;
            base.Weight = plot.Weight;
            base.Id = plot.Id;
            base.IdLeshosTypeNavigation = plot.IdLeshosTypeNavigation;
            base.Length = plot.Length;
            base.Number = plot.Number;
            base.Square = plot.Square;
            Trees = plot.Tree.Select(t => new ExtendTree(t)).ToList();
            base.X = plot.X;
            base.Y = plot.Y;
        }
        public ICollection<ExtendTree> Trees;

        #region Agregate Properties

        public double Square
        {
            get
            {
                return Length * Weight;
            }
        }
        public int TreeCount
        {
            get
            {
                return Trees.Count;
            }
        }

        public List<object> BreedStat
        {
            get
            {
                return Trees.GroupBy(p => p.IdBreedNavigation)
                       .Select(g => (object)new { Procent = Convert.ToDouble(((double)(g.Count() * 100) / (double)TreeCount).ToString("N2")), Breed = g.Key?.Name }).ToList();
            }

        }

        public List<StructureStatistic> StructureStat
        {
            get
            {
                List<StructureStatistic> stat = new List<StructureStatistic>();
                List<ExtendTreeProperty> properties = new List<ExtendTreeProperty>();
                foreach (var tree in Trees)
                {
                    properties.AddRange(tree.extendTreeProperties.ToList());
                }
                var taxationYears = properties.GroupBy(p => p.Year).ToList();
                foreach (var treeProperty in taxationYears)
                {
                    StructureStatistic yearStat = new StructureStatistic();
                    yearStat.TaxationYear = treeProperty.Key;
                    var breedStat = treeProperty.GroupBy(tp => tp.IdTreeNavigation.IdBreedNavigation.Cipher).ToList();
                    foreach (var prop in breedStat)
                    {
                        yearStat.VolumeStat.Add(prop.Key, prop.Sum(p => p.Volume));
                        yearStat.LengthStat.Add(prop.Key, prop.Average(p => p.TreeLength));
                        yearStat.AgeStat.Add(prop.Key, prop.Average(p => p.Age));
                        yearStat.SechenStat.Add(prop.Key, prop.Sum(p => p.Sechen));
                        yearStat.DiametrStat.Add(prop.Key, prop.Average(p => p.AvgDiametr));
                    }
                    stat.Add(yearStat);
                }

                return stat;
            }
        }


        #endregion
    }
    public class ExtendTree : Tree
    {
        public ExtendTree(Tree tree)
        {
            base.X = tree.X;
            base.Y = tree.Y;
            base.Number = tree.Number;
            base.Id = tree.Id;
            base.IdBreedNavigation = tree.IdBreedNavigation;
            extendTreeProperties = tree.TreeProperties.Select(tp => new ExtendTreeProperty(tp)).ToList();
        }
        public List<ExtendTreeProperty> extendTreeProperties { get; set; }

    }
    public class ExtendTreeProperty : TreeProperty
    {
        public ExtendTreeProperty(TreeProperty treeProperty)
        {
            base.Age = treeProperty.Age;
            base.CrownDiametrNs = treeProperty.CrownDiametrNs;
            base.CrownDiametrWe = treeProperty.CrownDiametrWe;
            base.CrownLength = treeProperty.CrownLength;
            base.DiametrNs = treeProperty.DiametrNs;
            base.DiametrWe = treeProperty.DiametrWe;
            base.IdTaxationYearsNavigation = treeProperty.IdTaxationYearsNavigation;
            base.IdTreeNavigation = treeProperty.IdTreeNavigation;
            Year = treeProperty.IdTaxationYearsNavigation.Year;
        }
        public new int Year { get; set; }

        public double AvgDiametr
        {
            get
            {
                return (double)(base.DiametrNs + base.DiametrWe) / 2;
            }
        }
        public double Sechen
        {
            get
            {
                return Math.Pow(AvgDiametr, 2) * 3.14 / 40000;
            }
        }
        public double Volume
        {
            get
            {
                switch (this.IdTreeNavigation.IdBreedNavigation.Cipher)
                {
                    case "с":
                        return CalculateVollume(0.734917);
                    case "е":
                        return CalculateVollume(0.637832);
                    case "б":
                        return CalculateVollume(0.697597);
                    default:
                        return CalculateVollume(0.610513);
                }
            }
        }
        public double TreeLength
        {
            get
            {
                switch (this.IdTreeNavigation.IdBreedNavigation.Cipher)
                {
                    case "с":
                        return (double)((base.CrownLength ?? 0 * 10) /  7);
                    case "е":
                        return (double)((base.CrownLength ?? 0 * 10) / 3);
                    case "б":
                        return (double)((base.CrownLength ?? 0 * 10) / 3);
                    default:
                        return (double)((base.CrownLength ?? 0 * 10) / 3);
                }
            }
        }
        private double CalculateVollume(double taxValue)
        {
            return TreeLength * taxValue * Sechen;
        }
    }
    public class StructureStatistic
    {
        public int TaxationYear { get; set; }
        public Dictionary<string, double> VolumeStat { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, double> SechenStat { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, double> LengthStat { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, double> DiametrStat { get; set; } = new Dictionary<string, double>();
        public Dictionary<string, double> AgeStat { get; set; } = new Dictionary<string, double>();

        public Dictionary<string, double> PolnotaStat
        {
            get
            {
                Dictionary<string, double> values = new Dictionary<string, double>();
                foreach (var item in SechenStat)
                {
                    values.Add(item.Key,(double)(item.Value / CountEtalonSechen(item.Key, LengthStat[item.Key])));
                }
                return values;
            }
        }

        private double CountEtalonSechen(string breed, double height)
        {

            switch (breed)
            {
                case "С":
                    return (double)-0.0055 * Math.Pow(height, 2) + (double)0.5696 * height + 32.683;
                case "Е":
                    return (double)-0.0229 * Math.Pow(height, 2) + (double)1.3789 * height + 29.659;
                case "Б":
                    return (double)-0.0047 * Math.Pow(height, 2) + (double)0.8893 * height + 21.131;
                default:
                    return 1;
            }
        }

        public double Zapas
        {
            get
            {
                return this.VolumeStat.Sum(r => r.Value);
            }
        }

    }

}