using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class feedbackDAL
{
    string strCon;

    public feedbackDAL()
    {
        strCon = DBGlobals.strCon;
    }

    public string Write_feedbackDAL(string feed1, string feed2, string feed3, string feed4, string feed5, string feed6)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(

           " INSERT INTO[dbo].[feedback]  ([feed1],[feed2],[feed3],[feed4],[feed5],[feed6]) " +
           " VALUES('" + int.Parse(feed1) + "', '" + int.Parse(feed2) + "', '" + int.Parse(feed3) + "', '" + int.Parse(feed4) + "', '" + feed5 + "', '" + feed6 + "')", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        com.Connection.Close();
        if (numOfRows == 1)
            return "תודה על המשוב";
        else
            return "לא הצלחנו לקבל את המשוב שלך";

    }
}
