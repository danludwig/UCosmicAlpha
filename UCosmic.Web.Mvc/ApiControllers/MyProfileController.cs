﻿using System;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AttributeRouting;
using AttributeRouting.Web.Http;
using AutoMapper;
using FluentValidation;
using UCosmic.Domain.People;
using UCosmic.Web.Mvc.Models;

namespace UCosmic.Web.Mvc.ApiControllers
{
    [Authorize]
    [RoutePrefix("api/my/profile")]
    public class MyProfileController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;
        private readonly IHandleCommands<UpdateMyProfile> _updateHandler;

        public MyProfileController(IProcessQueries queryProcessor
            , IHandleCommands<UpdateMyProfile> updateHandler
        )
        {
            _queryProcessor = queryProcessor;
            _updateHandler = updateHandler;
        }

        [GET("")]
        public MyProfileApiModel Get()
        {
            //throw new HttpResponseException(HttpStatusCode.BadRequest); // test API failure

            var person = _queryProcessor.Execute(new MyPerson(User)
            {
                EagerLoad = new Expression<Func<Person, object>>[]
                {
                    x => x.Employee,
                }
            });

            // throw 404 if route does not match existing record
            if (person == null) throw new HttpResponseException(HttpStatusCode.NotFound);

            // only need the destination type int he Map generic argument.
            // the source type is implicit based on the method argument.
            var model = Mapper.Map<MyProfileApiModel>(person);

            return model;
        }

        [PUT("")]
        public HttpResponseMessage Put(MyProfileApiModel model)
        {
            //var person = _queryProcessor.Execute(new MyPerson(User));

            var command = new UpdateMyProfile(User);
            Mapper.Map(model, command);

            try
            {
                _updateHandler.Handle(command);
            }
            catch (ValidationException ex)
            {
                var badRequest = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message, "text/plain");
                return badRequest;
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Personal information was successfully updated.");
        }

        [POST("photo")]
        public HttpResponseMessage PostPhoto(FileMedia photo)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Photo was successfully uploaded.");
        }
    }
}