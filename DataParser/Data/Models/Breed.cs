using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Breed
    {
        public Breed()
        {
            Tree = new HashSet<Tree>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Cipher { get; set; }

        public virtual ICollection<Tree> Tree { get; set; }
    }
}
