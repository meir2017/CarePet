using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DogWalkUserDB
{
    string strCon;

    public DogWalkUserDB()
    {
        strCon = DBGlobals.strCon;
    }

    public string RegisterUser(string Name_d, string Tal_d, string Email__D, string Address_d, string Remarks_d, string lat_d, string lang_d)
    {

        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(

           " INSERT INTO [dbo].[DogWalk]   ([Name],[Tal],[Email],[Address],[Remarks],[latitude],[longitude])" +
           "  VALUES('" + Name_d + "','" + Tal_d + "','" + Email__D + "','" + Address_d + "','" + Remarks_d + "','" + float.Parse(lat_d) + "','" + float.Parse(lang_d) + "')", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();


        com.Connection.Close();
        if (numOfRows == 1)
            return "ההרשמה  בוצעה בהצלחה ";
        else
            return "בעיה בהרשמה ";

    }
}
