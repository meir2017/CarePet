using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for User
/// </summary>
public class User
{
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Passward { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public string RengDeat { get; set; }
    public string UserType { get; set; }
    


    public User()
    {

    }
    public User(int i, string n, string f, string pa, string ph, string rg,string ut)
    {
        UserID = i; UserName = n; Email = f; Passward = pa; Phone = ph; RengDeat = rg; UserType = ut;
    }
}
