using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class SendNotification
{
    string strCon;
    public SendNotification()
    {
        strCon = DBGlobals.strCon;
    }
    public List<Event> GetUserEvent()
    {

        DateTime t_time = DateTime.Now;
        // string timeSql = (t_time.ToString("yyyy-MM"));// שנה-חודש
        //  string timeSql = (t_time.ToString("yyyy-MM-ddTHH")); // תאריך מלאה כולל שעה
        //    string timeSql = (t_time.ToString("yyyy-MM-dd")); // תאריך מלאה ללא שעון
        string timeSql = (t_time.ToString("yyyy-MM-ddTHH:mm")); //תאריך מלא עם שעה מלאה כמו בלוח שנה 

        List<Event> output = new List<Event>();
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
                "  SELECT dbo.Events.Event_ID, dbo.Events.Title, dbo.Events.Description, dbo.Events.Start_Date_Time , dbo.Users.RengUser " +
                "  FROM  dbo.Events INNER JOIN " +
                "   dbo.Users ON dbo.Events.UserID = dbo.Users.UserID " +
                //" WHERE Start_Date_Time LIKE '%2017-10%' ", con); כול האירועים לחודש אוקטובר  2017
                "  WHERE Start_Date_Time LIKE '%" + timeSql + "%' ", con);

        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        while (reader.Read())
        {
            Event e = new Event
                (
               reader["Title"].ToString(),
               reader["Description"].ToString(),
               reader["RengUser"].ToString()
                );
            output.Add(e);
        }
        com.Connection.Close();

        return output;
    }

}
