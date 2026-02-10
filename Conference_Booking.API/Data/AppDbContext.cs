using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Conference_Booking.API.Auth;
using Conference_Booking_domain.Domain;

namespace Conference_Booking.API.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // :white_check_mark: REQUIRED DbSets
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ConferenceRoom> ConferenceRooms { get; set; }
    }
}