using Conference_Booking_domain.Data;
using Conference_Booking_domain.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection; 
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Enums;
using Conference_Booking_domain.Logic;

var builder = WebApplication.CreateBuilder(args);

// Register services

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services
builder.Services.AddSingleton<BookingRepository>();
builder.Services.AddSingleton<SeedData>();
builder.Services.AddScoped<BookingManager>();

var app = builder.Build();

// HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
