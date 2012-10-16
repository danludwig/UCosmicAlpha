﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Http;
using AttributeRouting;
using AttributeRouting.Web.Http;
using AutoMapper;
using UCosmic.Domain.Establishments;
using UCosmic.Www.Mvc.Models;

namespace UCosmic.Www.Mvc.ApiControllers
{
    [RoutePrefix("api/establishments")]
    public class EstablishmentNamesController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;

        public EstablishmentNamesController(IProcessQueries queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [GET("{establishmentId}/names")]
        public IEnumerable<EstablishmentNameApiModel> Get(int establishmentId)
        {
            //System.Threading.Thread.Sleep(2000);
            var entities = _queryProcessor.Execute(new EstablishmentNames(establishmentId)
            {
                EagerLoad = new Expression<Func<EstablishmentName, object>>[]
                {
                    x => x.TranslationToLanguage.Names,
                },
                OrderBy = new Dictionary<Expression<Func<EstablishmentName, object>>, OrderByDirection>
                {
                    { x => x.IsOfficialName, OrderByDirection.Descending },
                    { x => x.IsFormerName, OrderByDirection.Ascending },
                }
            });

            var models = Mapper.Map<EstablishmentNameApiModel[]>(entities);

            return models;
        }

        [PUT("names/{establishmentNameId}")]
        public void Put(int establishmentNameId, [FromBody] EstablishmentNameApiModel model)
        {
            if (establishmentNameId != model.RevisionId)
                throw new InvalidOperationException("REST URL does not match primary key of data item.");
        }
    }
}
