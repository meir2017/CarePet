using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DBֹ_DeleteItem
{

    string strCon;
    public DBֹ_DeleteItem()
    {
        strCon = DBGlobals.strCon;
    }

    public string DeleteItem(string itemID, string yesNo)
    {
        int x = int.Parse(yesNo);
        SqlConnection con = new SqlConnection(strCon);
        string Command = "";

        if (x == 0)
        {
            Command = " DELETE FROM[dbo].[In_Pensions] " +
                      " WHERE idRows = '" + itemID + "'";
        }
        else
        {

            Command = "  UPDATE[dbo].[In_Pensions] " +
                      "  SET  Invitation = 'yes' " +
                      "  WHERE idRows = '" + itemID + "'";
        }
        SqlCommand com = new SqlCommand(Command, con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Row deleted from the data base";
        com.Connection.Close();
        return output;

    }

}
