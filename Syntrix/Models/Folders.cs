namespace Syntrix.Models
{
    public class Folders
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int? FileCount { get; set; }
    }

    public class DirectoryFolder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int? FileCount { get; set; }

        public int isBookmarked { get; set; }
    }

    public class FoldersEditView
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class FolderAdd
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
    }
}
