using Conference_Booking.API.Data;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Conference_Booking.API.Stores
{
    public class BookingStore : IBookingStore
    {
        private readonly AppDbContext _context;

        public BookingStore(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _context.Bookings
                .Include(b => b.Room)
                .ToListAsync();
        }

        public async Task AddAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync(Booking booking)
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }
    }
}
