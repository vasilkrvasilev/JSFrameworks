using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Bank.Models
{
    public class Log
    {
        public int Id { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        public virtual Account Account { get; set; }
    }
}
