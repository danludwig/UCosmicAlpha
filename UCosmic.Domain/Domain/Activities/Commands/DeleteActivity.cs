﻿using System;
using System.Linq;
using System.Security.Principal;
using FluentValidation;

namespace UCosmic.Domain.Activities
{
    public class DeleteActivity
    {
        public IPrincipal Principal { get; private set; }
        public int Id { get; private set; }

        public DeleteActivity(IPrincipal principal, int id)
        {
            if (principal == null) { throw new ArgumentNullException("principal"); }
            Principal = principal;
            Id = id;
        }
    }

    public class ValidateDeleteActivityCommand : AbstractValidator<DeleteActivity>
    {
        public ValidateDeleteActivityCommand(IProcessQueries queryProcessor)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(x => x.Principal)
                .MustOwnActivity(queryProcessor, x => x.Id);

            RuleFor(x => x.Id)
                // id must be within valid range
                .GreaterThanOrEqualTo(1)
                    .WithMessage(MustBePositivePrimaryKey.FailMessageFormat, x => "Activity id", x => x.Id)
            ;
        }
    }

    public class HandleDeleteActivityCommand : IHandleCommands<DeleteActivity>
    {
        private readonly ICommandEntities _entities;

        public HandleDeleteActivityCommand(ICommandEntities entities)
        {
            _entities = entities;
        }

        public void Handle(DeleteActivity command)
        {
            if (command == null) throw new ArgumentNullException("command");

            var activity = _entities.Get<Activity>().SingleOrDefault(x => x.RevisionId == command.Id);
            if (activity == null) return;

            _entities.Purge(activity);

            _entities.SaveChanges();

            // TBD
            // log audit
            //var audit = new CommandEvent
            //{
            //    RaisedBy = User.Name,
            //    Name = command.GetType().FullName,
            //    Value = JsonConvert.SerializeObject(new { command.Id }),
            //    PreviousState = activityDocument.ToJsonAudit(),
            //};
            //_entities.Create(audit);

            //_eventProcessor.Raise(new EstablishmentChanged());
        }
    }
}
