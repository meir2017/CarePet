using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class Start_a_call_BAL
{
    public Start_a_call_BAL() { }
    DB_Start_a_call myAnimal = new DB_Start_a_call();

    public string Updaet_or_Insert(string varible, string Cust, string typeUser, string msg_type, string the_msg, string msg_date, string UserID, string pensionID, string animalID)
    {
        int if_is_firstMsg = int.Parse(varible);
        if (if_is_firstMsg == 0)// אם זה הודעה ראשונה 
            myAnimal.ExistsUser(Cust);// עדכון בטבלה שהחייה הגיע לפנסיון  והתחלת שיחה בצ'אט 

        return myAnimal.write_msg(Cust, typeUser, msg_type, the_msg, msg_date, UserID, pensionID, animalID);// כתיבית הודעה /תמונה לתוך הטבלה  

    }
}
