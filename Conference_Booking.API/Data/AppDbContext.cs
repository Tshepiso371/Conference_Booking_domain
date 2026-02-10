using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Conference_Booking.API.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using Conference_Booking_domain.Domain;

namespace Conference_Booking.API.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

    public DbSet<Booking> Bookinngs => Set<Booking>();
    public DbSet<ConferenceRoom> ConferenceRooms => Set<ConferenceRoom>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Room)
            .WithMany()
            .IsRequired();
    }
    }
}