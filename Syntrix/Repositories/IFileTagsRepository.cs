using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFileTagsRepository
    {
        void AddFileTag(FileTags fileTag);
        void DeleteFileTag(int id);
        List<FileTagsDTO> GetFileTagsByFileId(int fileId);
    }
}