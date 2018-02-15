using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



public class AnimalDetailsBAL
{
    AnimalDetailsDBService AnimalDB = new AnimalDetailsDBService();
    public AnimalDetailsBAL() { }
    public string GetAnimalDetailsUsingClass(string animalID)
    {
        return AnimalDB.GetAnimalDetailsUsingClass(animalID);

    }


}
