using Syntrix.Models;

namespace Syntrix.Repositories
{
    public interface IBookmarksRepository
    {
        void AddBookmark(Bookmarks bookmark);
        void DeleteBookmark(int id);
        List<BookmarksDTO> GetBookmarksByUserId(int userId);
    }
}