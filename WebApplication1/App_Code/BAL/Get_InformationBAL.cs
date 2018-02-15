using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class Get_InformationBAL
{
    Get_InformationDB OBJinfoDal = new Get_InformationDB();
    public Get_InformationBAL() { }


    public string get_info()
    {
        return OBJinfoDal.get_info();
    }

}
