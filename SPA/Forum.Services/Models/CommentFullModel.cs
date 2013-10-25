using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Forum.Services.Models
{
    [DataContract]
    public class CommentFullModel : CommentModel
    {
        [DataMember(Name = "createdOn")]
        public DateTime CreatedOn { get; set; }

        [DataMember(Name = "creator")]
        public string Creator { get; set; }
    }
}
