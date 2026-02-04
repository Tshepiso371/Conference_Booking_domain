namespace Conference_Booking_domain.Domain;
using System;

public class BookingException : Exception
{
    public BookingException(string message) : base(message) { }
}
