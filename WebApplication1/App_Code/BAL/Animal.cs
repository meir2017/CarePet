using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



public class Animal
{
    public string AnimalID { get; set; }
    public string Name { get; set; }
    public string Date { get; set; }
    public string Type { get; set; }
    public string Race { get; set; }
    public string Weight { get; set; }
    public string Height { get; set; }
    public string Description { get; set; }
    public string Sex { get; set; }
    public string Diseases { get; set; }
    public string Treatments { get; set; }
    public string Vaccines { get; set; }
    public Animal()
    {

    }
    public Animal(string id, string n, string da, string ty, string r, string w, string h, string de, string s, string di, string tr, string v)
    {
        AnimalID = id; Name = n; Date = da; Type = ty; Race = r; Weight = w; Height = h; Description = de; Sex = s; Diseases = di; Treatments = tr;
        Vaccines = v;
    }
    public Animal(string id, string n)
    {
        AnimalID = id; Name = n;
    }

}



