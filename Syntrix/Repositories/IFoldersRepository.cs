using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFoldersRepository
    {
        void AddFolder(Folders folder);
        void DeleteFolder(int id);
        List<Folders> GetFoldersByUserId(int userId);
        void UpdateFolder(Folders folder);
    }
}