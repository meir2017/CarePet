using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class GetEventsBAL
{

    public GetEventsBAL() { }
    GetEventsDBService GetEventsDB = new GetEventsDBService();
    public List<string> GetUserEventsUsingClass(string id)
    {
        return GetEventsDB.GetUserEventsUsingClass(id);
    }


}
