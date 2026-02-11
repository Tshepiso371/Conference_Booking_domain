
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Interfaces;
using Conference_Booking_domain.Logic;



namespace Conference_Booking_domain.Logic
{
    public class BookingManager
    {
        private readonly IBookingStore _bookingStore;
        private readonly IRoomStore _roomStore;

        public BookingManager(
            IBookingStore bookingStore,
            IRoomStore roomStore)
        {
            _bookingStore = bookingStore;
            _roomStore = roomStore;
        }

        public async Task<Booking> CreateBookingAsync(
            int roomId,
            DateTime start,
            DateTime end)
        {
            var room = await _roomStore.GetByIdAsync(roomId)
                ?? throw new BookingException("Room not found.");

            if (start >= end)
                throw new BookingException("Invalid time range.");

            var bookings = await _bookingStore.GetAllAsync();

            bool overlap = bookings.Any(b =>
                b.Room.Id == room.Id &&
                start < b.EndTime &&
                end > b.StartTime);

            if (overlap)
                throw new BookingException("Room already booked.");

            var booking = new Booking(room, start, end);
            booking.Confirm();

            await _bookingStore.AddAsync(booking);
            return booking;
        }

        public async Task<List<Booking>> GetAllBookingsAsync()
        {
            return await _bookingStore.GetAllAsync();
        }

        public async Task CancelBookingAsync(int bookingId)
        {
            var bookings = await _bookingStore.GetAllAsync();
            var booking = bookings.FirstOrDefault(b => b.Id == bookingId)
                ?? throw new BookingException("Booking not found.");

            booking.Cancel();
            await _bookingStore.UpdateAsync(booking);
        
        }

        public async Task ResolveConflictAsync(int bookingId)
{
    var bookings = await _bookingStore.GetAllAsync();

    var booking = bookings.FirstOrDefault(b => b.Id == bookingId);

    if (booking == null)
        throw new BookingNotFoundException("Booking not found.");

    booking.Confirm();

    await _bookingStore.UpdateAsync(booking);
}
    }
}
