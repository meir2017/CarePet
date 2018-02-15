using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


    public class DB_UpdatPic
    {
    string strCon;
    public DB_UpdatPic()
    {
        strCon = DBGlobals.strCon;
    }
    //עדכון בטבלה שהחייה הגיע
    public string UpdatPic_User(string idUser, string photo_path)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " UPDATE [dbo].[Users] " +
            " SET  [profile_pic] ='" + photo_path + "' "+
           "  WHERE UserID = '" + int.Parse(idUser) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();
        return "add  Users pic ";

    }
    // כתיבץ הודעה  או תמונה בטבלה
    public string UpdatPic_Animal(string idUser, string photo_path)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
            " UPDATE [dbo].[Animals] " +
            " SET  [profile_pic] ='" + photo_path + "' " +
            "  WHERE AnimalID = '" + int.Parse(idUser) + "' ", con);

        con.Open();
        int x = com.ExecuteNonQuery();

        com.Connection.Close();
        return "add Animals  pic ";
    }
}

