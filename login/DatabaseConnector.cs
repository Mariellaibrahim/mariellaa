using System;
using MySql.Data.MySqlClient;

class Program
{
    static void Main()
    {
        string connectionString = "Server=localhost;Database=mariella_schema;Uid=Root;Pwd=@Mariella2002;";
        
        using (var connection = new MySqlConnection(connectionString))
        {
            try
            {
                connection.Open();
                Console.WriteLine("Connected to MySQL database!");

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
