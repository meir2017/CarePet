using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class SignInToPensionBAL
{
    SignInToPensionDB goSignDB = new SignInToPensionDB();
    public SignInToPensionBAL()
    {

    }
    public string SignInPension(string userID, string AnimalID, string myPhone, string PansionId, string DateStart, string DateEnd, string Details, string EmailUser)
    {
        return goSignDB.SignInToPension(userID, AnimalID, myPhone, PansionId, DateStart, DateEnd, Details, EmailUser);

    }
}
