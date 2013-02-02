﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Http;
using AttributeRouting.Web.Http;
using AutoMapper;
using NGeo.Yahoo.PlaceFinder;
using UCosmic.Domain.Places;
using UCosmic.Web.Mvc.Models;
using PlaceByWoeId = UCosmic.Domain.Places.PlaceByWoeId;

namespace UCosmic.Web.Mvc.ApiControllers
{
    [DefaultApiHttpRouteConvention]
    public class PlacesController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;
        private readonly IConsumePlaceFinder _placeFinder;

        public PlacesController(IProcessQueries queryProcessor
            , IConsumePlaceFinder placeFinder
        )
        {
            _queryProcessor = queryProcessor;
            _placeFinder = placeFinder;
        }

        //[CacheHttpGet(Duration = 3600)]
        public IEnumerable<PlaceApiModel> GetFiltered([FromUri] PlaceFilterInputModel input)
        {
            //System.Threading.Thread.Sleep(2000);
            var query = Mapper.Map<FilteredPlaces>(input);
            query.EagerLoad = new Expression<Func<Place, object>>[]
            {
                x => x.Parent,
                x => x.GeoPlanetPlace,
            };
            var entities = _queryProcessor.Execute(query);
            var models = Mapper.Map<PlaceApiModel[]>(entities);
            return models;
        }

        [GET("{placeId}")]
        //[CacheHttpGet(Duration = 3600)]
        public PlaceApiModel GetById(int placeId)
        {
            var query = new PlaceById(placeId);
            var entity = _queryProcessor.Execute(query);
            var model = Mapper.Map<PlaceApiModel>(entity);
            return model;
        }

        [GET("by-coordinates/{latitude}/{longitude}")]
        //[CacheHttpGet(Duration = 3600)]
        public IEnumerable<PlaceApiModel> GetByCoordinates(double latitude, double longitude)
        {
            var foundPlace = _placeFinder.Find(new PlaceByCoordinates(latitude, longitude))
                .FirstOrDefault(x => x.WoeId.HasValue);
            if (foundPlace != null && foundPlace.WoeId.HasValue)
            {
                var place = _queryProcessor.Execute(new PlaceByWoeId(foundPlace.WoeId.Value)
                {
                    EagerLoad = new Expression<Func<Place, object>>[]
                    {
                        x => x.Ancestors.Select(y => y.Ancestor),
                    },
                });
                var places = place.Ancestors.OrderByDescending(x => x.Separation).Select(x => x.Ancestor).ToList();
                places.Add(place);
                return Mapper.Map<PlaceApiModel[]>(places);
            }
            return Enumerable.Empty<PlaceApiModel>();
        }

        [GET("{placeId}/children")]
        //[CacheHttpGet(Duration = 3600)]
        public IEnumerable<PlaceApiModel> GetChildren(int placeId)
        {
            var query = new PlaceById(placeId)
            {
                EagerLoad = new Expression<Func<Place, object>>[]
                {
                    x => x.Children.Select(y => y.GeoPlanetPlace),
                }
            };
            var entity = _queryProcessor.Execute(query);
            var models = Mapper.Map<PlaceApiModel[]>(entity.Children);
            return models;
        }
    }
}
