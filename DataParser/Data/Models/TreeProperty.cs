using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public partial class TreeProperty
    {
        public int Id { get; set; }
        public int TaxationYear { get; set; }
        public int Age { get; set; }
        public int? Jar { get; set; }
        public int? Pokolenie { get; set; }
        public double? HMaxKr { get; set; }
        public string FormaKrHorizontal { get; set; }
        public string FormaKrVertical { get; set; }
        public double Height { get; set; }
        public double? CrownLength { get; set; }
        public double DiametrNs { get; set; }
        public double DiametrWe { get; set; }
        public double? CrownDiametrNs { get; set; }
        public double? CrownDiametrWe { get; set; }
        public int IdSuitability { get; set; }
        public int IdCraft { get; set; }
        public int IdTree { get; set; }
        public int IdTaxationYears { get; set; }

        [JsonIgnore]
        public virtual СraftСategory IdCraftNavigation { get; set; }
        [JsonIgnore]
        public virtual TechnicalSuitability IdSuitabilityNavigation { get; set; }
        [JsonIgnore]
        public virtual Tree IdTreeNavigation { get; set; }
        [JsonIgnore]
        public virtual TaxationYears IdTaxationYearsNavigation { get; set; }

        public string CraftName
        {
            get
            {
                return IdCraftNavigation?.Name;
            }
        }

        public string SuitabilityName
        {
            get
            {
                return IdSuitabilityNavigation?.Name;
            }
        }
    }
}
