using BlogSystem.Services.Attributes;
using Forum.Data;
using Forum.Models;
using Forum.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ValueProviders;

namespace Forum.Services.Controllers
{
    public class PostsController : BaseApiController
    {
        public IQueryable<PostModel> GetAll()
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new ForumContext();

                var postEntities = context.Posts;
                var models =
                    (from postEntity in postEntities
                     select new PostModel()
                     {
                         Id = postEntity.Id,
                         Title = postEntity.Title,
                         CreatedOn = postEntity.CreatedOn,
                         Creator = postEntity.Creator.Username,
                         Tags = (from tagEntity in postEntity.Tags
                                 select tagEntity.Name),
                         NumberComments = postEntity.Comments.Count
                     });
                return models.OrderByDescending(p => p.CreatedOn);
            });

            return responseMsg;
        }

        public IQueryable<PostModel> GetByTags(string tags)
        {
            string[] tagNames = tags.Split(',');
            var models = this.GetAll()
                .Where(p => !tagNames.Any(n => !p.Tags.Contains(n)));
            return models;
        }

        public PostModel Get(int id)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new ForumContext();

                var postEntity = context.Posts.FirstOrDefault(x => x.Id == id);

                if (postEntity == null)
                {
                    throw new InvalidOperationException("Invalid id");
                }

                var model = new PostFullModel()
                     {
                         Id = postEntity.Id,
                         Title = postEntity.Title,
                         CreatedOn = postEntity.CreatedOn,
                         Creator = postEntity.Creator.Username,
                         NumberComments = postEntity.Comments.Count,
                         Content = postEntity.Content,
                         Tags = (from tagEntity in postEntity.Tags
                                 select tagEntity.Name),
                         Comments = (from commentEntity in postEntity.Comments
                                  select new CommentFullModel()
                                  {
                                      Text = commentEntity.Text,
                                      CreatedOn = commentEntity.CreatedOn,
                                      Creator = commentEntity.Creator.Username
                                  })
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

        //[ActionName("comment")]
        public HttpResponseMessage PutComment(int id, CommentModel model,
            [ValueProvider(typeof(HeaderValueProviderFactory<string>))] string sessionKey)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var context = new ForumContext();
                  using (context)
                  {
                      var post = context.Posts.FirstOrDefault(p => p.Id == id);

                      if (post == null)
                      {
                          throw new InvalidOperationException("Invalid id");
                      }

                      var user = context.Users.FirstOrDefault(u => u.SessionKey == sessionKey);
                      //var user = context.Users.FirstOrDefault(u => u.Id == 2);
                      if (user == null)
                      {
                          throw new InvalidOperationException("Invalid sessionKey");
                      }

                      if (model.Text == null)
                      {
                          throw new ArgumentNullException("Comment text cannot be null");
                      }

                      var comment = new Comment()
                      {
                          Text = model.Text,
                          Creator = user,
                          CreatedOn = DateTime.Now,
                          Post = post
                      };

                      context.Comments.Add(comment);
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
