using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class DeleteEventBAL
{
    public DeleteEventBAL() { }
    DeleteEventDBService delEvent = new DeleteEventDBService();

    public string DeleteEvent(string id)
    {
        return delEvent.DeleteEvent(id);
    }
}
