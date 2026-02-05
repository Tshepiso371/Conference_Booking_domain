namespace Conference_Booking_domain.Domain
{
public class BookingConflictException : BookingException
{
    public BookingConflictException(string message): base(message) {}
}
}