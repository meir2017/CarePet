using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class DAnimalDB
{
    string strCon;
    public DAnimalDB()
    {
        strCon = DBGlobals.strCon;
    }
    public string getAnimalDB(string animalID)
    {
        string u = null;
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " SELECT [Name], [Date]  ,[Type]  ,[Race] ,[Weight] ,[Height] ,[Description]  ,[Sex] ,[Diseases]  ,[Treatments] ,[Vaccines]" +
            " FROM Animals " +
            " WHERE AnimalID = '" + animalID + "' "
            , con);

        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {

            u = reader["Name"].ToString() + reader["Date"].ToString() + reader["Type"].ToString() + reader["Race"].ToString();
        }
        com.Connection.Close();

        JavaScriptSerializer serializer = new JavaScriptSerializer();
        return serializer.Serialize(u);
    }
}
