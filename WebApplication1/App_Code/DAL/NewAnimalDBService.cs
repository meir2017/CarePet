using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class NewAnimalDBService
{
    string strCon;
    public NewAnimalDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string AddNewAnimal(string userID, string name, string year, string weight, string hieght, string type, string race, string sex, string description, string diseases, string treatments, string vaccines)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(

        "  INSERT INTO[dbo].[Animals] ([UserID] ,[Name],[Date] ,[Type] ,[Race],[Weight],[Height],[Description],[Sex],[Diseases],[Vaccines]) " +
         "  VALUES('" + int.Parse(userID) + "', '" + name + "', '" + year + "', '" + type + "', '" + race + "', '" + float.Parse(weight) + "', '" + float.Parse(hieght) + "', " +
         "  '" + description + "', '" + sex + "', '" + diseases + "', '" + vaccines + "') ", con);
                                             //(61, 'Name', 'Date', 'Type', 'dog', 12, 22, 'Description', 'Sex', 'profile_pic', 'Diseases', 'Vaccines')
        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Rows added to the data base";
        com.Connection.Close();

        return output;
    }




}
