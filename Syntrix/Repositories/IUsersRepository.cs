using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IUsersRepository
    {
        void AddUser(Users users);
        Users GetUserById(int userId);
        bool isEmailAvailable(string Email);
        void UpdateUser(UsersEditView users);
        Users ValidateUser(string email);
    }
}