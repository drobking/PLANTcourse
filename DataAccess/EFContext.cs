using DataAccess.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options):base(options)
        {

        }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<UserAdditioanalInfo> UserAdditioanalInfos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasOne(x => x.UserAdditioanalInfo)
                .WithOne(x => x.User)
                .HasForeignKey<UserAdditioanalInfo>(x => x.Id);
           
            base.OnModelCreating(builder);
        }
    }
}
