using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Syntrix.Models;
using Syntrix.Repositories;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace Syntrix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }


        [HttpGet("Login/{email}/{password}")]
        public IActionResult LoginUser(string email, string password)
        {
            Users user = _usersRepository.ValidateUser(email);

            if(user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            if(!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Unauthorized("Invalid credentials");
            }
            else
            {
                user.Password = "";
                return Ok(user);
            }
        }

        [HttpGet("/GetUser/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
            var user = _usersRepository.GetUserById(userId);
            if (user == null)
            {
                return NotFound($"{userId} Not Found!");
            }
            else
            {
                user.Password = "";
                return Ok(user);
            }

        }


        [HttpPost("/AddUser")]
        public IActionResult AddUser(Users user)
        {
            if (user == null)
            {
                return BadRequest(new { message = "Missing User Data" }); 
            }

            var isValidEmail = _usersRepository.isEmailAvailable(user.Email);

            if(isValidEmail == false)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var newUser = new Users
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Title = user.Title,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password)
            };

            _usersRepository.AddUser(newUser);



            newUser.Password = "";
            return Created("", newUser);
        }


        [HttpPost("/EditUser/{id}")]
        public IActionResult UpdateUser(int id, UsersEditView user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _usersRepository.UpdateUser(user);
            return Ok(user);
        }



    }

}
