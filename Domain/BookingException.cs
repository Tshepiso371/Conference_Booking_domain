namespace Conference_Booking_domain.Domain;
using System;

class BookingException : Exception
{
    public BookingException(string message) : base(message) { }
}
