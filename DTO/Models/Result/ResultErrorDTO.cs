using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.Models.Result
{
   public class ResultErrorDTO:ResultDTO
    {
        public List<string> Errors { get; set; }
    }
}
