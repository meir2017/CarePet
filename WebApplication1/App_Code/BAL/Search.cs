using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class Search
{
    public int BusID { get; set; }
    public string BusName { get; set; }
    public string TypeService { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public float Lngitude { get; set; }
    public float Latitude { get; set; }

    public Search(int i, string n, string t, string a, float lng ,float lat)
    {
        BusID = i; BusName = n; TypeService = t; Address = a; Lngitude = lng; Latitude = lat;
    }
}
