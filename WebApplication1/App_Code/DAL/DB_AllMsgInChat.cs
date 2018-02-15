using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DB_AllMsgInChat
{
    string strCon;
    public DB_AllMsgInChat()
    { strCon = DBGlobals.strCon; }

    public string getTheMsg_DB(string Cust)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlDataAdapter adptr = new SqlDataAdapter(

           " SELECT * " +
           " FROM Msg_With_Customer " +
        " WHERE CustomerNumber = '" + Cust + "'", con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "chat");
        DataTable dt = ds.Tables["chat"];

        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }
}
