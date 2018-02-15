using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



public class UserAnimalsBAL
{
    UserAnimalsDBService UserAnimalsDB = new UserAnimalsDBService();
    public UserAnimalsBAL() { }
    public string GetUserAnimalsUsingClass(string userID)
    {
        return UserAnimalsDB.GetUserAnimalsUsingClass(userID);
    }


}
