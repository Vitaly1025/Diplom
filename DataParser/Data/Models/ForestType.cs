using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ForestType
    {
        public ForestType()
        {
            Years = new HashSet<Years>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Cipher { get; set; }

        public virtual ICollection<Years> Years { get; set; }
    }
}
