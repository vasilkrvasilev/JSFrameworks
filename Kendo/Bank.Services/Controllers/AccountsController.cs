using Bank.Data;
using Bank.Models;
using Bank.Services.Attributes;
using Bank.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ValueProviders;

namespace Bank.Services.Controllers
{
    public class AccountsController : BaseApiController
    {
        [ActionName("home")]
        public AccountHomeModel GetHome()
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new BankContext();

                var accountEntities = context.Accounts;
                var model = new AccountHomeModel()
                {
                    NumberAccounts = accountEntities.Count(),
                    BalanceAccounts = accountEntities.Sum(a => a.Balance)
                };

                return model;
            });

            return responseMsg;
        }

        [ActionName("logs")]
        public AccountFullModel GetLogs(int id,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new BankContext();

                var accountEntity = context.Accounts.FirstOrDefault(x => x.Id == id);

                if (accountEntity == null)
                {
                    throw new InvalidOperationException("Invalid id");
                }

                var user = context.Users.FirstOrDefault(u => u.SessionKey == sessionKey);
                //var user = context.Users.FirstOrDefault(u => u.Id == 2);
                if (user == null)
                {
                    throw new InvalidOperationException("Invalid sessionKey");
                }

                var model = new AccountFullModel()
                {
                    Id = accountEntity.Id,
                    Balance = accountEntity.Balance,
                    Logs = (from logEntity in accountEntity.Logs
                            select new LogFullModel()
                            {
                                Amount = logEntity.Amount + "",
                                Date = logEntity.Date
                            }).OrderByDescending(l => l.Date)
                };

                return model;
            });

            return responseMsg;
        }

        //public HttpResponseMessage PostNewPost(PostNewModel model)
        //{
        //    var responseMsg = this.PerformOperationAndHandleExceptions(
        //      () =>
        //      {
        //          var context = new BlogSystemContext();
        //          using (context)
        //          {
        //              var user = context.Users.FirstOrDefault(
        //                  usr => usr.SessionKey == sessionKey);
        //              if (user == null)
        //              {
        //                  throw new InvalidOperationException("Invalid sessionKey");
        //              }

        //              if (model.Title == null || model.Text == null)
        //              {
        //                  throw new ArgumentNullException("Post title or post text cannot be null");
        //              }

        //              string[] titleWords = model.Title.Split(
        //                  new char[] { ' ', ',', '.', '!', '?', '\'', '(', ')' }, 
        //                  StringSplitOptions.RemoveEmptyEntries);

        //              IList<Tag> tags = new List<Tag>();
        //              if (model.Tags != null)
        //              {
        //                  foreach (var item in model.Tags)
        //                  {
        //                      var tag = context.Tags.FirstOrDefault(t => t.Name == item.ToLower());
        //                      if (tag == null)
        //                      {
        //                          tag = new Tag()
        //                          {
        //                              Name = item.ToLower()
        //                          };

        //                          context.Tags.Add(tag);
        //                          context.SaveChanges();
        //                      }

        //                      tags.Add(tag);
        //                  }
        //              }

        //              foreach (var item in titleWords)
        //              {
        //                  var tag = context.Tags.FirstOrDefault(t => t.Name == item.ToLower());
        //                  if (tag == null)
        //                  {
        //                      tag = new Tag()
        //                      {
        //                          Name = item.ToLower()
        //                      };

        //                      context.Tags.Add(tag);
        //                      context.SaveChanges();
        //                  }

        //                  tags.Add(tag);
        //              }

        //              var post = new Post()
        //              {
        //                  Title = model.Title,
        //                  Text = model.Text,
        //                  PostDate = DateTime.Now,
        //                  User = user,
        //                  Tags = tags
        //              };

        //              context.Posts.Add(post);
        //              context.SaveChanges();

        //              var createdModel = new PostCreatedModel()
        //              {
        //                  Id = post.Id,
        //                  Title = post.Title
        //              };

        //              var response =
        //                  this.Request.CreateResponse(HttpStatusCode.Created,
        //                                  createdModel);
        //              return response;
        //          }
        //      });

        //    return responseMsg;
        //}

        [ActionName("deposit")]
        public HttpResponseMessage PutDeposit(int id, LogModel model,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var context = new BankContext();
                  using (context)
                  {
                      var account = context.Accounts.FirstOrDefault(x => x.Id == id);

                      if (account == null)
                      {
                          throw new InvalidOperationException("Invalid id");
                      }

                      var user = context.Users.FirstOrDefault(u => u.SessionKey == sessionKey);
                      //var user = context.Users.FirstOrDefault(u => u.Id == 2);
                      if (user == null)
                      {
                          throw new InvalidOperationException("Invalid sessionKey");
                      }

                      decimal amount = decimal.Parse(model.Amount);
                      if (amount <= 0)
                      {
                          throw new ArgumentNullException("Cannot deposit non-positive amount");
                      }

                      account.Balance += amount;
                      var log = new Log()
                      {
                          Account = account,
                          Amount = amount,
                          Date = DateTime.Now
                      };

                      account.Logs.Add(log);
                      context.SaveChanges();

                      var response =
                          this.Request.CreateResponse(HttpStatusCode.OK, "NULL");
                      return response;
                  }
              });

            return responseMsg;
        }

        [ActionName("withdraw")]
        public HttpResponseMessage PutWithdraw(int id, LogModel model,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var context = new BankContext();
                  using (context)
                  {
                      var account = context.Accounts.FirstOrDefault(x => x.Id == id);

                      if (account == null)
                      {
                          throw new InvalidOperationException("Invalid id");
                      }

                      var user = context.Users.FirstOrDefault(u => u.SessionKey == sessionKey);
                      //var user = context.Users.FirstOrDefault(u => u.Id == 2);
                      if (user == null)
                      {
                          throw new InvalidOperationException("Invalid sessionKey");
                      }

                      decimal amount = decimal.Parse(model.Amount);
                      if (amount <= 0 || amount > account.Balance)
                      {
                          throw new ArgumentNullException(
                              "Cannot withdraw non-positive or bigger than current balance amount");
                      }

                      account.Balance -= amount;
                      var log = new Log()
                      {
                          Account = account,
                          Amount = -amount,
                          Date = DateTime.Now
                      };

                      account.Logs.Add(log);
                      context.SaveChanges();

                      var response =
                          this.Request.CreateResponse(HttpStatusCode.OK, "NULL");
                      return response;
                  }
              });

            return responseMsg;
        }
    }
}
