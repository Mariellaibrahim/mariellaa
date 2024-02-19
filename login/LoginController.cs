using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private const string ConnectionString = "Server=localhost;Database=mariella_schema;Uid=root;Pwd=@Mariella2002;";

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            using (var connection = new MySqlConnection(ConnectionString))
            {
                connection.Open();

                var query = "SELECT COUNT(*) FROM users WHERE email = @Email AND password = @Password";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Email", request.Email);
                    command.Parameters.AddWithValue("@Password", request.Password);
                    var result = Convert.ToInt32(command.ExecuteScalar());
                    
                    if (result > 0)
                    {
                        return Ok(new { message = "Login successful" });
                    }
                    else
                    {
                        return BadRequest(new { message = "Invalid email or password" });
                    }
                }
            }
        }
    }

   public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

}
