using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for UsersDbService
/// </summary>
public class UsersDbService
{
    string strCon;

    public UsersDbService()
    {
        strCon = DBGlobals.strCon;
    }

    public string GetAllUsers()
    {
        //SqlConnection con = new SqlConnection(strCon);
        //SqlDataAdapter adptr = new SqlDataAdapter(
        //    " SELECT * " +
        //    " FROM tblUsers ", con);

        //DataSet ds = new DataSet();
        //adptr.Fill(ds, "Users");
        //DataTable dt = ds.Tables["Users"];

        ////needs the newtonsoft.json from nuget packages!
        //string json = JsonConvert.SerializeObject(dt, Formatting.Indented); 
        //return json;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        return serializer.Serialize("meir");
        //return "meir";
    }
}