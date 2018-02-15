using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

public class Get_InformationDB
{
    string strCon;
    public Get_InformationDB()
    {
        strCon = DBGlobals.strCon;
    }
    public string get_info()
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlDataAdapter adptr = new SqlDataAdapter(

           " SELECT * " +
           " FROM Our_Pensions ", con);
        //" WHERE NamePension = '" + name + "'", con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "pensions");
        DataTable dt = ds.Tables["pensions"];

        //needs the newtonsoft.json from nuget packages!
        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }
}
