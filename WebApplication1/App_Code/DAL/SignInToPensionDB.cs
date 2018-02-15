using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class SignInToPensionDB
{
    string strCon;
    public SignInToPensionDB()
    {
        strCon = DBGlobals.strCon;
    }
    public string SignInToPension(string userID, string AnimalID, string myPhone, string PansionId, string DateStart, string DateEnd, string Details, string EmailUser)
    {

        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            "  INSERT INTO [dbo].[In_Pensions] ([AnimalID],[UserID]  ,[ID_Pension], " +
            " [If_Exists] ,[Check_in],[Check_out] ,[Invitation] ,[Details] ,[EmailUser]) " +
            "  VALUES('" + AnimalID + "', '" + userID + "', '" + PansionId + "',NULL, '" + DateStart + "', '" + DateEnd + "', NULL, '" + Details + "', '" + EmailUser + "') ", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Rows added to the data base";
        com.Connection.Close();

        return output;
    }

}
