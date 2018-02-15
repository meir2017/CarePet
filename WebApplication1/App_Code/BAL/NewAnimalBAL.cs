using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



public class NewAnimalBAL
{
    NewAnimalDBService AddAnimalDB = new NewAnimalDBService();

    public NewAnimalBAL()
    {

    }

    public string AddNewAnimal(string userID, string name, string year, string weight, string hieght, string type, string race, string sex, string description, string diseases, string treatments, string vaccines)
    {
        return AddAnimalDB.AddNewAnimal(userID, name, year, weight, hieght, type, race, sex, description, diseases, treatments, vaccines);
    }


}
