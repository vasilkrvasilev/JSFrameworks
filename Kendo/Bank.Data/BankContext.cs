using Bank.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank.Data
{
    public class BankContext : DbContext
    {
        public BankContext()
            : base("BankDb")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}
