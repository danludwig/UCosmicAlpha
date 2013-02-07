﻿using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;
using Newtonsoft.Json;
using UCosmic.Domain.Audit;
using UCosmic.Domain.Employees;
using UCosmic.Domain.People;

namespace UCosmic.Domain.Employees
{
    public class UpdateEmployee
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int FacultyRankId { get; set; }
        public string AdministrativeAppointments { get; set; }
    }

    public class ValidateUpdateEmployeeCommand : AbstractValidator<UpdateEmployee>
    {
        public ValidateUpdateEmployeeCommand(IProcessQueries queryProcessor)
        {
            //CascadeMode = CascadeMode.StopOnFirstFailure;

            //RuleFor(p => p.DisplayName)
            //    // display name cannot be empty
            //    .NotEmpty()
            //        .WithMessage(ValidatePerson.FailedBecauseDisplayNameWasEmpty)
            //;

            //RuleFor(p => p.UserName)
            //    // if username is present, validate that it is not attached to another person
            //    .Must(p => ValidateUser.NameMatchesNoEntity(p, queryProcessor))
            //        .WithMessage(ValidateUser.FailedBecauseNameMatchedEntity,
            //            p => p.UserName)
            //;
        }
    }

    public class HandleUpdateEmployeeCommand : IHandleCommands<UpdateEmployee>
    {
        private readonly ICommandEntities _entities;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProcessEvents _eventProcessor;

        public HandleUpdateEmployeeCommand(ICommandEntities entities
            , IUnitOfWork unitOfWork
            , IProcessEvents eventProcessor
        )
        {
            _entities = entities;
            _unitOfWork = unitOfWork;
            _eventProcessor = eventProcessor;
        }

        public void Handle(UpdateEmployee command)
        {
            if (command == null) { throw new ArgumentNullException("command"); }

            Employee employee = _entities.Get<Employee>()
                .SingleOrDefault(p => p.Id == command.Id);
            if (employee == null) { return; }

            Person person = _entities.Get<Person>()
               .SingleOrDefault(p => p.RevisionId == command.PersonId);

            EmployeeFacultyRank facultyRank = _entities.Get<EmployeeFacultyRank>()
                .SingleOrDefault(p => p.Id == command.FacultyRankId);

            // log audit
            var audit = new CommandEvent
                {
                    RaisedBy = person.FirstName + " " + person.LastName,
                    Name = command.GetType().FullName,
                    Value = JsonConvert.SerializeObject(new
                    {
                        Id = command.Id,
                        EmployeeFacultyRank = (facultyRank != null) ? facultyRank.Rank : null,
                        command.AdministrativeAppointments,
                    }),
                    PreviousState = employee.ToJsonAudit(),
                };

            bool changed = false;

            if (person.RevisionId != command.Id)
            {
                employee.Person = person;
                changed = true;
            }

            if (command.FacultyRankId == 0)
            {
                employee.FacultyRank = null;
                changed = true;
            }
            else if ((employee.FacultyRank == null) ||
                    ((employee.FacultyRank != null) && (employee.FacultyRank.Id != command.FacultyRankId)))
            {
                employee.FacultyRank = _entities.Get<EmployeeFacultyRank>()
                                            .SingleOrDefault(x => x.Id == command.FacultyRankId);
                changed = true;
            }

            if (employee.AdministrativeAppointments != command.AdministrativeAppointments)
            {
                employee.AdministrativeAppointments = command.AdministrativeAppointments;
                changed = true;
            }

            // update
            if (changed)
            {
                audit.NewState = person.ToJsonAudit();
                _entities.Create(audit);
                _entities.Update(employee);

                _unitOfWork.SaveChanges();
                //_eventProcessor.Raise(new EmployeeChanged());
            }
        }
    }
}
