using Conference_Booking_domain.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Conference_Booking_domain.Interfaces
{
    public interface IBookingStore
    {
        Task<List<Booking>> GetAllAsync();
        Task AddAsync(Booking booking);
        Task UpdateAsync(Booking booking);
        Task SaveChangesAsync(Booking booking);

        // Filtering at entity level
        Task<(List<Booking> Items, int TotalCount)> SearchAsync(
            string? roomName,
            string? location,
            DateTime? start,
            DateTime? end,
            bool? activeRooms,
            string? sortBy,
            int page,
            int pageSize);
    }
}