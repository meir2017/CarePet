using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class AnimalDetailsDBService
{
    string strCon;

    public AnimalDetailsDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string GetAnimalDetailsUsingClass(string animalID)
    {
        Animal animal = new Animal();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " SELECT * " +
            " FROM Animals " +
            " WHERE AnimalID = '" + animalID + "' "
            , con);

        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            animal.Name = reader["Name"].ToString();
            animal.Date = reader["Date"].ToString();
            animal.Type = reader["Type"].ToString();
            animal.Race = reader["Race"].ToString();
            animal.Weight = reader["Weight"].ToString();
            animal.Height = reader["Height"].ToString();
            animal.Description = reader["Description"].ToString();
            animal.Sex = reader["Sex"].ToString();
            animal.Diseases = reader["Diseases"].ToString();
            //animal.Treatments = reader["Treatments"].ToString();
            animal.Vaccines = reader["Vaccines"].ToString();
        }
        com.Connection.Close();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        return serializer.Serialize(animal);
    }



}
