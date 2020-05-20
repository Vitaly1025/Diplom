using Data.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public partial class TrialPlot
    {
        public TrialPlot()
        {
            Tree = new HashSet<Tree>();
        }

        public int Id { get; set; }
        public int Number { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Az { get; set; }
        public double Length { get; set; }
        public int Weight { get; set; }
        public double Square { get; set; }
        public int IdLeshos { get; set; } 

        [JsonIgnore]
        public virtual Leshos IdLeshosTypeNavigation { get; set; }
        public virtual ICollection<Tree> Tree { get; set; }

    }
}
