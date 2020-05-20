using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Models
{
    public class Privyazka
    {
        public int Id { get; set; }
        public int IdPlot { get; set; }
        public int Number { get; set; }
        public double Az { get; set; }
        public int L { get; set; }
        public virtual TrialPlot IdPlotNavigation { get; set; }
    }
}
