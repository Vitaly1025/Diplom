using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ForestType
    {
        public ForestType()
        {
            Leshos = new HashSet<Leshos>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Cipher { get; set; }

        public virtual ICollection<Leshos> Leshos { get; set; }
    }
}
