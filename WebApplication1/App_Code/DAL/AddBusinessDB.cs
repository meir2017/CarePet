using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class AddBusinessDB
{
    string strCon;

    public AddBusinessDB()
    {
        strCon = DBGlobals.strCon;
    }

    public int NEWBusinessDB(string Bname, string type, string Address, string Bphon, string lat, string lng)
    {

        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(

           " INSERT INTO[dbo].[Provider]  ([Name] ,[TypeService],[Adderss] ,[PhoneNumber] ,[latitude] ,[longitude]) " +
           "  VALUES('" + Bname + "','" + type + "','" + Address + "','" + Bphon + "','" + float.Parse(lat) + "','" + float.Parse(lng) + "')", con);

        //"  INSERT INTO[dbo].[Animals] ([UserID] ,[Name],[Date] ,[Type] ,[Race],[Weight],[Height],[Description],[Sex],[Diseases],[Treatments],[Vaccines]) " +
        // "  VALUES('" + int.Parse(userID) + "', '" + name + "', '" + year + "', '" + type + "', '" + race + "', '" + float.Parse(weight) + "', '" + float.Parse(hieght) + "', " +
        // "  '" + description + "', '" + sex + "', '" + diseases + "', '" + treatments + "', '" + vaccines + "') ", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();

        com.Connection.Close();

        return numOfRows;
    }
}
