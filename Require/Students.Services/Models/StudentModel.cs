using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace People.Models
{
    [DataContract]
    public class StudentModel
    {
        [DataMember(Name="id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "grade")]
        public int Grade { get; set; }

        [DataMember(Name = "marks")]
        public ICollection<MarkModel> Marks { get; set; }
    }
}