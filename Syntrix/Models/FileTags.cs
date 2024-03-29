﻿namespace Syntrix.Models
{
    public class FileTags
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int FileId { get; set; }

    }

    public class MultiFileTag
    {
        public int Id { get; set; }
        public int FileId { get; set; }

        public List<int>? TagIds { get; set; }
    }
    public class FileTagsDTO
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public string FileColor { get; set; }

    }

    public class FileTagWithFileTagID
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public string TagName { get; set; }
        public string FileColor { get; set; }

    }
}
