using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank.Models
{
    public class User
    {
        private ICollection<Account> accounts;

        public User()
        {
            this.accounts = new HashSet<Account>();
        }

        public int Id { get; set; }

        public string Username { get; set; }

        public string AuthCode { get; set; }

        public string SessionKey { get; set; }

        public virtual ICollection<Account> Accounts
        {
            get { return this.accounts; }
            set { this.accounts = value; }
        }
    }
}
