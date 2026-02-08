using Microsoft.AspNetCore.Identity;
using Conference_Booking.API.Auth;

namespace Conference_Booking.API.Auth
{
    public static class IdentitySeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();

            var roleManager = scope.ServiceProvider
                .GetRequiredService<RoleManager<IdentityRole>>();

            var userManager = scope.ServiceProvider
                .GetRequiredService<UserManager<ApplicationUser>>();

            
            string[] roles =
            {
                "Employee",
                "Admin",
                "Receptionist",
                "FacilitiesManager"
            };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            
            await CreateUserAsync(
                userManager,
                "admin@conference.com",
                "Admin123!",
                "Admin");

            await CreateUserAsync(
                userManager,
                "employee@conference.com",
                "Employee123!",
                "Employee");

            await CreateUserAsync(
                userManager,
                "reception@conference.com",
                "Reception123!",
                "Receptionist");

            await CreateUserAsync(
                userManager,
                "facilities@conference.com",
                "Facilities123!",
                "FacilitiesManager");
        }

        private static async Task CreateUserAsync(
            UserManager<ApplicationUser> userManager,
            string email,
            string password,
            string role)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(user, password);
                await userManager.AddToRoleAsync(user, role);
            }
        }
    }
}
