using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class DeleteAnimalBAL
{
    DeleteAnimalDBService AnimalDB = new DeleteAnimalDBService();
    public DeleteAnimalBAL() { }
    public string DeleteAnimal(string animalID)
    {
        return AnimalDB.DeleteAnimal(animalID);
    }

}
