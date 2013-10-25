using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Forum.Models
{
    public class Post
    {
        private ICollection<Tag> tags;
        private ICollection<Comment> comments;

        public Post()
        {
            this.tags = new HashSet<Tag>();
            this.comments = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual User Creator { get; set; }

        public virtual ICollection<Tag> Tags
        {
            get { return this.tags; }
            set { this.tags = value; }
        }

        public virtual ICollection<Comment> Comments
        {
            get { return this.comments; }
            set { this.comments = value; }
        }
    }
}
