using Data.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public partial class Tree
    {
        public Tree()
        {
            TreeProperties = new HashSet<TreeProperty>();
        }
        public int Id { get; set; }
        public int IdPlot { get; set; }
        public int Number { get; set; }
        public int NumberKvadrata { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int IdBreed { get; set; }

        public virtual Breed IdBreedNavigation { get; set; }
        [JsonIgnore]
        public virtual TrialPlot IdPlotNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<TreeProperty> TreeProperties { get; set; }

        public List<object> YearProperty
        {
            get
            {
                var list = new List<object>();
                var group = TreeProperties?.GroupBy(tp => tp.IdTaxationYearsNavigation.Year);
                foreach (var item in group)
                {
                    list.Add((object)new PropertyByYear() { Year = item.Key, TreeProperty = item.SingleOrDefault() });
                }
                return list;
            }
        }
    }
}
