using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class Event
{

    public string id { get; set; }
    public string UserID { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string start { get; set; }
    public string color { get; set; }
    public string RengUser { get; set; }
    public Event(string e_id, string e_title, string desc, string start_time, string e_color)
    {
        id = e_id;
        title = e_title;
        description = desc;
        start = start_time;
        color = e_color;
    }
    public Event(string e_title, string desc, string rng)
    {
        title = e_title;
        description = desc;
        RengUser = rng;

    }

    public Event()
    {

    }
}
