using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class DeleteItemBAL
{
    public DeleteItemBAL() { }
    DBֹ_DeleteItem delItem = new DBֹ_DeleteItem();

    public string DeleteItem(string itemID, string yesNo)
    {
        return delItem.DeleteItem(itemID, yesNo);
    }
}
