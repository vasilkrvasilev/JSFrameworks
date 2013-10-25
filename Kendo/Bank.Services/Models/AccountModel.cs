using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bank.Services.Models
{
    [DataContract]
    public class AccountModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        //[DataMember(Name = "username")]
        //public string Username { get; set; }

        [DataMember(Name = "balance")]
        public decimal Balance { get; set; }

        //[DataMember(Name = "logs")]
        //public IEnumerable<LogFullModel> Logs { get; set; }
    }
}