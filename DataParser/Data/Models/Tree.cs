using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Tree
    {
        public int Id { get; set; }
        public int IdPlot { get; set; }
        public int Number { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int IdBreed { get; set; }
        public int IdProperty { get; set; }

        public virtual Breed IdBreedNavigation { get; set; }
        public virtual TrialPlot IdPlotNavigation { get; set; }
        public virtual TreeProperty IdPropertyNavigation { get; set; }
    }
}
