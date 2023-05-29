using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IUsersRepository
    {
        void AddUser(Users users);
        Users GetUserById(int userId);
        bool isEmailAvailable(string Email);
        void UpdateUser(Users users);
        Users ValidateUser(string email);
    }
}