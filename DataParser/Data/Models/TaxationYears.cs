using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public class TaxationYears
    {
        public TaxationYears()
        {
            TreeProperties = new HashSet<TreeProperty>();
        }
        public int Id { get; set; }
        public int Year { get; set; }
        [JsonIgnore]
        public virtual ICollection<TreeProperty> TreeProperties { get; set; }
    }
}