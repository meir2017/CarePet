using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Service
/// </summary>
public class SearchBal
{

    SearchDAL SearchOBJ = new SearchDAL();

    public SearchBal() { }
    public string SearchNow(string SearchInfo)
    {

        return SearchOBJ.SearchNowService(SearchInfo);
    }

}
