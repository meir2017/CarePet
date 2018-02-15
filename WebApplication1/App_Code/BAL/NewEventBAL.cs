using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class NewEventBAL
{
    NewEventDBService newEventDB = new NewEventDBService();

    public NewEventBAL() { }

    public string CreateNewEvent(string id, string userID, string title, string start, string description, string color)
    {
        return newEventDB.CreateNewEvent(id, userID, title, start, description, color);
    }
}
