using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class DBUpdateUserRege
{
    string strCon;
    public DBUpdateUserRege()
    {
        strCon = DBGlobals.strCon;
    }
    public string RegeDBUpdateDAL(string theReg, string id, string typeUser)
    {
        string User = "Pension";

        if (String.Equals(User, typeUser))
            return RegeDBUpdatePension(theReg, id);
        else
            return RegeDBUpdateCustomer(theReg, id);

    }
    public string RegeDBUpdatePension(string theReg, string id)
    {
        Event resEvent = new Event();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
          "  UPDATE[dbo].[Our_Pensions] " +
          "  SET[RegPension] = '" + theReg + "' " +
          "  WHERE[ID_Pension] = '" + int.Parse(id) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();

        return x + " העדכון הצליח";

    }

    public string RegeDBUpdateCustomer(string theReg, string id)
    {
        DateTime the_time = DateTime.Now;
        string RengDeat = (the_time.ToString("yyyy-MM-ddTHH:mm")); // תאריך מלא עם שעה כמו בלוח שנה 

        Event resEvent = new Event();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
     "  UPDATE[dbo].[Users] " +
     "  SET  RengUser = '" + theReg + "' , RengDeat = '" + RengDeat.ToString() + "' " +
     "  WHERE UserID = '" + int.Parse(id) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();

        return x + " העדכון הצליח";

    }
}
