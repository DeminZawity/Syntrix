namespace Syntrix.Models
{
    public class Bookmarks
    {
        public int Id { get; set; }
        public int FolderId { get; set; }
        public int UserId { get; set; }

    }
    public class BookmarksDTO
    {
        public int Id { get; set; }
        public int FolderId { get; set; }
        public int UserId { get; set; }
        public string FolderName { get; set; }
        public int? FileCount { get; set; }
    }
}
