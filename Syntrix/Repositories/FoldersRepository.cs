using Syntrix.Models;
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

        public List<Folders> GetFoldersByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
		                                    [Folders].[Id] AS FolderId,
		                                    [Folders].[Name] AS FolderName,
		                                    [Folders].[UserId] AS FolderUserId
                                        FROM [Syntrix].[dbo].[Folders]
                                            WHERE [Folders].[UserId] = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();



                    List<Folders> folderList = new List<Folders>();
                    while (reader.Read())
                    {
                        var folder = new Folders()
                        {
                            Id = DbUtils.GetInt(reader, "FolderId"),
                            Name = DbUtils.GetString(reader, "FolderName"),
                            UserId = DbUtils.GetInt(reader, "FolderUserId"),
                        };
                        folderList.Add(folder);
                    }
                    reader.Close();
                    return folderList;
                }
            }
        }



        /*------------------Add Folder----------------------*/

        public void AddFolder(Folders folder)
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
                    cmd.CommandText = "DELETE FROM Folders WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
