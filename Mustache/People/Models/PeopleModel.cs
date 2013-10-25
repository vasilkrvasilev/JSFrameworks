using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace People.Models
{
    [DataContract]
    public class PeopleModel
    {
        [DataMember(Name="id")]
        public int Id { get; set; }

        [DataMember(Name = "fname")]
        public string FirstName { get; set; }

        [DataMember(Name = "lname")]
        public string LastName { get; set; }
        public int Age { get; set; }
        public int Grade { get; set; }

        [DataMember(Name = "marks")]
        public ICollection<MarksModel> Marks { get; set; }
    }
}