using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Forum.Services.Models
{
    [DataContract]
    public class CommentModel
    {
        [DataMember(Name = "text")]
        public string Text { get; set; }
    }
}
