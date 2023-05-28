using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IFileTagsRepository
    {
        void AddFileTag(FileTags fileTag);

        void AddMultipleFileTag(MultiFileTag fileTag);
        void DeleteFileTag(int id);
        List<FileTagWithFileTagID> GetFileTagsByFileId(int fileId);
    }
}