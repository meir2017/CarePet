using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class AllMsgInChat_BAL
{
    DB_AllMsgInChat msgDB = new DB_AllMsgInChat();
    public AllMsgInChat_BAL() { }

    public string getTheMsg_bal(string Cust)
    {
        return msgDB.getTheMsg_DB(Cust);
    }
}
