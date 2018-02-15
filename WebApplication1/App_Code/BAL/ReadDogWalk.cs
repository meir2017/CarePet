using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class ReadDogWalk
{
    ReadDogWalkDB RedOBJ = new ReadDogWalkDB();

    public ReadDogWalk() { }
    public string AllDogWalk()
    {

        return RedOBJ.AllDogWalkInCarPet();
    }
}


