using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Bank.Services.Models
{
    [DataContract]
    public class LogFullModel : LogModel
    {
        [DataMember(Name = "date")]
        public DateTime Date { get; set; }
    }
}
