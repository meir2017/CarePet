using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

public class DeleteAnimalDBService
{
    string strCon;
    public DeleteAnimalDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string DeleteAnimal(string animalID)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
        //" DELETE FROM[dbo].[Animals] " +
        //" WHERE AnimalID = " + int.Parse(animalID) + " ", con);
        "  DELETE FROM[dbo].[Animals] " +
        "  WHERE AnimalID = '" + int.Parse(animalID) + "' ", con);
        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Row deleted from the data base";
        com.Connection.Close();
        return output;
    }

}
