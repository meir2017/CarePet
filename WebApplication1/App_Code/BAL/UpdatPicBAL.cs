using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


    public class UpdatPicBAL
{
      DB_UpdatPic Pic = new DB_UpdatPic();
    //WhoSend
    //idUser:
    //photo_path:
    public string UpdatPic(string WhoSend, string idUser, string photo_path)
        {
            string myString = WhoSend;
                if (myString.StartsWith("Animal"))
                   return Pic.UpdatPic_Animal(idUser, photo_path);
                else
                   return Pic.UpdatPic_User(idUser, photo_path);

    }
}
