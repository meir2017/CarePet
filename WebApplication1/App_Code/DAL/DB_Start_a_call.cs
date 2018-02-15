using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DB_Start_a_call
{
    string strCon;
    public DB_Start_a_call()
    {
        strCon = DBGlobals.strCon;
    }
    //עדכון בטבלה שהחייה הגיע
    public void ExistsUser(string Cust)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
       "  UPDATE [dbo].[In_Pensions] " +
       "  SET If_Exists = 1 " +
       "  WHERE idRows = '" + int.Parse(Cust) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();


    }
    // כתיבץ הודעה  או תמונה בטבלה
    public string write_msg(string Cust, string typeUser, string msg_type, string the_msg, string msg_date, string UserID, string pensionID, string animalID)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
       "  INSERT INTO[dbo].[Msg_With_Customer] " +
       " ([CustomerNumber] ,[type_user]  ,[type_msg] ,[msg] ,[date_msg],[UserID],[ID_Pension],[AnimalID]) " +
        "  VALUES(" + Cust + ", " + typeUser + ", " + msg_type + ", '" + the_msg + "','" + msg_date + "','" + int.Parse(UserID) + "','" + int.Parse(pensionID) + "','" + int.Parse(animalID) + "') ", con);

        con.Open();
        int numOfRows = com.ExecuteNonQuery();
        string output = numOfRows + " Rows added to the data base";
        com.Connection.Close();

        return output;
    }

}
