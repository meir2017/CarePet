using PushSharp;
using PushSharp.Android;
using PushSharp.Core;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.SessionState;



namespace WebApplication1
{
    public class Global : System.Web.HttpApplication
    {

       // string strCon = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;
        string strCon = ConfigurationManager.ConnectionStrings["RuppinDBLive"].ConnectionString;

        int stop = 0;
        bool timerEnabled = false;
        static System.Timers.Timer timer = new System.Timers.Timer();

        

        protected void Application_Start(object sender, EventArgs e)
        {

            timer.Enabled = false;
          //  timer.Enabled = false;
            timer.Interval =50000;
            timer.Elapsed += tm_Tick;
        }

        void tm_Tick(object sender, EventArgs e)
        {
            //RunPushNotification();
            MessageToUsers();
           // Console.Beep(3000, 1000);       
        }

        public void MessageToUsers()
        {

            List<Event> listMsg = GetUserEventsUsingClass();// רשימת כול האירועים לפי בקשה 
            foreach (var msg in listMsg)
            {
                myTest(msg.description, msg.title, msg.Reng);// האירועים שהגיעו SQL נשלחים למכשירים 

            }
        }
        // from sql
        public List<Event> GetUserEventsUsingClass()
        {

            DateTime tve_time = DateTime.Now;//("yyyy-MM-ddTHH:mm"));
               string timeSql = (tve_time.ToString("yyyy-MM"));// כול האירועים לחודש הזה
          //  string timeSql = (tve_time.ToString("yyyy-MM-dd")); // תאריך מלא עם שעה כמו בלוח שנה 
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
                  reader["Event_ID"].ToString(), reader["Title"].ToString(),
                   reader["Description"].ToString(), reader["Start_Date_Time"].ToString(),
                   reader["RengUser"].ToString()
                    );
                output.Add(e);
            }
            com.Connection.Close();

            return output;
        }

        public void myTest(string m, string t, string user_Reng)
        {
            string message = m;
            string title = t;

            var push = new PushBroker();
            push.OnNotificationSent += NotificationSent;
            //key
            push.RegisterGcmService(new GcmPushChannelSettings("AAAAD_Zs3Og:APA91bF10XYTd21DUbbipM0UObV-RhJxHJtSe1egPSCs0wcT_AoxSJD8vRd4PuATqh48W8f9_goVh6KFBBavG2KUPxcfOf1aEUTZQq5mzeLSvAP77RuJWK4zL_usQud9Mr1Jo0MYdI0l"));

            push.QueueNotification(new GcmNotification().ForDeviceRegistrationId(user_Reng)
            .WithJson("{\"message\": \" " + message + " \", \"title\": \"  " + title + "\", \"msgcnt\": \"1\", \"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"sound.caf\"}"));

            push.StopAllServices();
        }


        void NotificationSent(object sender, INotification notification) // חלק חשוב 
        {
            Console.WriteLine("Sent: " + sender + " -> " + notification);
        }

        // לא חייב 
        //public static void StartTimer()
        //{
        //    timer.Enabled = true;

        //}

        //public static void EndTimer()
        //{
        //    timer.Enabled = false;
        //}

        /// Run Push   Notification
        public string getTEST()
        {
            stop++;
            if (stop == 3)
            {
                stop = 0;
                timer.Enabled = false;
            }

            DateTime Today = DateTime.Now;
            DateTime Add_Days = Today.AddDays(4);

            string u = Today.ToString() + "    ,     " + Today.ToString("yyyy-MM-ddTHH:mm"); /*Add_Days.ToString();*/

            //string u = "לא קרא את ממסד הנתונים";
            //SqlConnection con = new SqlConnection(strCon);
            //SqlCommand com = new SqlCommand(
            //    " SELECT  [UserID] ,[UserName],[Passward] " +
            //    " FROM[dbo].[Users] " +
            //    "  where UserID = 10 " , con);

            //con.Open();
            //SqlDataReader reader = com.ExecuteReader();
            //if (reader.Read())
            //{

            //    u = reader["UserID"].ToString() + reader["UserName"].ToString() + reader["Passward"].ToString() ;
            //}
            //com.Connection.Close();

            return u;
        }

        public string getUser()
        {
            stop++;
            if (stop == 3)
            {
                stop = 0;
                timer.Enabled = false;
            }

            string strCon = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;

            string u = "לא קרא את ממסד הנתונים";
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand com = new SqlCommand(
                " SELECT  [UserID] ,[UserName],[Passward] " +
                " FROM[dbo].[Users] " +
                " where UserID = 10 ", con);

            con.Open();
            SqlDataReader reader = com.ExecuteReader();
            if (reader.Read())
            {

                u = reader["UserID"].ToString() + reader["UserName"].ToString() + reader["Passward"].ToString();
            }
            com.Connection.Close();

            return u;
        }

        public void RunPushNotification2()
        {
            string message = "globl";
            //message = getTEST();
            List<Event> m2 = GetUserEventsUsingClass();
            message = m2[1].description.ToString() + "  , " + m2[0].description.ToString();
            //message = m2[1];

            var push = new PushBroker();

            push.OnNotificationSent += NotificationSent;
            //key
            push.RegisterGcmService(new GcmPushChannelSettings("AAAAD_Zs3Og:APA91bF10XYTd21DUbbipM0UObV-RhJxHJtSe1egPSCs0wcT_AoxSJD8vRd4PuATqh48W8f9_goVh6KFBBavG2KUPxcfOf1aEUTZQq5mzeLSvAP77RuJWK4zL_usQud9Mr1Jo0MYdI0l"));

            //string message = "globl";
            //reng uesr                                                          fhI1KhYUmu0:APA91bGwKfj18xMUBWF22WvlRetFic8JKizjI-9E7nq6w6G8Z4WAOTN3-3FLDD4Fu5myBumx50I2yAMnym_WOeoP1pXJM8M0yLDq8poqxgo4eSDOQU_FWa0KFZdWFVo0MwGwuYkfsB92
            push.QueueNotification(new GcmNotification().ForDeviceRegistrationId("fhI1KhYUmu0:APA91bGwKfj18xMUBWF22WvlRetFic8JKizjI-9E7nq6w6G8Z4WAOTN3-3FLDD4Fu5myBumx50I2yAMnym_WOeoP1pXJM8M0yLDq8poqxgo4eSDOQU_FWa0KFZdWFVo0MwGwuYkfsB92")
                                  .WithJson("{\"message\": \" " + message + " \", \"title\": \" my title\", \"msgcnt\": \"1\", \"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"sound.caf\"}"));

            push.StopAllServices();
        }


    }




    public class Event
    {

        public string id { get; set; }
        public string UserID { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string start { get; set; }
        //public string color { get; set; }
        public string Reng { get; set; }
        public Event(string e_id, string e_title, string desc, string start_time, string e_Reng)
        {
            id = e_id;
            title = e_title;
            description = desc;
            start = start_time;
            //color = e_color;
            Reng = e_Reng;
        }
        public Event()
        {

        }
    }




}

