namespace Syntrix.Models
{
    public class Resources
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Link { get; set; }
        public Boolean IsPublic { get; set; }

    }
}
