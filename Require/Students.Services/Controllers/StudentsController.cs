using People.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Students.Services.Controllers
{
    public class StudentsController : ApiController
    {
        private static StudentModel[] people = new StudentModel[]
        {
			new StudentModel()
            {
                Id = 0, 
                Name = "Doncho", 
                Grade = 5, 
                Marks = new MarkModel[] 
                {
                    new MarkModel()
                    {
                        Subject = "Math", 
                        Score = 4
                    }
                }
            },
            new StudentModel()
            {
                Id = 1, 
                Name = "Nikolay", 
                Grade = 6, 
                Marks = new MarkModel[0]
            },
            new StudentModel()
            {
                Id = 2, 
                Name = "Ivaylo", 
                Grade = 2, 
                Marks = new MarkModel[] 
                {
                    new MarkModel()
                    {
                        Subject = "OOP", 
                        Score = 4
                    },
                    new MarkModel()
                    {
                        Subject = "C#", 
                        Score = 6
                    }
                }
            },
            new StudentModel()
            {
                Id = 3, 
                Name = "Svetlin", 
                Grade = 11, 
                Marks = new MarkModel[] 
                {
                    new MarkModel()
                    {
                        Subject = "Unit Testing", 
                        Score = 5
                    },
                    new MarkModel()
                    {
                        Subject = "WPF", 
                        Score = 6
                    },
                    new MarkModel()
                    {
                        Subject = "JavaScript", 
                        Score = 6
                    }
                }
            },
            new StudentModel()
            {
                Id = 4, 
                Name = "Asya", 
                Grade = 8, 
                Marks = new MarkModel[0]
            },
            new StudentModel()
            {
                Id = 5, 
                Name = "Georgi", 
                Grade = 5, 
                Marks = new MarkModel[0]
            }
        };


        // GET api/students
        public IEnumerable<StudentModel> GetAll()
        {
            var students = new StudentModel[]
            {
			    new StudentModel()
                {
                    Id = 0, 
                    Name = "Doncho", 
                    Grade = 5
                },
                new StudentModel()
                {
                    Id = 1, 
                    Name = "Nikolay", 
                    Grade = 6
                },
                new StudentModel()
                {
                    Id = 2, 
                    Name = "Ivaylo", 
                    Grade = 2
                },
                new StudentModel()
                {
                    Id = 3, 
                    Name = "Svetlin", 
                    Grade = 11
                },
                new StudentModel()
                {
                    Id = 4, 
                    Name = "Asya", 
                    Grade = 8
                },
                new StudentModel()
                {
                    Id = 5, 
                    Name = "Georgi", 
                    Grade = 5
                }
            };

            return students;
        }

        // GET api/students/1
        [ActionName("marks")]
        public IEnumerable<MarkModel> Get(int studentId)
        {
            var marks = people[studentId].Marks;
            return marks;
        }
    }
}
