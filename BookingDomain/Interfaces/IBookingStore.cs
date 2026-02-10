using Conference_Booking_domain.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Conference_Booking_domain.Interfaces
{
    public interface IBookingStore
    {
        Task<List<Booking>> GetAllAsync();
        Task AddAsync(Booking booking);
        Task SaveChangesAsync(Booking booking);
        Task UpdateAsync(Booking booking);
    }
}