using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class EditProfileDBService
{
    //SqlConnection con = null;
    //SqlCommand com;
    string strCon;

    public EditProfileDBService()
    {

        strCon = DBGlobals.strCon;
    }
    public string EditProfile(string userID, string ToChange, string NewVal)
    {
        string myText = "";
        string outPut = ToChange.ToString();
        SqlConnection con = new SqlConnection(strCon);

        if (String.Equals("UserPass", ToChange))
            myText = "  UPDATE [dbo].[Users]   SET[Passward] = '" + NewVal + "'   WHERE[UserID] = '" + int.Parse(userID) + "' ";

        if (String.Equals("UserMail", ToChange))
            myText = "  UPDATE [dbo].[Users]   SET[Email] = '" + NewVal + "'   WHERE[UserID] = '" + int.Parse(userID) + "' ";

        if (String.Equals("UserPhone", ToChange))
            myText = "  UPDATE [dbo].[Users]   SET[Phone] = '" + NewVal + "'   WHERE[UserID] = '" + int.Parse(userID) + "' ";

        SqlCommand com = new SqlCommand(myText.ToString(), con);
        con.Open();
        int x = com.ExecuteNonQuery();
        com.Connection.Close();
        return outPut;

    }
    public string EditProfile1(string userID, string NewVal, string ToChange)
    {
        string outPut = "";
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
           "  UPDATE [dbo].[Users]   SET[Passward] = '" + NewVal + "'   WHERE[UserID] = '" + int.Parse(userID) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();

        return outPut;
    }


}
