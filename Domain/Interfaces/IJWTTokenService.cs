using DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Interfaces
{
    interface IJWTTokenService
    {
        string CreateToken(User user);
    }
}
