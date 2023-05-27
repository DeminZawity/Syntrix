using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface ITagsRepository
    {
        void AddTag(Tags tag);
        void DeleteTag(int id);
        List<Tags> GetTagsByUserId(int userId);
        void UpdateTag(TagsEditView tag);
    }
}