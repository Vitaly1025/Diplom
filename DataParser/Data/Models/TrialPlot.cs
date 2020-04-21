using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TrialPlot
    {
        public TrialPlot()
        {
            Tree = new HashSet<Tree>();
            Years = new HashSet<Years>();
        }

        public int Id { get; set; }
        public int Number { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Az { get; set; }
        public double Length { get; set; }
        public int Weight { get; set; }
        public double Square { get; set; }

        public virtual ICollection<Tree> Tree { get; set; }
        public virtual ICollection<Years> Years { get; set; }
    }
}
