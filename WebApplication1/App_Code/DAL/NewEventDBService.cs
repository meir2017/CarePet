using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class NewEventDBService
{
    string strCon;
    public NewEventDBService()
    {
        strCon = DBGlobals.strCon;
    }
    public string CreateNewEvent(string id, string userID, string title, string start, string description, string color)
    {
        string event_ID = "DB Error";
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " INSERT INTO[dbo].[Events] " +
            " ([UserID] ,[Title] ,[Description] ,[Start_Date_Time] ,[Importent_Color]) " +
            " VALUES('" + int.Parse(userID) + "', '" + title + "', '" + description + "', '" + start + "', '" + color + "')  " +
             " SELECT CAST(scope_identity() AS int) ", con);

        con.Open();
        event_ID = com.ExecuteScalar().ToString();
        com.Connection.Close();
        return event_ID;

    }
}



