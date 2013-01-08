﻿using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using UCosmic.Domain.Places;
using UCosmic.Web.Mvc.Models;

namespace UCosmic.Web.Mvc.ApiControllers
{
    [DefaultApiHttpRouteConvention]
    public class PlacesController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;

        public PlacesController(IProcessQueries queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [CacheHttpGet(Duration = 3600)]
        public IEnumerable<PlaceApiModel> GetFiltered([FromUri] PlaceFilterInputModel input)
        {
            //System.Threading.Thread.Sleep(2000);
            var query = Mapper.Map<FilteredPlaces>(input);
            var entities = _queryProcessor.Execute(query);
            var models = Mapper.Map<PlaceApiModel[]>(entities);
            return models;
        }
    }
}