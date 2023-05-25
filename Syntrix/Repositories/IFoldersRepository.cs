using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFoldersRepository
    {
        void AddFolder(FolderAdd folder);
        void DeleteFolder(int id);
        List<Folders> GetFoldersByUserId(int userId);
        void UpdateFolder(FoldersEditView folder);
    }
}