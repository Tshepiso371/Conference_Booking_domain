using Conference_Booking.API.Data;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Conference_Booking.API.Stores
{
    public class RoomStore : IRoomStore
    {
        private readonly AppDbContext _context;

        public RoomStore(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ConferenceRoom>> GetAllAsync()
        {
            return await _context.ConferenceRooms.ToListAsync();
        }

        public async Task<ConferenceRoom?> GetByIdAsync(int id)
        {
            return await _context.ConferenceRooms.FindAsync(id);
        }
    }
}
