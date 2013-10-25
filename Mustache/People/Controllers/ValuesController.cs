using People.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace People.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<PeopleModel> Get()
        {
            var people = new PeopleModel[]
            {
			    new PeopleModel()
                {
                    Id = 0, 
                    FirstName = "Doncho", 
                    LastName = "Minkov", 
                    Marks = new MarksModel[] 
                    {
                        new MarksModel()
                        {
                            Subject = "Math", 
                            Score = 4
                        }
                    }
                },
                new PeopleModel()
                {
                    Id = 1, 
                    FirstName = "Nikolay", 
                    LastName = "Kostov", 
                    Marks = new MarksModel[0]
                },
                new PeopleModel()
                {
                    Id = 2, 
                    FirstName = "Ivaylo", 
                    LastName = "Kendov", 
                    Marks = new MarksModel[] 
                    {
                        new MarksModel()
                        {
                            Subject = "OOP", 
                            Score = 4
                        },
                        new MarksModel()
                        {
                            Subject = "C#", 
                            Score = 6
                        }
                    }
                },
                new PeopleModel()
                {
                    Id = 3, 
                    FirstName = "Svetlin", 
                    LastName = "Nakov", 
                    Marks = new MarksModel[] 
                    {
                        new MarksModel()
                        {
                            Subject = "Unit Testing", 
                            Score = 5
                        },
                        new MarksModel()
                        {
                            Subject = "WPF", 
                            Score = 6
                        },
                        new MarksModel()
                        {
                            Subject = "JavaScript", 
                            Score = 6
                        }
                    }
                },
                new PeopleModel()
                {
                    Id = 4, 
                    FirstName = "Asya", 
                    LastName = "Georgieva", 
                    Marks = new MarksModel[0]
                },
                new PeopleModel()
                {
                    Id = 5, 
                    FirstName = "Georgi", 
                    LastName = "Georgiev", 
                    Marks = new MarksModel[0]
                }
            };

            return people;
        }
    }
}