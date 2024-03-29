﻿namespace Syntrix.Models
{
    public class Resources
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Link { get; set; }

    }

    public class ResourcesEditView
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Link { get; set; }

    }
}
