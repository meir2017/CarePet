using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

public class ReadDogWalkDB
{
    string strCon;

    public ReadDogWalkDB()
    {
        strCon = DBGlobals.strCon;
    }

    public string AllDogWalkInCarPet()
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlDataAdapter adptr = new SqlDataAdapter(
            " SELECT * " +
            " FROM DogWalk ", con);

        DataSet ds = new DataSet();
        adptr.Fill(ds, "DogWalk");
        DataTable dt = ds.Tables["DogWalk"];

        //needs the newtonsoft.json from nuget packages!
        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }
}
