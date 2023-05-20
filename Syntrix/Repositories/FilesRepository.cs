using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;

namespace Syntrix.Repositories
{
    public class FilesRepository : BaseRepository, IFilesRepository
    {
        public FilesRepository(IConfiguration configuration) : base(configuration) { }

        /*------------------Get Files by FolderId----------------------*/

        public List<Files> GetFilesByFolderId(int folderId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            [Files].[Id] AS FileId,
                                            [Files].[Name] AS FileName,
                                            [Files].[FolderId] AS FileFolderId,
                                            [Files].[Description] AS FileDescription,
                                            [Files].[Content] AS FileContent,
                                            [Files].[IsPublic] AS FileIsPublic
                                        FROM [Syntrix].[dbo].Files
                                        WHERE [Files].[FolderId] = @FolderId";

                    DbUtils.AddParameter(cmd, "@FolderId", folderId);
                    var reader = cmd.ExecuteReader();



                    List<Files> fileList = new List<Files>();
                    while (reader.Read())
                    {
                        var file = new Files()
                        {
                            Id = DbUtils.GetInt(reader, "FileId"),
                            Name = DbUtils.GetString(reader, "FileName"),
                            FolderId = DbUtils.GetInt(reader, "FileFolderId"),
                            Description = DbUtils.GetString(reader, "FileDescription"),
                            Content = DbUtils.GetString(reader, "FileContent"),
                            IsPublic = DbUtils.GetBoolean(reader, "FileIsPublic"),
                        };
                        fileList.Add(file);
                    }
                    reader.Close();
                    return fileList;
                }
            }
        }



        /*------------------Add Files----------------------*/

        public void AddFile(Files file)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Files
                        (Name, FolderId, Description, Content, IsPublic)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @folderId, @description, @content, @isPublic)";
                    DbUtils.AddParameter(cmd, "@name", file.Name);
                    DbUtils.AddParameter(cmd, "@folderId", file.FolderId);
                    DbUtils.AddParameter(cmd, "@description", file.Description);
                    DbUtils.AddParameter(cmd, "@content", file.Content);
                    DbUtils.AddParameter(cmd, "@isPublic", file.IsPublic);
                    file.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Update Files----------------------*/

        public void UpdateFile(FilesEditView file)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [dbo].[Files]
                                           SET 
                                               [Name] = @Name,
                                               [Description] = @Description,
                                               [Content] = @Content,
                                               [IsPublic] = @IsPublic
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", file.Id);
                    DbUtils.AddParameter(cmd, "@Name", file.Name);
                    DbUtils.AddParameter(cmd, "@Description", file.Description);
                    DbUtils.AddParameter(cmd, "@Content", file.Content);
                    DbUtils.AddParameter(cmd, "@IsPublic", file.IsPublic);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        /*------------------Delete Files----------------------*/

        public void DeleteFile(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Files WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
