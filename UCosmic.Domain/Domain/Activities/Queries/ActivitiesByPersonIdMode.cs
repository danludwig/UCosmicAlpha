﻿using System;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Principal;
using UCosmic.Domain.People;

namespace UCosmic.Domain.Activities
{
    public class ActivitiesByPersonIdMode : BaseEntitiesQuery<Activity>, IDefineQuery<PagedQueryResult<Activity>>
    {
        public int PersonId { get; set; }
        public string ModeText { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }

    public class HandleActivitiesByPersonIdModeQuery : IHandleQueries<ActivitiesByPersonIdMode, PagedQueryResult<Activity>>
    {
        private readonly IQueryEntities _entities;

        public HandleActivitiesByPersonIdModeQuery(IQueryEntities entities)
        {
            _entities = entities;
        }

        public PagedQueryResult<Activity> Handle(ActivitiesByPersonIdMode query)
        {
            if (query == null) throw new ArgumentNullException("query");

            IQueryable<Activity> results = null;

            if (!String.IsNullOrEmpty(query.ModeText))
            {
               results = _entities.Query<Activity>()
                         .WithPersonId(query.PersonId)
                         .WithMode(query.ModeText)
                         .OrderBy(query.OrderBy);
            }
            else
            {
                results = _entities.Query<Activity>()
                          .WithPersonId(query.PersonId)
                          .OrderBy(query.OrderBy);                
            }

            var pagedResults = new PagedQueryResult<Activity>(results, query.PageSize, query.PageNumber);

            return pagedResults;
        }
    }
}