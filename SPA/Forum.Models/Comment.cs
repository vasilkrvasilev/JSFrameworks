using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Forum.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual User Creator { get; set; }

        public virtual Post Post { get; set; }
    }
}
