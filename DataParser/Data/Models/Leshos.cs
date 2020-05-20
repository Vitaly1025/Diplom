using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public partial class Leshos
    {
        public Leshos()
        {
            TrialPlots = new HashSet<TrialPlot>();
        }
        public int Id { get; set; }
        public int IdForestType { get; set; }
        public string Name { get; set; }
        public string Lesnichestvo { get; set; }
        public int Kvartal { get; set; }
        public int Vydel { get; set; }
        
        public virtual ICollection<TrialPlot> TrialPlots { get; set; }
        public virtual ForestType IdForestTypeNavigation { get; set; }
    }
}
