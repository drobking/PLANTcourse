using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccess.Entity
{
   public class UserAdditioanalInfo
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Address { get; set; }

        public ICollection<Plant> NamePlants { get; set; }
        public virtual User User { get; set; }
    }
}
