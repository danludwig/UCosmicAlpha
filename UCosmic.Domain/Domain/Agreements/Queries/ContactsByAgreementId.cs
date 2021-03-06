﻿using System;
using System.Linq;
using System.Security.Principal;

namespace UCosmic.Domain.Agreements
{
    public class ContactsByAgreementId : BaseEntitiesQuery<AgreementContact>, IDefineQuery<AgreementContact[]>
    {
        public ContactsByAgreementId(IPrincipal principal, int agreementId)
        {
            if (principal == null) throw new ArgumentNullException("principal");
            Principal = principal;
            AgreementId = agreementId;
        }

        public IPrincipal Principal { get; private set; }
        public int AgreementId { get; private set; }
    }

    public class HandleContactsByAgreementIdQuery : IHandleQueries<ContactsByAgreementId, AgreementContact[]>
    {
        private readonly IQueryEntities _entities;
        private readonly IProcessQueries _queryProcessor;

        public HandleContactsByAgreementIdQuery(IQueryEntities entities, IProcessQueries queryProcessor)
        {
            _entities = entities;
            _queryProcessor = queryProcessor;
        }

        public AgreementContact[] Handle(ContactsByAgreementId query)
        {
            if (query == null) throw new ArgumentNullException("query");

            var queryable = _entities.Query<AgreementContact>()
                .EagerLoad(_entities, query.EagerLoad)
                .ByAgreementId(query.AgreementId)
                .VisibleTo(query.Principal, _queryProcessor)
                .OrderBy(query.OrderBy)
            ;

            return queryable.ToArray();
        }
    }
}
