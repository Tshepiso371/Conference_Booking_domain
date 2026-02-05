using System.Net;
using System.Text.Json;
using Conference_Booking_domain.Domain;

namespace Conference_Booking.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BookingConflictException ex)
            {
                await HandleException(context, HttpStatusCode.UnprocessableEntity, ex.Message);
            }
            catch (BookingNotFoundException ex)
            {
                await HandleException(context, HttpStatusCode.NotFound, ex.Message);
            }
            catch (BookingException ex)
            {
                await HandleException(context, HttpStatusCode.UnprocessableEntity, ex.Message);
            }
            catch (Exception)
            {
                await HandleException(
                    context,
                    HttpStatusCode.InternalServerError,
                    "An unexpected error occurred."
                );
            }
        }

        private static async Task HandleException(
            HttpContext context,
            HttpStatusCode statusCode,
            string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var response = new ErrorResponse
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
    }
}