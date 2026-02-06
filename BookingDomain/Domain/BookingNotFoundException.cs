namespace Conference_Booking_domain.Domain
{
public class BookingNotFoundException : BookingException
{
    public BookingNotFoundException(string message): base(message) {}
}
}