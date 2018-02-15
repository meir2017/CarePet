using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


public class DBGetWaitingList
{
    string strCon;
    public DBGetWaitingList()
    {
        strCon = DBGlobals.strCon;
    }
    public string WaitingList(string id_p, string T_List)
    {


        int x = int.Parse(T_List);
        SqlConnection con = new SqlConnection(strCon);
        string Command = "";

        if (x == 0) // מי שממתין 
        {

            Command = " SELECT dbo.Animals.AnimalID, dbo.In_Pensions.idRows, dbo.In_Pensions.UserID, dbo.Users.UserName, dbo.In_Pensions.AnimalID AS Expr1, dbo.Animals.Name, dbo.In_Pensions.ID_Pension, dbo.Our_Pensions.NamePension, dbo.In_Pensions.If_Exists, dbo.In_Pensions.Check_in, dbo.In_Pensions.Check_out, dbo.In_Pensions.Invitation, dbo.In_Pensions.Details, dbo.Users.Phone, " +
         "  dbo.Users.Email, dbo.Animals.Type " +
         "  FROM  dbo.Animals INNER JOIN " +
         "  dbo.In_Pensions ON dbo.Animals.AnimalID = dbo.In_Pensions.AnimalID INNER JOIN " +
          "  dbo.Users ON dbo.Animals.UserID = dbo.Users.UserID AND dbo.In_Pensions.UserID = dbo.Users.UserID INNER JOIN " +
          "  dbo.Our_Pensions ON dbo.In_Pensions.ID_Pension = dbo.Our_Pensions.ID_Pension " +
          "  where In_Pensions.ID_Pension = '" + id_p + "' and Invitation IS NULL ";



            // Command = " SELECT * " +
            //" FROM In_Pensions " +
            //" where ID_Pension = '" + id_p + "' and Invitation IS NULL ";
        }
        else// מי שכבר לקוח
        {
            Command = " SELECT dbo.Animals.AnimalID, dbo.In_Pensions.idRows, dbo.In_Pensions.UserID, dbo.Users.UserName, dbo.In_Pensions.AnimalID AS Expr1, dbo.Animals.Name, dbo.In_Pensions.ID_Pension, dbo.Our_Pensions.NamePension, dbo.In_Pensions.If_Exists, dbo.In_Pensions.Check_in, dbo.In_Pensions.Check_out, dbo.In_Pensions.Invitation, dbo.In_Pensions.Details, dbo.Users.Phone, " +
          "  dbo.Users.Email, dbo.Animals.Type " +
          "  FROM  dbo.Animals INNER JOIN " +
          "  dbo.In_Pensions ON dbo.Animals.AnimalID = dbo.In_Pensions.AnimalID INNER JOIN " +
           "  dbo.Users ON dbo.Animals.UserID = dbo.Users.UserID AND dbo.In_Pensions.UserID = dbo.Users.UserID INNER JOIN " +
           "  dbo.Our_Pensions ON dbo.In_Pensions.ID_Pension = dbo.Our_Pensions.ID_Pension " +
       "   where In_Pensions.ID_Pension = '" + id_p + "' and Invitation = 'yes' ";

            //  Command = " SELECT * " +
            //" FROM In_Pensions " +
            //" where ID_Pension = '" + id_p + "' and Invitation = 'yes' ";
        }



        SqlDataAdapter adptr = new SqlDataAdapter(Command, con);

        //SqlConnection con = new SqlConnection(strCon);
        //SqlDataAdapter adptr = new SqlDataAdapter(
        //   " SELECT * " +
        //   " FROM In_Pensions " +
        //   " where ID_Pension = '"+ id_p + "' and Invitation IS NULL ", con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "myList");
        DataTable dt = ds.Tables["myList"];

        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }

    public string getRows(string id_p, string T_List)
    {


        //int x = int.Parse(id_p);
        SqlConnection con = new SqlConnection(strCon);// מחזיר לפי השורה 
        string Command = "";

        Command = " SELECT dbo.Animals.AnimalID, dbo.In_Pensions.idRows, dbo.In_Pensions.UserID, dbo.Users.UserName, dbo.In_Pensions.AnimalID AS Expr1, dbo.Animals.Name, dbo.In_Pensions.ID_Pension, dbo.Our_Pensions.NamePension, dbo.In_Pensions.If_Exists, dbo.In_Pensions.Check_in, dbo.In_Pensions.Check_out, dbo.In_Pensions.Invitation, dbo.In_Pensions.Details, dbo.Users.Phone, " +
        " dbo.Users.Email, dbo.Animals.Type " +
        //" dbo.In_Pensions.CustomerNumber,  dbo.Users.Email, dbo.Animals.Type " +

        " FROM  dbo.Animals INNER JOIN " +
        " dbo.In_Pensions ON dbo.Animals.AnimalID = dbo.In_Pensions.AnimalID INNER JOIN " +
        "  dbo.Users ON dbo.Animals.UserID = dbo.Users.UserID AND dbo.In_Pensions.UserID = dbo.Users.UserID INNER JOIN " +
        "  dbo.Our_Pensions ON dbo.In_Pensions.ID_Pension = dbo.Our_Pensions.ID_Pension " +
        "  where In_Pensions.idRows = '" + T_List + "' ";
        //where In_Pensions.idRows = 4


        SqlDataAdapter adptr = new SqlDataAdapter(Command, con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "myList");
        DataTable dt = ds.Tables["myList"];

        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }

    public string list_By_User(string id_p, string T_List)
    {


        //int x = int.Parse(id_p);
        SqlConnection con = new SqlConnection(strCon);// מחזיר לפי השורה 
        string Command = "";

        Command = " SELECT dbo.Animals.AnimalID, dbo.In_Pensions.idRows, dbo.In_Pensions.UserID, dbo.Users.UserName, dbo.In_Pensions.AnimalID AS Expr1, dbo.Animals.Name, dbo.In_Pensions.ID_Pension, dbo.Our_Pensions.NamePension, dbo.In_Pensions.If_Exists, dbo.In_Pensions.Check_in, dbo.In_Pensions.Check_out, dbo.In_Pensions.Invitation, dbo.In_Pensions.Details, dbo.Users.Phone, " +
        " dbo.Users.Email, dbo.Animals.Type, dbo.Our_Pensions.Pension_Phone " +
        //" dbo.In_Pensions.CustomerNumber,  dbo.Users.Email, dbo.Animals.Type " +

        " FROM  dbo.Animals INNER JOIN " +
        " dbo.In_Pensions ON dbo.Animals.AnimalID = dbo.In_Pensions.AnimalID INNER JOIN " +
        "  dbo.Users ON dbo.Animals.UserID = dbo.Users.UserID AND dbo.In_Pensions.UserID = dbo.Users.UserID INNER JOIN " +
        "  dbo.Our_Pensions ON dbo.In_Pensions.ID_Pension = dbo.Our_Pensions.ID_Pension " +
        "  where In_Pensions.UserID = '" + T_List + "' ";
        //where In_Pensions.idRows = 4


        SqlDataAdapter adptr = new SqlDataAdapter(Command, con);
        DataSet ds = new DataSet();
        adptr.Fill(ds, "myList");
        DataTable dt = ds.Tables["myList"];

        string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        return json;
    }
}

