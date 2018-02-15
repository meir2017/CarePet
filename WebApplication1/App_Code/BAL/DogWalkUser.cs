using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class DogWalkUser
{
    DogWalkUserDB TheUser = new DogWalkUserDB();

    public string Register_User_DogWalkUser(string Name_d, string Tal_d, string Email__D, string Address_d, string Remarks_d, string lat_d, string lang_d)
    {
        return TheUser.RegisterUser(Name_d, Tal_d, Email__D, Address_d, Remarks_d, lat_d, lang_d);
    }
}
