using System;

namespace Conference_Booking_domain.Domain
{

public class BookingException : Exception
{
    public BookingException(string message) : base(message) { }
}

}