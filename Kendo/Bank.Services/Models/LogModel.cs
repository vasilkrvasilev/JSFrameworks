using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace Bank.Services.Models
{
    [DataContract]
    public class LogModel
    {
        [DataMember(Name = "amount")]
        public string Amount { get; set; }
    }
}
