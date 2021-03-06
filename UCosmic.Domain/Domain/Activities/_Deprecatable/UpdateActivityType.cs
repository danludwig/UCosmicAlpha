﻿//using System;
//using System.Linq;
//using System.Security.Principal;
//using FluentValidation;

//namespace UCosmic.Domain.Activities
//{
//    public class UpdateActivityType
//    {
//        public IPrincipal Principal { get; protected set; }
//        public int Id { get; protected set; }
//        public DateTime UpdatedOn { get; protected set; }
//        public int TypeId { get; protected set; }
//        public string CssRgbColor { get; protected set; }
//        internal bool NoCommit { get; set; }

//        public UpdateActivityType(IPrincipal principal,
//                                  int id,
//                                  DateTime updatedOn,
//                                  int typeId)
//        {
//            if (principal == null) { throw new ArgumentNullException("principal"); }
//            if (updatedOn == null) { throw new ArgumentNullException("updatedOn"); }

//            Principal = principal;
//            Id = id;
//            UpdatedOn = updatedOn.ToUniversalTime();
//            TypeId = typeId;
//        }
//    }

//    public class HandleUpdateActivityTypeCommand : IHandleCommands<UpdateActivityType>
//    {
//        private readonly ICommandEntities _entities;
//        private readonly IUnitOfWork _unitOfWork;

//        public HandleUpdateActivityTypeCommand(ICommandEntities entities,
//                                               IUnitOfWork unitOfWork)
//        {
//            _entities = entities;
//            _unitOfWork = unitOfWork;
//        }

//        public class ValidateUpdateActivityTypeCommand : AbstractValidator<UpdateActivityType>
//        {
//            public ValidateUpdateActivityTypeCommand(IQueryEntities entities)
//            {
//                CascadeMode = CascadeMode.StopOnFirstFailure;

//                RuleFor(x => x.Principal)
//                    .MustOwnActivityType(entities, x => x.Id)
//                    .WithMessage(MustOwnActivityType<object>.FailMessageFormat, x => x.Principal.Identity.Name, x => x.Id);

//                RuleFor(x => x.Id)
//                    // id must be within valid range
//                    .GreaterThanOrEqualTo(1)
//                        .WithMessage(MustBePositivePrimaryKey.FailMessageFormat, x => "ActivityType id", x => x.Id)

//                    // id must exist in the database
//                    .MustFindActivityTypeById(entities)
//                        .WithMessage(MustFindActivityTypeById.FailMessageFormat, x => x.Id)
//                ;
//            }
//        }

//        public void Handle(UpdateActivityType command)
//        {
//            if (command == null) throw new ArgumentNullException("command");

//            /* Get the activity values we are updating. */
//            var target = _entities.Get<ActivityType>().Single(x => x.RevisionId == command.Id);

//            target.TypeId = command.TypeId;
//            target.UpdatedOnUtc = command.UpdatedOn.ToUniversalTime();
//            target.UpdatedByPrincipal = command.Principal.Identity.Name;

//            _entities.Update(target);

//            if (!command.NoCommit)
//            {
//                _unitOfWork.SaveChanges();
//            }
//        }
//    }
//}

