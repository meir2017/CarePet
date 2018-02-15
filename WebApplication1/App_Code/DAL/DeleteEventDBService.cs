using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DeleteEventDBService
{
    string strCon;
    public DeleteEventDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string DeleteEvent(string id)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
        " DELETE FROM[dbo].[Events] " +
        " WHERE Event_ID = '" + int.Parse(id) + "' ", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Row deleted from the data base";
        com.Connection.Close();
        return output;
    }
}
