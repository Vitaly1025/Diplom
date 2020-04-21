using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class СraftСategory
    {
        public СraftСategory()
        {
            TreeProperty = new HashSet<TreeProperty>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Chipher { get; set; }

        public virtual ICollection<TreeProperty> TreeProperty { get; set; }
    }
}
