using Syntrix.Models;
using Syntrix.Utils;

namespace Syntrix.Repositories
{
    public class BookmarksRepository : BaseRepository, IBookmarksRepository
    {
        public BookmarksRepository(IConfiguration configuration) : base(configuration) { }


        /*------------------Get Bookmarks by UserId----------------------*/

        public List<Bookmarks> GetBookmarksByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
		                                    [Bookmarks].[Id] AS BookmarkId,
		                                    [Bookmarks].[FolderId] AS BookmarkFolderId,
		                                    [Bookmarks].[UserId] AS BookmarkUserId
                                        FROM [Syntrix].[dbo].[Bookmarks]
                                            WHERE [Bookmarks].[UserId] = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();

                    List<Bookmarks> bookmarksList = new List<Bookmarks>();
                    while (reader.Read())
                    {
                        var bookmark = new Bookmarks()
                        {
                            Id = DbUtils.GetInt(reader, "BookmarkId"),
                            FolderId = DbUtils.GetInt(reader, "BookmarkFolderId"),
                            UserId = DbUtils.GetInt(reader, "BookmarkUserId"),
                        };
                        bookmarksList.Add(bookmark);
                    }
                    reader.Close();
                    return bookmarksList;
                }
            }
        }



        /*------------------Add Bookmark----------------------*/

        public void AddBookmark(Bookmarks bookmark)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bookmarks
                        (FolderId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@folderId, @userId)";
                    DbUtils.AddParameter(cmd, "@folderId", bookmark.FolderId);
                    DbUtils.AddParameter(cmd, "@userId", bookmark.UserId);
                    bookmark.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Delete Bookmark----------------------*/

        public void DeleteBookmark(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Bookmarks WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
