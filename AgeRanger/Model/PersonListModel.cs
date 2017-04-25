using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AgeRanger.Model
{
    public class PersonListModel
    {        
        public int Id { get; set; }
       
        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public int Age { get; set; }
        
        public string AgeGroup { get; set; }

        public PersonListModel()
        {

        }
    }
}
