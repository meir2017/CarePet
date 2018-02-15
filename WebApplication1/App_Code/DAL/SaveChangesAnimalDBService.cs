using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class SaveChangesAnimalDBService
{
    string strCon;

    public SaveChangesAnimalDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string SaveAnimal(string animalID, string name, string year, string weight, string hieght, string type, string race,
        string sex, string description, string diseases, string treatments, string vaccines)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
        " UPDATE Animals SET Name = '" + name + "', Date = '" + year + "' , Type = '" + type + "' , Race = '" + race + "' , " +
        " Weight = '" + float.Parse(weight) + "', Height = '" + float.Parse(hieght) + "' , Description = '" + description + "' , " +
        " Sex = '" + sex + "', Diseases = '" + diseases + "' , Vaccines = '" + vaccines + "'  " +
        " WHERE AnimalID = '" + int.Parse(animalID) + "' ", con);


        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Rows added to the data base";
        com.Connection.Close();
        return "meir";
    }



}
