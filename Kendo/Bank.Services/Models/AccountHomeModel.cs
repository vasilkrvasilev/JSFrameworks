using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Bank.Services.Models
{
    [DataContract]
    public class AccountHomeModel
    {
        [DataMember(Name = "numberAccounts")]
        public int NumberAccounts { get; set; }

        [DataMember(Name = "balanceAccounts")]
        public decimal BalanceAccounts { get; set; }
    }
}