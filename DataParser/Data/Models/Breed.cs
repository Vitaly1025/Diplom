using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public virtual ICollection<Tree> Tree { get; set; }
    }
}
