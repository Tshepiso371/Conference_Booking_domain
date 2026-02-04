namespace Conference_Booking_domain.Domain;
using System;
using Conference_Booking_domain.Enums;

 public class Booking
{
    private ConferenceRoom room;
    private DateTime startTime;
    private DateTime endTime;
    private BookingStatus status;

    public ConferenceRoom Room => room;
    public DateTime StartTime => startTime;
    public DateTime EndTime => endTime;
    public BookingStatus Status => status;

    public Booking(ConferenceRoom room, DateTime start, DateTime end)
{
    
    if (room == null)
        throw new ArgumentNullException(nameof(room), "Booking must reference a room.");

    
    if (end <= start)
        throw new ArgumentException("End time must be after start time.");

    this.room = room;
    startTime = start;
    endTime = end;
    status = BookingStatus.Available;
}


    public void Confirm()
    {
        if (status == BookingStatus.Booked)
            throw new InvalidOperationException("Booking already confirmed.");

        status = BookingStatus.Booked;
    }

    public void Cancel()
    {
        if (status == BookingStatus.Available)
            throw new InvalidOperationException("Booking is not active.");

        status = BookingStatus.Available;
    }
}
