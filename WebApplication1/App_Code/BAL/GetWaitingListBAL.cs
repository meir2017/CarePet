using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class GetWaitingListBAL
{
    DBGetWaitingList getlist = new DBGetWaitingList();
    public GetWaitingListBAL() { }
    public string WaitingListBAL(string id_p, string T_List)
    {
        int x = int.Parse(id_p);
        if (x == 1)
            return getlist.list_By_User(id_p, T_List);// 1,id בשביל כול הפנסיונים עבור לקוח מסוים 
        if (x == 0)
            return getlist.getRows(id_p, T_List);//0,id  כול המיגע על מספר לקוח  
        return getlist.WaitingList(id_p, T_List);//id,0--id,1     רשימת המתנה /רשימת לקוחות 
    }
}
