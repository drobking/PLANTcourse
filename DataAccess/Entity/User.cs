
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Entity
{
   public class User : IdentityUser
    {
        public virtual UserAdditioanalInfo UserAdditioanalInfo { get; set; }
    }
}
