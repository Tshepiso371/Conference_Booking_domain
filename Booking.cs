class Booking
{
    private ConferenceRoom room;
    private BookingStatus status;

    public Booking(ConferenceRoom room)
    {
        this.room = room;
        status = BookingStatus.Available;
    }

    public ConferenceRoom Room
    {
        get { return room; }
    }

    public BookingStatus Status
    {
        get { return status; }
    }

    public void BookRoom()
    {
        if (status == BookingStatus.Booked)
        {
            Console.WriteLine("Room already booked.");
        }
        else
        {
            status = BookingStatus.Booked;
            Console.WriteLine("Room booked successfully.");
        }
    }

    public void CancelRoom()
    {
        if (status == BookingStatus.Available)
        {
            Console.WriteLine("Room is not booked.");
        }
        else
        {
            status = BookingStatus.Available;
            Console.WriteLine("Booking cancelled.");
        }
    }
}
