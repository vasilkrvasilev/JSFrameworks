using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bank.Services.Models
{
    [DataContract]
    public class UserAccountModel
    {
        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "accounts")]
        public IEnumerable<AccountModel> Accounts { get; set; }
    }
}