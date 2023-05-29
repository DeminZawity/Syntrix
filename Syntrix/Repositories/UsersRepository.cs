using Syntrix.Models;
using Syntrix.Repositories;
using Syntrix.Utils;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using static System.Reflection.Metadata.BlobBuilder;

namespace Syntrix.Repositories
{
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(IConfiguration configuration) : base(configuration) { }



        /*------------------Check User Email Exists----------------------*/

        public Boolean isEmailAvailable(string Email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT ID FROM USERS WHERE EMAIL=@Email";
                    DbUtils.AddParameter(cmd, "@Email", Email);

                    var reader = cmd.ExecuteReader();


                    var isValid = reader.HasRows == false;

                    return isValid;
                }
            }
        }


        /*------------------Add User----------------------*/

        public void AddUser(Users users)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users
                        (FirstName, LastName, Email, Password, Title)
                        OUTPUT INSERTED.ID
                        VALUES (@firstName, @lastName, @email, @password, @title)";
                    DbUtils.AddParameter(cmd, "@firstName", users.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", users.LastName);
                    DbUtils.AddParameter(cmd, "@email", users.Email);
                    DbUtils.AddParameter(cmd, "@password", users.Password);
                    DbUtils.AddParameter(cmd, "@title", users.Title);
                    users.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        /*------------------Update User----------------------*/

        public void UpdateUser(Users users)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [dbo].[Users]
                                           SET 
                                               [FirstName] = @FirstName
                                              ,[LastName] = @LastName
                                              ,[Email] = @Email
                                              ,[Title] = @Title
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", users.Id);
                    DbUtils.AddParameter(cmd, "@FirstName", users.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", users.LastName);
                    DbUtils.AddParameter(cmd, "@Email", users.Email);
                    DbUtils.AddParameter(cmd, "@Title", users.Title);
                    cmd.ExecuteNonQuery();

                }
            }
        }



        /*------------------Validate User----------------------*/

        public Users ValidateUser(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * from [dbo].[Users]
                                        WHERE Email = @Email";
                    DbUtils.AddParameter(cmd, "@Email", email);
                    var reader = cmd.ExecuteReader();
                    Users user = null;
                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Password = DbUtils.GetString(reader, "Password"),
                                Title = DbUtils.GetString(reader, "Title"),
                            };
                        }
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        /*------------------Get User by Id----------------------*/


        public Users GetUserById(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * from [dbo].[Users]
                                        WHERE Id = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    var reader = cmd.ExecuteReader();
                    Users user = null;
                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = new Users()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Password = DbUtils.GetString(reader, "Password"),
                                Title = DbUtils.GetString(reader, "Title"),
                            };
                        }
                    }
                    reader.Close();
                    return user;

                }
            }
        }
    }



}
