﻿using System;
using System.Security.Principal;

namespace UCosmic.Domain.Activities
{
    public class MyActivityByNumber : BaseEntityQuery<Activity>, IDefineQuery<Activity>
    {
        public IPrincipal Principal { get; set; }
        public int Number { get; set; }
    }

    public class HandleMyActivityByNumberQuery : IHandleQueries<MyActivityByNumber, Activity>
    {
        private readonly IQueryEntities _entities;

        public HandleMyActivityByNumberQuery(IQueryEntities entities)
        {
            _entities = entities;
        }

        public Activity Handle(MyActivityByNumber query)
        {
            if (query == null) throw new ArgumentNullException("query");

            var result = _entities.Query<Activity>()
                .EagerLoad(_entities, query.EagerLoad)
                .ByUserNameAndNumber(query.Principal.Identity.Name, query.Number)
            ;

            return result;
        }
    }
}