using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;

namespace Syntrix.Repositories
{
    public class FileTagsRepository : BaseRepository, IFileTagsRepository
    {
        public FileTagsRepository(IConfiguration configuration) : base(configuration) { }


        /*------------------Get FileTags by FileId----------------------*/

        public List<FileTagsDTO> GetFileTagsByFileId(int fileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            [FileTags].[Id] AS FileTagId,
                                            [Tags].Name AS TagName,
                                            [Tags].Color AS TagColor
                                        FROM [Syntrix].[dbo].[FileTags]
                                        JOIN [Files] on [FileTags].[FileId] = [Files].[Id]
                                        JOIN [Tags] on [FileTags].[TagId] = [Tags].[Id]
                                        WHERE [FileTags].[FileId] = @FileId";
                    DbUtils.AddParameter(cmd, "@FileId", fileId);
                    var reader = cmd.ExecuteReader();

                    List<FileTagsDTO> fileTagsList = new List<FileTagsDTO>();
                    while (reader.Read())
                    {
                        var fileTag = new FileTagsDTO()
                        {
                            Id = DbUtils.GetInt(reader, "FileTagId"),
                            TagName = DbUtils.GetString(reader, "TagName"),
                            FileColor = DbUtils.GetString(reader, "TagColor"),
                        };
                        fileTagsList.Add(fileTag);
                    }
                    reader.Close();
                    return fileTagsList;
                }
            }
        }



        /*------------------Add FileTag----------------------*/

        public void AddFileTag(FileTags fileTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO FileTags
                        (TagId, FileId)
                        OUTPUT INSERTED.ID
                        VALUES (@tagId, @fileId)";
                    DbUtils.AddParameter(cmd, "@tagId", fileTag.TagId);
                    DbUtils.AddParameter(cmd, "@fileId", fileTag.FileId);
                    fileTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Delete FileTag----------------------*/

        public void DeleteFileTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM FileTags WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
