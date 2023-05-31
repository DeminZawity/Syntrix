using Syntrix.Models;
using Syntrix.Utils;

namespace Syntrix.Repositories
{
    public class BookmarksRepository : BaseRepository, IBookmarksRepository
    {
        public BookmarksRepository(IConfiguration configuration) : base(configuration) { }


        /*------------------Get Bookmarks by UserId----------------------*/

        public List<BookmarksDTO> GetBookmarksByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            [Bookmarks].[Id] AS BookmarkId,
                                            [Bookmarks].[FolderId] AS BookmarkFolderId,
                                            [Bookmarks].[UserId] AS BookmarkUserId,
                                            [Folders].[Name] AS FolderName,
                                            [Folders].[UserId] AS FolderUserId,
                                            COUNT([Files].[Id]) AS FileCount
                                        FROM [Syntrix].[dbo].[Bookmarks]
                                        INNER JOIN [Syntrix].[dbo].[Folders]
                                            ON [Bookmarks].[FolderId] = [Folders].[Id]
                                        LEFT JOIN [Syntrix].[dbo].[Files]
                                            ON [Folders].[Id] = [Files].[FolderId]
                                        WHERE [Bookmarks].[UserId] = @UserId
                                        GROUP BY 
                                            [Bookmarks].[Id],
                                            [Bookmarks].[FolderId],
                                            [Bookmarks].[UserId],
                                            [Folders].[Name],
                                            [Folders].[UserId];";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();

                    List<BookmarksDTO> bookmarksList = new List<BookmarksDTO>();
                    while (reader.Read())
                    {
                        var bookmark = new BookmarksDTO()
                        {
                            Id = DbUtils.GetInt(reader, "BookmarkId"),
                            FolderId = DbUtils.GetInt(reader, "BookmarkFolderId"),
                            UserId = DbUtils.GetInt(reader, "BookmarkUserId"),
                            FolderName = DbUtils.GetString(reader, "FolderName"),
                            FileCount = DbUtils.GetInt(reader, "FileCount"),
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
