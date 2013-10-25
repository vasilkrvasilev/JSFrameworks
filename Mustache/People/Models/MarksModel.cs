using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace People.Models
{
    [DataContract]
    public class MarksModel
    {
        [DataMember(Name = "subject")]
        public string Subject { get; set; }

        [DataMember(Name = "score")]
        public int Score { get; set; }
    }
}