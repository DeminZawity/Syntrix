using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Syntrix.Repositories;

namespace Syntrix
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IUsersRepository, UsersRepository>();
            builder.Services.AddTransient<IFoldersRepository, FoldersRepository>();
            builder.Services.AddTransient<ITagsRepository, TagsRepository>();
            builder.Services.AddTransient<IFilesRepository, FilesRepository>();
            builder.Services.AddTransient<IFileTagsRepository, FileTagsRepository>();
            builder.Services.AddTransient<IBookmarksRepository, BookmarksRepository>();
            builder.Services.AddTransient<IResourcesRepository, ResourcesRepository>();

            builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
                .AddNegotiate();

            builder.Services.AddAuthorization(options =>
            {
                // By default, all incoming requests will be authorized according to the default policy.
                options.FallbackPolicy = options.DefaultPolicy;
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}