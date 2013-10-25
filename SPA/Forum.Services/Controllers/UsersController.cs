using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Forum.Services.Models;
using Forum.Data;
using Forum.Models;
using System.Web.Http.ValueProviders;
using BlogSystem.Services.Attributes;

namespace Forum.Services.Controllers
{
    public class UsersController : BaseApiController
    {
        private const int SessionKeyLength = 50;

        private readonly Random rand = new Random();
        private const string SessionKeyChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

//{
//"username": "ssssss",
//"authCode": "bfff2dd4f1d310eb0dbf593bd83f94dd8d34077s"
//}

        [HttpPost, ActionName("register")]
        public HttpResponseMessage PostRegisterUser(UserModel model)
        {
            return this.PerformOperationAndHandleExceptions(() =>
            {
                var usernameToLower = model.Username.ToLower();
                var context = new ForumContext();
                using (context)
                {
                    var entity = context.Users.FirstOrDefault(u => u.Username == usernameToLower);
                    if (entity != null)
                    {
                        string responseMessage = "Username already taken";

                        HttpResponseMessage errResponse = 
                            this.Request.CreateErrorResponse(HttpStatusCode.Conflict, responseMessage);
                        throw new HttpResponseException(errResponse);
                    }

                    var user = new User()
                    {
                        Username = model.Username.ToLower(),
                        AuthCode = model.AuthCode
                    };

                    context.Users.Add(user);
                    context.SaveChanges();
                    return this.PostLoginUser(model);
                }
            });
        }

        [HttpPost, ActionName("login")]
        public HttpResponseMessage PostLoginUser(UserModel model)
        {
            return this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new ForumContext();
                using (context)
                {
                    var usernameToLower = model.Username.ToLower();
                    var entity = context.Users.SingleOrDefault(u => u.Username == usernameToLower && 
                        u.AuthCode == model.AuthCode);
                    if (entity == null)
                    {
                        var errResponse = this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, 
                            "Invalid username or password");
                        throw new HttpResponseException(errResponse);
                    }

                    entity.SessionKey = this.GenerateSessionKey(entity.Id);

                    context.SaveChanges();
                    var responseModel = new UserLoggedModel()
                    {
                        Username = entity.Username,
                        SessionKey = entity.SessionKey
                    };

                    var response = this.Request.CreateResponse(HttpStatusCode.Accepted, responseModel);
                    return response;
                }
            });
        }

        [HttpPut, ActionName("logout")]
        public HttpResponseMessage PutLogoutUser(
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var context = new ForumContext();
                  using (context)
                  {
                      var user = context.Users.FirstOrDefault(
                          u => u.SessionKey == sessionKey);

                      if (user == null)
                      {
                          throw new InvalidOperationException("Invalid sessionKey");
                      }

                      user.SessionKey = null;
                      context.SaveChanges();

                      var response =
                          this.Request.CreateResponse(HttpStatusCode.OK);
                      return response;
                  }
              });

            return responseMsg;
        }

        private string GenerateSessionKey(int userId)
        {
            StringBuilder keyBuilder = new StringBuilder(50);
            keyBuilder.Append(userId);
            while (keyBuilder.Length < SessionKeyLength)
            {
                var index = rand.Next(SessionKeyChars.Length);
                keyBuilder.Append(SessionKeyChars[index]);
            }
            return keyBuilder.ToString();
        }
    }
}