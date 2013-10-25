using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Bank.Models
{
    public class Account
    {
        private ICollection<Log> logs;

        public Account()
        {
            this.logs = new HashSet<Log>();
        }

        public int Id { get; set; }

        public decimal Balance { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<Log> Logs
        {
            get { return this.logs; }
            set { this.logs = value; }
        }
    }
}
