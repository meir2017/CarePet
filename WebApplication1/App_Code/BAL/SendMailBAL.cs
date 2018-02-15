using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Service
/// </summary>
public class SendMailBAL
{

    SendMailDAL sendOBJ = new SendMailDAL();

    public SendMailBAL() { }
    public string sendNow(string titelEmail, string UserEmail, string BodyMsg)
    {

        return sendOBJ.whatToSend(titelEmail, UserEmail, BodyMsg);
    }

}
