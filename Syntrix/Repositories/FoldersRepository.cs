﻿using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;

namespace Syntrix.Repositories
{
    public class FoldersRepository : BaseRepository, IFoldersRepository
    {
        public FoldersRepository(IConfiguration configuration) : base(configuration) { }


        /*------------------Get Folders by UserId----------------------*/

        public List<DirectoryFolder> GetFoldersByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                        F.[Id] AS FolderId,
                                        F.[Name] AS FolderName,
                                        F.[UserId] AS FolderUserId,
                                        COUNT(fi.FolderId) AS FileCount,
                                        CASE WHEN B.FolderId IS NOT NULL THEN 1 ELSE 0 END AS IsBookmarked
                                    FROM 
                                        [Syntrix].[dbo].[Folders] F
                                    LEFT JOIN 
                                        [Syntrix].[dbo].[Files] fi ON F.[Id] = fi.[FolderId]
                                    LEFT JOIN 
                                        [Syntrix].[dbo].[Bookmarks] B ON F.[Id] = B.[FolderId] AND F.[UserId] = B.[UserId]
                                    WHERE 
                                        F.[UserId] = @UserId
                                    GROUP BY
                                        F.[Id],
                                        F.[Name],
                                        F.[UserId],
                                        B.FolderId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();



                    List<DirectoryFolder> folderList = new List<DirectoryFolder>();
                    while (reader.Read())
                    {
                        var folder = new DirectoryFolder()
                        {
                            Id = DbUtils.GetInt(reader, "FolderId"),
                            Name = DbUtils.GetString(reader, "FolderName"),
                            UserId = DbUtils.GetInt(reader, "FolderUserId"),
                            FileCount = DbUtils.GetInt(reader, "FileCount"),
                            isBookmarked = DbUtils.GetInt(reader, "isBookmarked")
                        };
                        folderList.Add(folder);
                    }
                    reader.Close();
                    return folderList;
                }
            }
        }

        

        /*------------------Get Folders by UserId that are Bookmarked----------------------*/

        public List<DirectoryFolder> GetFoldersByUserIdThatAreBookmarked(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                                            F.[Id] AS FolderId,
                                            F.[Name] AS FolderName,
                                            F.[UserId] AS FolderUserId,
                                            COUNT(fi.FolderId) AS FileCount,
                                            CASE WHEN B.FolderId IS NOT NULL THEN 1 ELSE 0 END AS IsBookmarked
                                        FROM 
                                            [Syntrix].[dbo].[Folders] F
                                        LEFT JOIN 
                                            [Syntrix].[dbo].[Files] fi ON F.[Id] = fi.[FolderId]
                                        LEFT JOIN 
                                            [Syntrix].[dbo].[Bookmarks] B ON F.[Id] = B.[FolderId] AND F.[UserId] = B.[UserId]
                                        WHERE 
                                            F.[UserId] = @UserId
                                        GROUP BY
                                            F.[Id],
                                            F.[Name],
                                            F.[UserId],
                                            B.FolderId
                                        HAVING 
                                            CASE WHEN B.FolderId IS NOT NULL THEN 1 ELSE 0 END = 1";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();



                    List<DirectoryFolder> folderList = new List<DirectoryFolder>();
                    while (reader.Read())
                    {
                        var folder = new DirectoryFolder()
                        {
                            Id = DbUtils.GetInt(reader, "FolderId"),
                            Name = DbUtils.GetString(reader, "FolderName"),
                            UserId = DbUtils.GetInt(reader, "FolderUserId"),
                            FileCount = DbUtils.GetInt(reader, "FileCount"),
                            isBookmarked = DbUtils.GetInt(reader, "isBookmarked")
                        };
                        folderList.Add(folder);
                    }
                    reader.Close();
                    return folderList;
                }
            }
        }



        /*------------------Add Folder----------------------*/

        public void AddFolder(FolderAdd folder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Folders
                        (Name, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @userId)";
                    DbUtils.AddParameter(cmd, "@name", folder.Name);
                    DbUtils.AddParameter(cmd, "@userId", folder.UserId);
                    folder.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Update Folder----------------------*/

        public void UpdateFolder(FoldersEditView folder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [dbo].[Folders]
                                           SET 
                                               [Name] = @Name
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", folder.Id);
                    DbUtils.AddParameter(cmd, "@Name", folder.Name);
                    cmd.ExecuteNonQuery();

                }
            }
        }



        /*------------------Delete Folder----------------------*/

        public void DeleteFolder(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Bookmarks WHERE FolderId = @id; " +
                                        "DELETE FROM FileTags WHERE FileId IN (SELECT Id FROM Files WHERE FolderId = @id); " +
                                        "DELETE FROM Files WHERE FolderId = @id; " +
                                        "DELETE FROM Folders WHERE Id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
