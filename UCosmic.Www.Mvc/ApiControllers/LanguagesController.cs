﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Http;
using AutoMapper;
using UCosmic.Domain.Languages;
using UCosmic.Www.Mvc.Models;

namespace UCosmic.Www.Mvc.ApiControllers
{
    [DefaultApiHttpRouteConvention]
    public class LanguagesController : ApiController
    {
        private readonly IProcessQueries _queryProcessor;

        public LanguagesController(IProcessQueries queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [CacheHttpGet(Duration = 3600)]
        public IEnumerable<LanguageApiModel> GetAll()
        {
            //System.Threading.Thread.Sleep(2000);
            var views = _queryProcessor.Execute(new LanguagesUnfiltered
            {
                UserLanguageFirst = true,
                OrderBy = new Dictionary<Expression<Func<LanguageView, object>>, OrderByDirection>
                {
                    { x => x.TranslatedName, OrderByDirection.Ascending },
                },
            });
            var items = Mapper.Map<LanguageApiModel[]>(views);
            return items;
        }
    }
}
