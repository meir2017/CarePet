using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for SignInDBServices
/// </summary>
public class SignInDBServices
{
    string strCon;

    public SignInDBServices()
    {
        strCon = DBGlobals.strCon;
    }
    public string SignInUsingClass(string name, string password, string mail, string phone)
    {
        string output="good";
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
         "  INSERT INTO[dbo].[Users] ([UserName] ,[Passward] ,[Email] ,[Phone],[UserType]) " +
         "  VALUES('" + name + "', '" + password + "', '" + mail + "', '" + phone + "','User') ", con);

        try
        {

            con.Open();
            com.ExecuteNonQuery();

        }
        catch (SqlException ex)
        {

            output = ex.Number.ToString();
        }

        com.Connection.Close();

        return output;
    }
}