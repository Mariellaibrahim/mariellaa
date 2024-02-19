using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp",
                builder => builder
                    .WithOrigins("http://localhost:3000") 
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
        
       
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      
        
        app.UseCors("AllowReactApp");

       
    }
}
