using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Years
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int IdForestType { get; set; }
        public int IdPlot { get; set; }
        public string Leshoz { get; set; }
        public string Lesnichestvo { get; set; }
        public int Kvartal { get; set; }
        public int Vydel { get; set; }

        public virtual ForestType IdForestTypeNavigation { get; set; }
        public virtual TrialPlot IdPlotNavigation { get; set; }
    }
}
