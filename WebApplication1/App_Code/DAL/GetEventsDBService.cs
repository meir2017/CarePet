using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class GetEventsDBService
{
    string strCon;
    public GetEventsDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public List<string> GetUserEventsUsingClass(string id)
    {
        List<string> output = new List<string>();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " SELECT * " +
            " FROM Events " +
            " WHERE UserID = '" + int.Parse(id) + "' "
            , con);
        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        while (reader.Read())
        {
            Event e = new Event
                (
              reader["Event_ID"].ToString(), reader["Title"].ToString(),
               reader["Description"].ToString(), reader["Start_Date_Time"].ToString(),
               reader["Importent_Color"].ToString()
                );
            output.Add(serializer.Serialize(e));
        }
        com.Connection.Close();

        return output;
    }
}
