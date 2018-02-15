using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class AddBusinessBAL
{
    AddBusinessDB loginDb = new AddBusinessDB();

    public int NEWBusinessDAL(string Bname, string type, string Address, string Bphon, string lat, string lng)
    {
        return loginDb.NEWBusinessDB(Bname, type, Address, Bphon, lat, lng);
    }
}
