﻿using Syntrix.Models;
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
                                            [Files].[CodeType] AS FileCodeType,
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
                            CodeType = DbUtils.GetString(reader, "FileCodeType"),
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




        /*------------------Get File by Id----------------------*/


        public Files GetFileById(int fileId)
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
                                            [Files].[CodeType] AS FileCodeType,
                                            [Files].[Description] AS FileDescription,
                                            [Files].[Content] AS FileContent,
                                            [Files].[IsPublic] AS FileIsPublic
                                        FROM [Syntrix].[dbo].Files
                                        WHERE [Files].[Id] = @FileId";

                    DbUtils.AddParameter(cmd, "@FileId", fileId);
                    var reader = cmd.ExecuteReader();
                    Files file = null;
                    while (reader.Read())
                    {
                        if (file == null)
                        {
                            file = new Files()
                            {
                                Id = DbUtils.GetInt(reader, "FileId"),
                                Name = DbUtils.GetString(reader, "FileName"),
                                FolderId = DbUtils.GetInt(reader, "FileFolderId"),
                                CodeType = DbUtils.GetString(reader, "FileCodeType"),
                                Description = DbUtils.GetString(reader, "FileDescription"),
                                Content = DbUtils.GetString(reader, "FileContent"),
                                IsPublic = DbUtils.GetBoolean(reader, "FileIsPublic"),
                            };
                        }
                    }
                    reader.Close();
                    return file;

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
                        (Name, FolderId, CodeType, Description, Content, IsPublic)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @folderId, @codeType, @description, @content, @isPublic)";
                    DbUtils.AddParameter(cmd, "@name", file.Name);
                    DbUtils.AddParameter(cmd, "@folderId", file.FolderId);
                    DbUtils.AddParameter(cmd, "@codeType", file.CodeType);
                    DbUtils.AddParameter(cmd, "@description", file.Description);
                    DbUtils.AddParameter(cmd, "@content", file.Content);
                    DbUtils.AddParameter(cmd, "@isPublic", file.IsPublic);
                    file.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Search Public Files by Name----------------------*/

        public List<Files> SearchPublicFilesByName(string name)
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
                                            [Files].[CodeType] AS FileCodeType,
                                            [Files].[Description] AS FileDescription,
                                            [Files].[Content] AS FileContent,
                                            [Files].[IsPublic] AS FileIsPublic
                                        FROM [Syntrix].[dbo].[Files]
                                        WHERE [Files].[IsPublic] = 1 AND [Files].[Name] LIKE '%' + @Name + '%'";
                    DbUtils.AddParameter(cmd, "@Name", name);
                    var reader = cmd.ExecuteReader();
                    List<Files> filesList = new List<Files>();
                    while (reader.Read())
                    {
                        var file = new Files()
                        {
                            Id = DbUtils.GetInt(reader, "FileId"),
                            Name = DbUtils.GetString(reader, "FileName"),
                            FolderId = DbUtils.GetInt(reader, "FileFolderId"),
                            CodeType = DbUtils.GetString(reader, "FileCodeType"),
                            Description = DbUtils.GetString(reader, "FileDescription"),
                            Content = DbUtils.GetString(reader, "FileContent"),
                            IsPublic = DbUtils.GetBoolean(reader, "FileIsPublic"),
                        };
                        filesList.Add(file);
                    }
                    reader.Close();
                    return filesList;
                }
            }
        }



        /*------------------Get All Public Files----------------------*/

        public List<Files> GetAllPublicFiles()
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
                                            [Files].[CodeType] AS FileCodeType,
                                            [Files].[Description] AS FileDescription,
                                            [Files].[Content] AS FileContent,
                                            [Files].[IsPublic] AS FileIsPublic
                                        FROM [Syntrix].[dbo].[Files]
                                        WHERE [Files].[IsPublic] = 1";
                    var reader = cmd.ExecuteReader();
                    var filesList = new List<Files>();
                    while (reader.Read())
                    {
                        var file = new Files()
                        {
                            Id = DbUtils.GetInt(reader, "FileId"),
                            Name = DbUtils.GetString(reader, "FileName"),
                            FolderId = DbUtils.GetInt(reader, "FileFolderId"),
                            CodeType = DbUtils.GetString(reader, "FileCodeType"),
                            Description = DbUtils.GetString(reader, "FileDescription"),
                            Content = DbUtils.GetString(reader, "FileContent"),
                            IsPublic = DbUtils.GetBoolean(reader, "FileIsPublic"),
                        };
                        filesList.Add(file);
                    }
                    conn.Close();
                    return filesList;
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
                                               [CodeType] = @CodeType,
                                               [Content] = @Content,
                                               [IsPublic] = @IsPublic
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", file.Id);
                    DbUtils.AddParameter(cmd, "@Name", file.Name);
                    DbUtils.AddParameter(cmd, "@Description", file.Description);
                    DbUtils.AddParameter(cmd, "@CodeType", file.CodeType);
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
                    cmd.CommandText = "DELETE FROM FileTags WHERE FileId = @id; DELETE FROM Files WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
