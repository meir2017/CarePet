using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;


using PushSharp;
using PushSharp.Android;

using PushSharp.Core;
using System.Net;
using System.Net.Mail;
using System.Web.UI;

/// <summary>
/// Summary description for UsersWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UsersWS : System.Web.Services.WebService
{
    string strCon = DBGlobals.strCon;

    bool timerEnabled = false;
    static System.Timers.Timer timer = new System.Timers.Timer();

    public UsersWS()
    {
        timer.Enabled = true;
        timer.Interval = 50000;
        timer.Elapsed += tm_Tick;
    }
    void tm_Tick(object sender, EventArgs e)
    {
        //RunPushNotification();
        NotificationTimer();
        // RunPushNotification2();

    }


    [WebMethod]// התחברות
    public string LoginUserUsingClass(string name, string password)
    {
        LoginBAL loginBal = new LoginBAL();
        return loginBal.LoginUserUsingClass(name, password);
    }

    [WebMethod]// הרשמה
    public string SignInUserUsingClass(string name, string password, string mail, string phone)
    {
        SignInBAL signBal = new SignInBAL();
        return signBal.SignInUserUsingClass(name, password, mail, phone);
    }

    [WebMethod]// הרשמה
    public string SignInToPension(string userID, string AnimalID, string myPhone, string PansionId, string DateStart, string DateEnd, string Details, string EmailUser)
    {
        SignInToPensionBAL signBal = new SignInToPensionBAL();
        return signBal.SignInPension(userID, AnimalID, myPhone, PansionId, DateStart, DateEnd, Details, EmailUser);
    }

    //[WebMethod]
    //public string GetAllUsers()
    //{
    //    UsersBAL users = new UsersBAL();
    //    return users.GetAllUsers();
    //}


    [WebMethod]//חיופש ספקים
    public string TheSearcher(string SearchInfo)
    {
        SearchBal Searcher = new SearchBal();
        return Searcher.SearchNow(SearchInfo);
    }

    [WebMethod]// הוספת עסק
    public int AddBusiness(string Bname, string type, string Address, string Bphon, string lat, string lng)
    {
        AddBusinessBAL newBusiness = new AddBusinessBAL();
        return newBusiness.NEWBusinessDAL(Bname, type, Address, Bphon, lat, lng);
    }

    [WebMethod]// הוספת חיית מחמד
    public string AddNewAnimal(string userID, string name, string year, string weight, string hieght, string type, string race,
    string sex, string description, string diseases, string treatments, string vaccines)
    {
        NewAnimalBAL AnimalBal = new NewAnimalBAL();
        return AnimalBal.AddNewAnimal(userID, name, year, weight, hieght, type, race, sex, description, diseases, treatments, vaccines);
    }

    [WebMethod]// חיות מחמד לפי משתמש
    public string GetUserAnimalsUsingClass(string userID)
    {
        UserAnimalsBAL AnimalsBal = new UserAnimalsBAL();
        return AnimalsBal.GetUserAnimalsUsingClass(userID);
    }



    [WebMethod]// פרטי חית מחמד לפי  בחירה
    public string GetAnimalDetailsUsingClass(string animalID)
    {
        AnimalDetailsBAL AnimalBal = new AnimalDetailsBAL();
        return AnimalBal.GetAnimalDetailsUsingClass(animalID);
    }

    [WebMethod]// שמירת חית המחמד          animalID    name    year    weight    hieght:  type  race  sex   description    diseases   treatments vaccines

    public string SaveChangesAnimal(string animalID, string name, string year, string weight, string hieght, string type, string race,
        string sex, string description, string diseases, string treatments, string vaccines)
    {
        SaveChangesAnimalBAL AnimalBal = new SaveChangesAnimalBAL();
        return AnimalBal.SaveAnimal(animalID, name, year, weight, hieght, type, race, sex, description, diseases, treatments, vaccines);


    }

    [WebMethod]// מחיקת חית מחמד
    public string DeleteAnimal(string animalID)
    {
        DeleteAnimalBAL AnimalBal = new DeleteAnimalBAL();
        return AnimalBal.DeleteAnimal(animalID);
    }

    [WebMethod] // ערכית פרופיל
    public string EditProfile(string userID, string ToChange, string NewVal)
    {
        EditProfileBAL EditBal = new EditProfileBAL();
        return EditBal.EditProfile(userID, ToChange, NewVal);
    }

    [WebMethod] // יצירת ארוע
    public string CreateNewEvent(string id, string userID, string title, string start, string description, string color)
    {
        NewEventBAL newEvent = new NewEventBAL();
        return newEvent.CreateNewEvent(id, userID, title, start, description, color);
    }



    [WebMethod]// מחיקת ארוע
    public string DeleteEvent(string id)
    {
        DeleteEventBAL delEvent = new DeleteEventBAL();
        return delEvent.DeleteEvent(id);

    }


    [WebMethod] // אירוע לפי משתמש
    public List<string> GetUserEventsUsingClass(string id)
    {
        GetEventsBAL userEvents = new GetEventsBAL();
        return userEvents.GetUserEventsUsingClass(id);

    }

    [WebMethod] // יצירת ארוע חדש
    public string EditEvent(string id, string title, string start, string description, string color)
    {
        EditEventBAL editEvent = new EditEventBAL();
        return editEvent.EditEvent(id, title, start, description, color);
    }

    //////////////////// פנסיון ////////////////////////////////////
    [WebMethod]// רשימת המתנה לפנסיון 
    public string GetWaitingList(string id_p, string T_List)
    {
        GetWaitingListBAL getlist = new GetWaitingListBAL();
        return getlist.WaitingListBAL(id_p, T_List);

    }
    [WebMethod]// הצגת פרטי הפנסיון
    public string InfoPension()
    {
        Get_InformationBAL theInfo = new Get_InformationBAL();
        return theInfo.get_info();
    }
    [WebMethod]// מחיקת ארוע
    public string DeleteOrApprova(string itemID, string yesNo)
    {
        DeleteItemBAL delItem = new DeleteItemBAL();
        return delItem.DeleteItem(itemID, yesNo);

    }
    //string UserID ,string  pensionID ,string animalID
    [WebMethod]//  הודעה ראשונה 
    public string Start_a_call(string varible, string Cust, string typeUser, string msg_type, string the_msg, string msg_date, string UserID, string pensionID, string animalID)
    {

        Start_a_call_BAL Exists = new Start_a_call_BAL();
        return Exists.Updaet_or_Insert(varible, Cust, typeUser, msg_type, the_msg, msg_date, UserID, pensionID, animalID);
    }


    [WebMethod] //  כול הודעות הצ'אט
    public string get_All_Msg(string Cust)
    {
        AllMsgInChat_BAL myMsg = new AllMsgInChat_BAL();
        return myMsg.getTheMsg_bal(Cust);

    }

    [WebMethod]//עידכון תמונה ???
    public string Add_photo_path(string WhoSend, string idUser, string photo_path)
    {
        UpdatPicBAL UpdatPic = new UpdatPicBAL();
        return UpdatPic.UpdatPic(WhoSend, idUser, photo_path);

    }
    //[WebMethod]// מחיקת ארוע
    //public string Update_Ruws(string Cust)
    //{
    //    ExistsAnimalBal Updat = new ExistsAnimalBal();
    //    return Updat.Update_Ruws(Cust);

    //}

    //////////////////// דוחף התראות ///////////////
    [WebMethod] // עדכון הרשמת הודעות
    public string UpdateUserRege(string theReg, string id, string typeUser)
    {
        UpdateUserRegeBAL Rage = new UpdateUserRegeBAL();
        return Rage.RegeDBUpdate(theReg, id, typeUser);

    }

    [WebMethod]// נסיוני
    public void RunPushNotification(int num)
    {
        string myReg;
        if (num > 5)
            myReg = "dyow6Hnx4rw:APA91bGmmQvZRd2Eu3l2kaBMixIDdtau8qWfKi-JQUixrUhMvmQ51lDnRkq31E-ZzD94BSNPmkhSaU0WlrFGQL-p5_olurBlB93e0PKTTyTLJz2fBZ12kHS3tiONPwruH9dL7Sy0SJs7";
        else
            myReg = "f537ZMaiTAo:APA91bHnzPdDkUu665pOyoKNbo26anQftYIPSrJ6o0JejgsMgWf2D3k1KzVbgDEtGJOCqBVHRUAU8hGJhb8Dy4_ZMT9dCxcX3JLiVPwBFkQE9ZN4GvSL0iG0EUvxHp8lvxKZIspTywnH";

        //   string myReg1= "f_y2JgBx59E:APA91bG_ziqfyssypiiA7HEnZVQonnGaKRvyw7SQrgj-fCUauPFDZfxfBhyNss7SWu4ascVRc8JEb2xtzLMLxtrNDEsfkeGlGhSB9iPQoUWZEL2Nh9aQIa4KR0g_dLAWtteVGPeFeDH7";
        var push = new PushBroker();


        push.OnNotificationSent += NotificationSent;
        //key
        push.RegisterGcmService(new GcmPushChannelSettings("AAAAD_Zs3Og:APA91bF10XYTd21DUbbipM0UObV-RhJxHJtSe1egPSCs0wcT_AoxSJD8vRd4PuATqh48W8f9_goVh6KFBBavG2KUPxcfOf1aEUTZQq5mzeLSvAP77RuJWK4zL_usQud9Mr1Jo0MYdI0l"));



        string message = "meir--:)   . " + num;
        //reng uesr
        push.QueueNotification(new GcmNotification().ForDeviceRegistrationId(myReg)
                          .WithJson("{\"message\": \" " + message + " \", \"title\": \" my title\", \"msgcnt\": \"1\", \"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"Pistol.mp3\"}"));


        push.StopAllServices();
    }


    void NotificationSent(object sender, INotification notification) // פונקצית מערכת
    {
        Console.WriteLine("Sent: " + sender + " -> " + notification);
    }


    [WebMethod]// רשימת כול האירועים בSQL
    public List<Event> NotificationTimer()

    {

        SendNotification userEvents = new SendNotification();

        List<Event> listMsg = userEvents.GetUserEvent();

        foreach (var msg in listMsg)
        {

            SendNotificationToUser(msg.description, msg.title, msg.RengUser);// האירועים שהגיעו SQL נשלחים למכשירים 

        }

        return listMsg;
    }
    [WebMethod]//  שולח  פוש ללקוחות מתוך צא'ט
    public void NotificationToCustomer(string UserIdGet, string userNameSend)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
           " SELECT [RengUser] FROM[dbo].[Users] where[UserID] = '" + int.Parse(UserIdGet) + "' ", con);
        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            string userReg = reader["RengUser"].ToString();
            SendNotificationToUser("מ " + userNameSend + "  כנס לצא'ט", "יש לך הודעה חדשה", userReg);
        }
        com.Connection.Close();
    }


    [WebMethod]//  שלוח פוש לפנסיונים מצא'ט
    public void NotificationToPension(string UserIdGet, string userNameSend)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
           " SELECT  [RegPension]  FROM [dbo].[Our_Pensions] where [ID_Pension]='" + int.Parse(UserIdGet) + "' ", con);
        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        if (reader.Read())
        {
            string userReg = reader["RegPension"].ToString();
            SendNotificationToUser("מ " + userNameSend + "  כנס לצא'ט", "יש לך הודעה חדשה", userReg);
        }
        com.Connection.Close();
    }

    [WebMethod]//  מנהל שלוח לכולם      SELECT  [RegPension]  FROM [myPat].[dbo].[Our_Pensions] where [ID_Pension]=13
    public void NotificationManagement(string myMsg)
    {
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand(
           " SELECT [RengUser] FROM[dbo].[Users] ", con);
        con.Open();
        SqlDataReader reader = com.ExecuteReader();
        while (reader.Read())
        {
            string userReg = reader["RengUser"].ToString();
            SendNotificationToUser(myMsg, "CarePet", userReg);
        }
        com.Connection.Close();
    }


    public void SendNotificationToUser(string m, string t, string user_Reng)
    {

        string message = m;
        string title = t;
        var push = new PushBroker();
        push.OnNotificationSent += NotificationSent;
        //key
        push.RegisterGcmService(new GcmPushChannelSettings("AAAAD_Zs3Og:APA91bF10XYTd21DUbbipM0UObV-RhJxHJtSe1egPSCs0wcT_AoxSJD8vRd4PuATqh48W8f9_goVh6KFBBavG2KUPxcfOf1aEUTZQq5mzeLSvAP77RuJWK4zL_usQud9Mr1Jo0MYdI0l"));

        push.QueueNotification(new GcmNotification().ForDeviceRegistrationId(user_Reng)
        .WithJson("{\"message\": \" " + message + " \", \"content-available\": \"1\", \"force-start\": \"1\", \"title\": \"  " + title + "\", \"msgcnt\": \"1\", \"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"sound.caf\"}"));

        push.StopAllServices();
    }




    [WebMethod]// נסיוני
    public string ForgotPassword(string _email)
    {
        string output = "Not success!";
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand comm = new SqlCommand();
        try
        {
            comm.CommandText = "SELECT [UserName],[Passward] FROM Users WHERE Email= '" + _email + "'";
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();//קריאת המידע
            if (reader.Read())//כל עוד לא נגמר המידע
            {
                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential("66meir46@gamil.com", "meir6646"),
                    EnableSsl = true
                };
                client.Send("meirsibhat@gmail.com", reader["Passward"].ToString(), "Your UserName Recovery", "Your password is: " + reader["UserName"].ToString());
                output = "Email Sent";
            }
        }
        catch (Exception ex)
        {
            output = ex.Message;
        }
        finally
        {
            comm.Connection.Close();
        }
        JavaScriptSerializer json = new JavaScriptSerializer();
        return json.Serialize(output);
    }



    [WebMethod]// נסיוני
    public string ForgotPassword2(string _email)
    {
        string output = "Not success!";
        string username, userpss;
        SqlConnection con = null;
        try
        {

            con = new SqlConnection(strCon);
            con.Open();
            SqlCommand com = new SqlCommand(
                 "SELECT [UserName],[Passward] FROM Users WHERE Email= '" + _email + "'", con);
            //com.Connection.Open();
            SqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                username = reader["UserName"].ToString();
                userpss = reader["Passward"].ToString();

                output = "UserName  " + reader["UserName"].ToString() + "\r\n Passward     " + reader["Passward"].ToString();
                MailMessage mail = new MailMessage();
                //mail.To.Add(email);
                mail.To.Add("meirsibhat@gmail.com");
                mail.From = new MailAddress("carepet2017@gmail.com");
                mail.Subject = "שחזור סיסמה";   // כותרת

                mail.Body = output;  ///גוף ההודעה 

                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential("carepet2017@gmail.com", "carepet2018"); // ***use valid credentials***

                smtp.Port = 587;

                //Or your Smtp Email ID and Password
                smtp.EnableSsl = true;
                smtp.Send(mail);

            }
            con.Close();

        }
        catch (Exception ex)
        {
            output = ex.Message;
        }

        return output;
    }//סוף הודעות 

    [WebMethod]// שליחת מייל
    public string SendMail(string titelEmail, string UserEmail, string BodyMsg)
    {
        SendMailBAL obj_Send = new SendMailBAL();
        return obj_Send.sendNow(titelEmail, UserEmail, BodyMsg);

    }
    [WebMethod]// רישום של עסק טיול כלבים 
    public string DogWalkRegister(string Name_d, string Tal_d, string Email__D, string Address_d, string Remarks_d, string lat_d, string lang_d)
    {
        DogWalkUser obj = new DogWalkUser();
        return obj.Register_User_DogWalkUser(Name_d, Tal_d, Email__D, Address_d, Remarks_d, lat_d, lang_d);

    }
    [WebMethod]// קריאה לכול העסקים של טיול עם כלב  
    public string ReadAllDogWalk()
    {
        ReadDogWalk obj = new ReadDogWalk();
        return obj.AllDogWalk();

    }

    [WebMethod]// קריאה לכול העסקים של טיול עם כלב  
    public string feedback(string feed1, string feed2, string feed3, string feed4, string feed5, string feed6)
    {
        feedbackBAL obj = new feedbackBAL();
        return obj.Write_feedbackBAL(feed1, feed2, feed3, feed4, feed5, feed6);

    }
}



