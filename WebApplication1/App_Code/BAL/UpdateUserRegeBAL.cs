using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class UpdateUserRegeBAL
{
    DBUpdateUserRege RegeDB = new DBUpdateUserRege();
    public UpdateUserRegeBAL() { }

    public string RegeDBUpdate(string theReg, string id, string typeUser)
    {
        return RegeDB.RegeDBUpdateDAL(theReg, id, typeUser);
    }
}
