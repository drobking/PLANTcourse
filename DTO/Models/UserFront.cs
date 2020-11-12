using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models
{
    public class UserFront
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public List<string> PlantNames { get; set; }
    }
}
