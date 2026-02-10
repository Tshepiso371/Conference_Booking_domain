using Conference_Booking_domain.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Conference_Booking_domain.Interfaces
{
    public interface IRoomStore
    {
        Task<List<ConferenceRoom>> GetAllAsync();
        Task<ConferenceRoom> GetByIdAsync(int id);
    }
}