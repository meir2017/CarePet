using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class EditEventDBService
{
    string strCon;
    public EditEventDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string EditEvent(string id, string title, string start, string description, string color)
    {
        Event resEvent = new Event();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
        " UPDATE [dbo].[Events] " +
        " SET Title = '" + title + "',Description='" + description + "' " +
        " ,Start_Date_Time='" + start + "',Importent_Color =  '" + color + "'  " +
        " OUTPUT inserted.Title, inserted.Description, inserted.Start_Date_Time, inserted.Importent_Color" +
        " WHERE Event_ID = '" + int.Parse(id) + "' ", con);

        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            resEvent.title = reader["Title"].ToString();
            resEvent.description = reader["Description"].ToString();
            resEvent.start = reader["Start_Date_Time"].ToString();
            resEvent.color = reader["Importent_Color"].ToString();

        }
        com.Connection.Close();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        return serializer.Serialize(resEvent);
    }
}
