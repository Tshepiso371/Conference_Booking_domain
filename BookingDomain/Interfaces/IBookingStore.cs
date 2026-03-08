using Conference_Booking_domain.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Conference_Booking_domain.Interfaces
{
    public interface IBookingStore
    {
        Task<List<Booking>> GetAllAsync();

        Task<Booking?> GetByIdAsync(int id);

        Task AddAsync(Booking booking);

        Task UpdateAsync(Booking booking);

        Task SaveChangesAsync();

        // SEARCH + FILTER + PAGINATION
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