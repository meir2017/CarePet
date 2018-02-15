using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SignInBAL
/// </summary>
public class SignInBAL
{
    SignInDBServices SignInDB = new SignInDBServices();
    public SignInBAL()
    {
    }
    public string SignInUserUsingClass(string name, string password, string mail, string phone)
    {
        return SignInDB.SignInUsingClass(name, password, mail, phone);
    }
}