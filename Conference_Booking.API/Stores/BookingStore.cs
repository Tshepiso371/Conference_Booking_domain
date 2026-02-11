using Conference_Booking.API.Data;
using Conference_Booking.API.DTOs;
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

        // -------------------------------------------------
        // EXISTING METHODS (Used by BookingManager)
        // -------------------------------------------------

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

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync(Booking booking)
        {
            await _context.SaveChangesAsync();
        }


        public async Task<PagedResultDto<BookingSummaryDto>> SearchAsync(
            string? roomName,
            string? location,
            DateTime? start,
            DateTime? end,
            bool? activeRooms,
            string? sortBy,
            int page = 1,
            int pageSize = 10)
        {
            IQueryable<Booking> query = _context.Bookings
                .AsNoTracking()
                .Include(b => b.Room);

            
            // Filtering (Database level)
            if (!string.IsNullOrWhiteSpace(roomName))
                query = query.Where(b => b.Room.Name == roomName);

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(b => b.Room.Location == location);

            if (start.HasValue)
                query = query.Where(b => b.StartTime >= start.Value);

            if (end.HasValue)
                query = query.Where(b => b.EndTime <= end.Value);

            if (activeRooms.HasValue)
                query = query.Where(b => b.Room.IsActive == activeRooms.Value);

            
            // Sorting (Before Pagination)

            query = sortBy?.ToLower() switch
            {
                "room" => query.OrderBy(b => b.Room.Name),
                "created" => query.OrderByDescending(b => b.CreatedAt),
                _ => query.OrderBy(b => b.StartTime)
            };

            
            // Total Count (Before Skip/Take)

            var totalCount = await query.CountAsync();

            
            // Pagination + Projection

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new BookingSummaryDto
                {
                    BookingId = b.Id,
                    RoomName = b.Room.Name,
                    Location = b.Room.Location,
                    Start = b.StartTime,
                    End = b.EndTime,
                    CreatedAt = b.CreatedAt
                })
                .ToListAsync();

            return new PagedResultDto<BookingSummaryDto>
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Items = items
            };
        }
    }
}