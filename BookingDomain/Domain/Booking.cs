namespace Conference_Booking_domain.Domain;
using System;
using Conference_Booking_domain.Enums;

 public class Booking
{
    public int Id { get; private set; }

    public int RoomId { get; private set; }

    public ConferenceRoom Room { get; private set; }

    public DateTime StartTime { get; private set; }
    public DateTime EndTime { get; private set; }
    public BookingStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? CancelledAt { get; private set; }

    private Booking() { }

    public Booking(ConferenceRoom room, DateTime start, DateTime end)
    {
        if (room == null)
            throw new ArgumentNullException(nameof(room));

        if (end <= start)
            throw new ArgumentException("End must be after start.");

        Room = room;
        RoomId = room.Id; 

        StartTime = start;
        EndTime = end;

        CreatedAt = DateTime.UtcNow;
        Status = BookingStatus.Available;
    }

    public void Confirm()
    {
        if (Status == BookingStatus.Booked)
            throw new InvalidOperationException("Already booked.");

        Status = BookingStatus.Booked;
    }

    public void Cancel()
    {
        if (Status == BookingStatus.Available)
            throw new InvalidOperationException("Not active.");

        Status = BookingStatus.Available;
        CancelledAt = DateTime.UtcNow;
    }
}