using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;


namespace Syntrix.Repositories
{
    public class TagsRepository : BaseRepository, ITagsRepository
    {
        public TagsRepository(IConfiguration configuration) : base(configuration) { }




        /*------------------Search Tags by UserId----------------------*/

        public List<Tags> GetTagsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        [Tags].[Id] AS TagsId,
	                                        [Tags].[Name] AS TagsName,
	                                        [Tags].[Color] AS TagsColor,
	                                        [Tags].[UserId] AS TagsUserId
                                        FROM [Syntrix].[dbo].[Tags]
                                        WHERE [Tags].[UserId] = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();



                    List<Tags> TagsList = new List<Tags>();
                    while (reader.Read())
                    {
                        var tag = new Tags()
                        {
                            Id = DbUtils.GetInt(reader, "TagsId"),
                            Name = DbUtils.GetString(reader, "TagsName"),
                            Color = DbUtils.GetString(reader, "TagsColor"),
                            UserId = DbUtils.GetInt(reader, "TagsUserId"),
                        };
                        TagsList.Add(tag);
                    }
                    reader.Close();
                    return TagsList;
                }
            }
        }



        /*------------------Add Tags----------------------*/

        public void AddTag(Tags tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tags
                        (Name, Color, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @color, @userId)";
                    DbUtils.AddParameter(cmd, "@name", tag.Name);
                    DbUtils.AddParameter(cmd, "@color", tag.Color);
                    DbUtils.AddParameter(cmd, "@userId", tag.UserId);
                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Update Tag----------------------*/

        public void UpdateTag(Tags tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [dbo].[Tags]
                                           SET 
                                               [Name] = @Name,
                                               [Color] = @Color
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", tag.Id);
                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Color", tag.Color);
                    cmd.ExecuteNonQuery();

                }
            }
        }



        /*------------------Delete Tag----------------------*/

        public void DeleteTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tags WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
