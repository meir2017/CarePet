using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class EditEventBAL
{

    public EditEventBAL() { }
    EditEventDBService EditEventDB = new EditEventDBService();
    public string EditEvent(string id, string title, string start, string description, string color)
    {
        return EditEventDB.EditEvent(id, title, start, description, color);
    }




}
