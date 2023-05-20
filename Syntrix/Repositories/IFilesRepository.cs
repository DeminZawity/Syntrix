using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFilesRepository
    {
        void AddFile(Files file);
        void DeleteFile(int id);
        List<Files> GetFilesByFolderId(int folderId);
        void UpdateFile(FilesEditView file);
    }
}