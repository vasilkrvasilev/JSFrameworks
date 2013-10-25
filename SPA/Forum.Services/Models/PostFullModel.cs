using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Forum.Services.Models
{
    [DataContract]
    public class PostFullModel : PostModel
    {
        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "comments")]
        public IEnumerable<CommentModel> Comments { get; set; }
    }
}