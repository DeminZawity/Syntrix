namespace Syntrix.Models
{
    public class Folders
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
    }

    public class FoldersEditView
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
