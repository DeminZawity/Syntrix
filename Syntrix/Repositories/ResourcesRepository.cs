using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;

namespace Syntrix.Repositories
{
    public class ResourcesRepository : BaseRepository, IResourcesRepository
    {
        public ResourcesRepository(IConfiguration configuration) : base(configuration) { }



        /*------------------Get Resources by UserId----------------------*/

        public List<Resources> GetResourcesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
		                                    [Resources].[Id] AS ResourcesId,
		                                    [Resources].[UserId] AS ResourcesUserId,
		                                    [Resources].[Name] AS ResourcesName,
		                                    [Resources].[Description] AS ResourcesDescription,
		                                    [Resources].[Link] AS ResourcesLink,
		                                    [Resources].[IsPublic] AS ResourcesIsPublic
                                        FROM [Syntrix].[dbo].[Resources]
                                        WHERE [Resources].[UserId] = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();

                    List<Resources> resourcesList = new List<Resources>();
                    while (reader.Read())
                    {
                        var resource = new Resources()
                        {
                            Id = DbUtils.GetInt(reader, "ResourcesId"),
                            UserId = DbUtils.GetInt(reader, "ResourcesUserId"),
                            Name = DbUtils.GetString(reader, "ResourcesName"),
                            Description = DbUtils.GetString(reader, "ResourcesDescription"),
                            Link = DbUtils.GetString(reader, "ResourcesLink"),
                            IsPublic = DbUtils.GetBoolean(reader, "ResourcesIsPublic"),
                        };
                        resourcesList.Add(resource);
                    }
                    reader.Close();
                    return resourcesList;
                }
            }
        }



        /*------------------Add Resource----------------------*/

        public void AddResource(Resources resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Resources
                        (UserId, Name, Description, Link, IsPublic)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @name, @description, @link, @isPublic)";
                    DbUtils.AddParameter(cmd, "@userId", resource.UserId);
                    DbUtils.AddParameter(cmd, "@name", resource.Name);
                    DbUtils.AddParameter(cmd, "@description", resource.Description);
                    DbUtils.AddParameter(cmd, "@link", resource.Link);
                    DbUtils.AddParameter(cmd, "@isPublic", resource.IsPublic);
                    resource.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Update Resource----------------------*/

        public void UpdateResource(ResourcesEditView resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [dbo].[Resources]
                                           SET
                                               [Name] = @Name,
                                               [Description] = @Description,
                                               [Link] = @Link,
                                               [IsPublic] = @IsPublic
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", resource.Id);
                    DbUtils.AddParameter(cmd, "@Name", resource.Name);
                    DbUtils.AddParameter(cmd, "@Description", resource.Description);
                    DbUtils.AddParameter(cmd, "@Link", resource.Link);
                    DbUtils.AddParameter(cmd, "@IsPublic", resource.IsPublic);
                    cmd.ExecuteNonQuery();

                }
            }
        }



        /*------------------Delete Resource----------------------*/

        public void DeleteResource(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Resources WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
