using DataAccess;
using DataAccess.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantCourse.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
            IWebHostEnvironment env,
            IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole, context);
            }
        }

        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, EFContext _context)
        {
            _context.Plants.Add(new Plant
            {
                Temperature = 25,
                Humidity=200,
                HumidityGras=100,
                Name="Gosha",
                Water=20
            });
            _context.Plants.Add(new Plant
            {
                Temperature = 28,
                Humidity = 123,
                HumidityGras = 423,
                Name = "egor",
                Water = 123
            });
            _context.Plants.Add(new Plant
            {
                Temperature = 324,
                Humidity = 234,
                HumidityGras = 12,
                Name = "vlasd",
                Water = 32
            });
            _context.Plants.Add(new Plant
            {
                Temperature = 123,
                Humidity = 34,
                HumidityGras = 102340,
                Name = "putin",
                Water = 24560
            });
            _context.SaveChanges();
            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;

                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;


                string email = "admin@gmail.com";
                var admin = new User
                {
                    Email = email,
                    UserName = email
                };
                var andrii = new User
                {
                    Email = "egor@gmail.com",
                    UserName = "egor@gmail.com"
                };

                var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
                resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

                var resultAndrii = userManager.CreateAsync(andrii, "Qwerty1-").Result;
                resultAndrii = userManager.AddToRoleAsync(andrii, "User").Result;
            }
        }
    }
}
