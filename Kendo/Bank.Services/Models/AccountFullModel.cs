using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bank.Services.Models
{
    [DataContract]
    public class AccountFullModel : AccountModel
    {
        [DataMember(Name = "logs")]
        public IEnumerable<LogFullModel> Logs { get; set; }
    }
}