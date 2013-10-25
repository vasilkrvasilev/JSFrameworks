using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Forum.Models
{
    public class User
    {
        private ICollection<Post> posts;
        private ICollection<Comment> comments;

        public User()
        {
            this.posts = new HashSet<Post>();
            this.comments = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public string Username { get; set; }

        public string AuthCode { get; set; }

        public string SessionKey { get; set; }

        public virtual ICollection<Post> Posts
        {
            get { return this.posts; }
            set { this.posts = value; }
        }

        public virtual ICollection<Comment> Comments
        {
            get { return this.comments; }
            set { this.comments = value; }
        }
    }
}
