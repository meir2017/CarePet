using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// התחברות של פנסיון ומשתמש
/// </summary>
public class LoginDBService
{
    string strCon;

    public LoginDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string LoginUserUsingClass(string name, string password)
    {
        int x = 0;
        User u = null; Pension p = null;
        SqlConnection con = new SqlConnection(strCon);

        SqlCommand com = new SqlCommand(
           " UPDATE[dbo].[Our_Pensions] SET[Visits] =[Visits] + 1 WHERE UserName = '" + name + "' AND Passward =  '" + password + "' " +
            " SELECT * " +
            " FROM Our_Pensions " +
            " WHERE UserName = '" + name + "' AND Passward =  '" + password + "' "
            , con);

        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            x = 1;
            p = new Pension(int.Parse(reader["ID_Pension"].ToString()),
                reader["NamePension"].ToString(),
                reader["UserName"].ToString(),
                reader["Passward"].ToString(),
                reader["Description"].ToString(),
                reader["Email"].ToString(),
                reader["Pension_Phone"].ToString(),
                reader["Address"].ToString(),
                reader["UserType"].ToString());
        }
        com.Connection.Close();
        if (x == 0)
        {
            com = new SqlCommand(
          " UPDATE[dbo].[Users] SET[Visits] =[Visits] + 1  WHERE UserName = '" + name + "' AND Passward =  '" + password + "'  " +
          " SELECT * " +
          " FROM Users " +
          " WHERE UserName = '" + name + "' AND Passward =  '" + password + "' "
          , con);

            con.Open();
            reader = com.ExecuteReader();
            if (reader.Read())
            {
                u = new User(int.Parse(reader["UserID"].ToString()),
                    reader["UserName"].ToString(),
                    reader["Email"].ToString(),
                    reader["Passward"].ToString(),
                    reader["Phone"].ToString(),
                    reader["RengDeat"].ToString(),
                    reader["UserType"].ToString());
            }
            com.Connection.Close();
        }

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        if (x == 1)
            return serializer.Serialize(p);
        else
            return serializer.Serialize(u);
    }
}