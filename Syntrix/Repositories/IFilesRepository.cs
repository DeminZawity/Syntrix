using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFilesRepository
    {
        void AddFile(Files file);
        void DeleteFile(int id);
        List<Files> GetAllPublicFiles();
        Files GetFileById(int fileId);
        List<Files> GetFilesByFolderId(int folderId);
        List<Files> SearchPublicFilesByName(string name);
        void UpdateFile(FilesEditView file);
    }
}