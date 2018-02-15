using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;

public class SendMailDAL
{
    string strCon;
    string stringTest = "שחזור סיסמה";
    string output = "כתובת המייל לא קיימת  במאגר";
    string BodyMsg = "";
    public SendMailDAL()
    {
        strCon = DBGlobals.strCon;

    }

    public string whatToSend(string titelEmail, string UserEmail, string BodyMsg)
    {

        SqlConnection con = null;
        try
        {
            if (String.Equals(stringTest, titelEmail))
            {
                con = new SqlConnection(strCon);
                con.Open();
                SqlCommand com = new SqlCommand(
                 "SELECT [UserName],[Passward] FROM Users WHERE Email= '" + UserEmail + "'", con);
                SqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    BodyMsg = "<p  style='background-color:lightskyblue;font-size:20px;font-family: David;color:coral;text-align:center'> שם משתמש &nbsp;&nbsp;  -> &nbsp;&nbsp; " + reader["UserName"].ToString() + "<br> סיסמה &nbsp;&nbsp;    ->&nbsp;&nbsp;   " + reader["Passward"].ToString() + "<p>";
                    // BodyMsg = "UserName  " + reader["UserName"].ToString() + "<br> Passward     " + reader["Passward"].ToString();
                    sendEmalToUser(titelEmail, UserEmail, BodyMsg);

                }
                con.Close();
            }
            else
            {
                sendEmalToUser(titelEmail, UserEmail, BodyMsg);

            }
        }

        catch (Exception ex)
        {
            output = ex.Message;
        }

        return output;
    }
    public string sendEmalToUser(string titelEmail, string UserEmail, string BodyMsg)
    {
        MailMessage mail = new MailMessage();
        mail.To.Add(UserEmail.ToString());//UserEmail  meirsibhat@gmail.com
        //mail.From = new MailAddress("abc@gmail.com");
        mail.From = new MailAddress("carepet2017@gmail.com");//?

        mail.Subject = titelEmail.ToString();   // כותרת

        mail.Body = BodyMsg;  ///גוף ההודעה 
        output = "בדוק את המייל שלך ";
        mail.IsBodyHtml = true;
        SmtpClient smtp = new SmtpClient();
        smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
        smtp.Credentials = new System.Net.NetworkCredential("carepet2017@gmail.com", "carepet2018"); // ***use valid credentials***
        smtp.Port = 587;

        //Or your Smtp Email ID and Password
        smtp.EnableSsl = true;
        smtp.Send(mail);
        return "meir";
    }

}
