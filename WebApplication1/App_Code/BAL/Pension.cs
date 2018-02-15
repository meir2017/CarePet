using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Pension
/// </summary>
public class Pension
    {
        public int ID { get; set; }
        public string BusinessName { get; set; }
        public string UserName { get; set; }
        public string Passward { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }

    public Pension()
        { }
        public Pension(int i, string b, string u, string pa, string d, string e, string ph, string a,  string ut)
        {
        ID = i; BusinessName = b; UserName = u; Passward = pa; Description = d; Email = e;  Phone = ph;  Address = a;  UserType = ut;
    }
    }
