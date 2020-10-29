using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Entity
{
    
    
    public class Plant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Humidity { get; set; }
        [Required]
        public int Temperature { get; set; }
        [Required]
        public int HumidityGras { get; set; }
        [Required]
        public int Water { get; set; }
    }
}
