using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class SearchDAL
{
    string strCon;

    public SearchDAL()
    {
        strCon = DBGlobals.strCon;
    }

    public string SearchNowService(string SearchInfo)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlDataAdapter adptr = new SqlDataAdapter(
            " SELECT * " +
            " FROM Provider " +
            " WHERE TypeService = '" + SearchInfo + "'", con);

        DataSet ds = new DataSet();
        adptr.Fill(ds, "Provider");
        DataTable dt = ds.Tables["Provider"];
        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }
}
