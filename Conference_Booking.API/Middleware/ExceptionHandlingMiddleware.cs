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
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext context,
            Exception exception)
        {
            HttpStatusCode statusCode;
            ErrorCategory category;
            string message;

            switch (exception)
            {
                case BookingConflictException:
                    statusCode = HttpStatusCode.UnprocessableEntity;
                    category = ErrorCategory.BusinessRuleViolation;
                    message = exception.Message;
                    break;

                case BookingNotFoundException:
                    statusCode = HttpStatusCode.NotFound;
                    category = ErrorCategory.BusinessRuleViolation;
                    message = exception.Message;
                    break;

                case BookingException:
                    statusCode = HttpStatusCode.UnprocessableEntity;
                    category = ErrorCategory.BusinessRuleViolation;
                    message = exception.Message;
                    break;

                default:
                    statusCode = HttpStatusCode.InternalServerError;
                    category = ErrorCategory.UnexpectedError;
                    message = "An unexpected error occurred.";
                    break;
            }

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";

            var response = new APIErrorResponse
            {
                Message = message,
                Category = category
            };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response)
            );
        }
    }
}