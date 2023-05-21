namespace Syntrix.Models
{
    public class Files
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FolderId { get; set; }
        public string CodeType { get; set; }
        public string? Description { get; set; }
        public string Content { get; set; }
        public Boolean IsPublic { get; set; }

    }

    public class FilesEditView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CodeType { get; set; }
        public string? Description { get; set; }
        public string Content { get; set; }
        public Boolean IsPublic { get; set; }

    }
}
