using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class TreeProperty
    {
        public TreeProperty()
        {
            Tree = new HashSet<Tree>();
        }

        public int Id { get; set; }
        public int TaxationYear { get; set; }
        public int Age { get; set; }
        public double Height { get; set; }
        public double? CrownLength { get; set; }
        public double DiametrNs { get; set; }
        public double DiametrWe { get; set; }
        public double? CrownDiametrNs { get; set; }
        public double? CrownDiametrWe { get; set; }
        public int IdSuitability { get; set; }
        public int IdCraft { get; set; }

        public virtual СraftСategory IdCraftNavigation { get; set; }
        public virtual TechnicalSuitability IdSuitabilityNavigation { get; set; }
        public virtual ICollection<Tree> Tree { get; set; }
    }
}
