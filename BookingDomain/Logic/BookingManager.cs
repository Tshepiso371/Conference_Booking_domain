using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Persistence;
using Conference_Booking_domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conference_Booking_domain.Logic
{
    public class BookingManager
    {
        private readonly BookingRepository _repository;
        private readonly List<ConferenceRoom> _rooms;

        public BookingManager(BookingRepository repository, SeedData seedData)
        {
            _repository = repository;
            _rooms = seedData.SeedRooms();
        }

        public async Task<Booking> CreateBookingAsync(
            int roomIndex,
            DateTime start,
            DateTime end)
        {
            if (roomIndex < 0 || roomIndex >= _rooms.Count)
                throw new BookingException("Invalid room selection.");

            if (start >= end)
                throw new BookingException("Start time must be before end time.");

            var room = _rooms[roomIndex];
            var bookings = await _repository.LoadAsync();

            bool overlap = bookings.Any(b =>
                b.Room.Name == room.Name &&
                start < b.EndTime &&
                end > b.StartTime
            );

            if (overlap)
                throw new BookingException("Room already booked for that time.");

            Booking booking = new Booking(room, start, end);
            booking.Confirm();

            bookings.Add(booking);
            await _repository.SaveAsync(bookings);

            return booking;
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _repository.LoadAsync();
        }

        public async Task CancelBookingAsync(int index)
        {
            var bookings = await _repository.LoadAsync();

            if (index < 0 || index >= bookings.Count)
                throw new BookingException("Booking not found.");

            bookings[index].Cancel();
            await _repository.SaveAsync(bookings);
        
        }

        public async Task ResolveConflictAsync(int index)
        {
            var bookings = await _repository.LoadAsync();

            if (index < 0 || index >= bookings.Count)
                throw new BookingException("Booking not found.");

            bookings[index].Confirm();
            await _repository.SaveAsync(bookings);
        }
    }
}
