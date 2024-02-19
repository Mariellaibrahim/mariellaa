using Microsoft.AspNetCore.Mvc;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        // This would ideally be stored securely in a database
        private const string ValidUsername = "user";
        private const string ValidPassword = "password";

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Check if the provided username and password match the valid credentials
            if (request.Username == ValidUsername && request.Password == ValidPassword)
            {
                // Return a success response
                return Ok(new { message = "Login successful" });
            }
            else
            {
                // Return a failure response
                return BadRequest(new { message = "Invalid username or password" });
            }
        }
    }
public class LoginRequest
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

}
