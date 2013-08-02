﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq.Expressions;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using AttributeRouting;
using AttributeRouting.Web.Http;
using AutoMapper;
using UCosmic.Domain.Agreements;
using UCosmic.Web.Mvc.Models;

namespace UCosmic.Web.Mvc.ApiControllers
{
    [RoutePrefix("api/agreements")]
    public class AgreementContactsController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;

        public AgreementContactsController(IProcessQueries queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [GET("{agreementId:int}/contacts")]
        public IEnumerable<AgreementContactApiModel> Get(int agreementId, [FromUri] bool useTestData = false)
        {
            var entities = _queryProcessor.Execute(new ContactsByAgreementId(User, agreementId)
            {
                EagerLoad = new Expression<Func<AgreementContact, object>>[]
                {
                    x => x.Person.Emails,
                    x => x.PhoneNumbers,
                }
            });

            var models = Mapper.Map<AgreementContactApiModel[]>(entities);

            #region TestData

            if (useTestData)
            {
                models = new[]
                {
                    new AgreementContactApiModel
                    {
                        Type = "Home Principal", 
                        Id = 2,
                        PersonId = 44,
                        DisplayName = "Arya Stark",
                        Salutation = "Ms.",
                        FirstName = "arya",
                        MiddleName = "middle2",
                        LastName = "stark",
                        Suffix = "Sr.",
                        EmailAddress = "asdf@as.as22",
                        Title = "job2",
                        Phones = new[]
                        {
                            new AgreementContactPhoneApiModel
                            {
                                ContactId = 2, Type = "work", Value = "3213456452",
                            },
                            new AgreementContactPhoneApiModel
                            {
                                ContactId = 2, Type = "home", Value = "321345",
                            }
                        },
                    },
                    new AgreementContactApiModel
                    {
                        Type = "Home Secondary",
                        Id = 3,
                        PersonId = 45,
                        DisplayName = "Rob Stark",
                        Salutation = "Mr.",
                        FirstName = "Rob",
                        MiddleName = "middle2",
                        LastName = "stark",
                        Suffix = "Sr.",
                        EmailAddress = "111asdf@as.as22",
                        Title = "job3",
                        Phones = new[]
                        {
                            new AgreementContactPhoneApiModel
                            {
                                ContactId = 3, Type = "home", Value = "3213456452111",
                            },
                            new AgreementContactPhoneApiModel
                            {
                                ContactId = 3, Type = "work", Value = "321345111",
                            }
                        },
                    }
                };
            }

            #endregion

            return models;
        }

        [GET("{agreementId:int}/contacts/{contactId:int}")]
        public AgreementContactApiModel Get(int agreementId, int contactId, [FromUri] bool useTestData = false)
        {
            var entity = _queryProcessor.Execute(new ContactById(User, agreementId, contactId)
            {
                EagerLoad = new Expression<Func<AgreementContact, object>>[]
                {
                    x => x.Person.Emails,
                    x => x.PhoneNumbers,
                }
            });
            if (entity == null || entity.AgreementId != agreementId)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            var model = Mapper.Map<AgreementContactApiModel>(entity);

            #region Test Data

            if (useTestData)
            {
                model = new AgreementContactApiModel
                {
                    Type = "Home Principal",
                    Id = 2,
                    PersonId = 44,
                    DisplayName = "Arya Stark",
                    Salutation = "Ms.",
                    FirstName = "arya",
                    MiddleName = "middle2",
                    LastName = "stark",
                    Suffix = "Sr.",
                    EmailAddress = "asdf@as.as22",
                    Title = "job2",
                    Phones = new[]
                    {
                        new AgreementContactPhoneApiModel
                        {
                            ContactId = 2, Type = "work", Value = "3213456452",
                        },
                        new AgreementContactPhoneApiModel
                        {
                            ContactId = 2, Type = "home", Value = "321345",
                        }
                    },
                };
            }

            #endregion

            return model;
        }

        [POST("{agreementId:int}/contacts/{contactId:int}")]
        public HttpResponseMessage Post(int agreementId, int contactId, [FromBody] AgreementContactApiModel model)
        {
            model.AgreementId = agreementId;
            model.Id = contactId;

            var response = Request.CreateResponse(HttpStatusCode.Created,
               string.Format("Contact '{0}' was successfully created.", "name"));
            var url = Url.Link(null, new
            {
                controller = "AgreementContacts",
                action = "Get",
                agreementId,
                establishmentNameId = 1//command.Id
            });
            Debug.Assert(url != null);
            response.Headers.Location = new Uri(url);
            return response;
        }

        [PUT("{agreementId:int}/contacts/{contactId:int}")]
        public HttpResponseMessage Put(int agreementId, int contactId, [FromBody] AgreementContactApiModel model)
        {

            var response = Request.CreateResponse(HttpStatusCode.OK, "Agreement contact was successfully updated.");
            return response;
        }

        [DELETE("{agreementId:int}/contacts/{contactId:int}")]
        public HttpResponseMessage Delete(int agreementId, int contactId)
        {

            var response = Request.CreateResponse(HttpStatusCode.OK, "Agreement contact was successfully deleted.");
            return response;
        }
    }
}
