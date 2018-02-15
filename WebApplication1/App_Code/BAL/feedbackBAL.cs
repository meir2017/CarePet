using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class feedbackBAL
{
    feedbackDAL objWrite = new feedbackDAL();

    public string Write_feedbackBAL(string feed1, string feed2, string feed3, string feed4, string feed5, string feed6)
    {
        return objWrite.Write_feedbackDAL(feed1, feed2, feed3, feed4, feed5, feed6); ;
    }
}

