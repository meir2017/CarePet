using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class UserAnimalsDBService
{
    string strCon;

    public UserAnimalsDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string GetUserAnimalsUsingClass(string userID)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlDataAdapter adptr = new SqlDataAdapter(
            " SELECT * " +
            " FROM Animals " +
            " WHERE UserID = '" + userID + "' "
            , con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "resAnimal");
        DataTable dt = ds.Tables["resAnimal"];

        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;

    }
}
