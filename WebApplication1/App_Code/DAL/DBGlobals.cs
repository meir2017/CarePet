using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DBGlobals
/// </summary>
static public class DBGlobals
{

    static bool local = true;
    static bool Ruppin = true;
    static public string strCon;


    static  DBGlobals()  
    {
        if (local && !Ruppin)//שרת וממסד נתונים מקומיים 
        {
            strCon = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;

        }
        else if (local && Ruppin)// יכולת לעבוד עם שרת חיצוני  אבל אפשר ממסד נתונים מקומי 
        {
            strCon = ConfigurationManager.ConnectionStrings["RuppinDBLocal"].ConnectionString;
        }
        else// שרת וממסד נתונים  ברשת
        {
            strCon = ConfigurationManager.ConnectionStrings["RuppinDBLive"].ConnectionString;
        }
    }
}