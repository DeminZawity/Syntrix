using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IUsersRepository
    {
        void AddUser(Users users);
        void UpdateUser(Users users);
        Users ValidateUser(string email);
        Boolean isEmailAvailable(string Email);
    }
}