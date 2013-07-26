﻿using System;
using System.Security.Principal;
using FluentValidation;
using UCosmic.Domain.Files;
using UCosmic.Domain.Identity;

namespace UCosmic.Domain.Agreements
{
    public class CreateFile
    {
        public CreateFile(IPrincipal principal)
        {
            if (principal == null) throw new ArgumentNullException("principal");
            Principal = principal;
        }

        public IPrincipal Principal { get; private set; }
        public int AgreementId { get; set; }
        public string Visibility { get; set; }
        public Guid? UploadGuid { get; set; }
        public FileDataWrapper FileData { get; set; }
        public class FileDataWrapper
        {
            public byte[] Content { get; set; }
            public string MimeType { get; set; }
            public string FileName { get; set; }
        }
        public int CreatedFileId { get; internal set; }
    }

    public class ValidateCreateFileCommand : AbstractValidator<CreateFile>
    {
        public ValidateCreateFileCommand(IQueryEntities entities, IProcessQueries queryProcessor)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            // principal must be authorized to perform this action
            RuleFor(x => x.Principal)
                .NotNull()
                    .WithMessage(MustNotHaveNullPrincipal.FailMessage)
                .MustNotHaveEmptyIdentityName()
                    .WithMessage(MustNotHaveEmptyIdentityName.FailMessage)
                .MustBeInAnyRole(RoleName.AgreementManagers)
                    .WithMessage(MustBeInAnyRole.FailMessageFormat, x => x.Principal.Identity.Name, x => x.GetType().Name)
            ;

            RuleFor(x => x.AgreementId)
                // agreement id must exist
                .MustFindAgreementById(entities)
                    .WithMessage(MustFindAgreementById.FailMessageFormat, x => x.AgreementId)

                // principal must own agreement
                .MustBeOwnedByPrincipal(queryProcessor, x => x.Principal)
                    .WithMessage(MustBeOwnedByPrincipal<object>.FailMessageFormat, x => x.AgreementId, x => x.Principal.Identity.Name)
            ;

            // visibility is required
            RuleFor(x => x.Visibility)
                .MustHaveAgreementVisibility()
                    .WithMessage(MustHaveAgreementVisibility.FileFailMessage)
            ;

            // when uploadid is present
            When(x => x.UploadGuid.HasValue, () =>
            {
                // there must be no raw file data
                RuleFor(x => x.FileData)
                    .Must(x => x == null)
                        .WithMessage("FileData must be null when an UploadGuid value is provided.");

                RuleFor(x => x.UploadGuid.Value)
                    // upload id must exist
                    .MustFindUploadByGuid(entities)
                        .WithMessage(MustFindUploadByGuid.FailMessageFormat, x => x.UploadGuid)

                    // uploaded file must have been created by same user who us creating this file
                    .MustBeUploadedByPrincipal(entities, x => x.Principal)

                    // uploaded file must have valid extension
                    .MustHaveAllowedFileExtension(entities, AgreementFileConstraints.AllowedFileExtensions)

                    // uploaded file not be too large
                    .MustNotExceedFileSize(25, FileSizeUnitName.Megabyte, entities)
                ;
            });

            // when file data is not null
            When(x => x.FileData != null, () =>
            {
                // there must be no upload id
                RuleFor(x => x.UploadGuid)
                    .Must(x => !x.HasValue)
                        .WithMessage("UploadGuid must be null when FileData is provided.");

                RuleFor(x => x.FileData.MimeType)
                    // file must have mime type
                    .NotEmpty().WithMessage(MustHaveFileMimeType.FailMessage)
                ;

                RuleFor(x => x.FileData.FileName)
                    // file name must be present
                    .NotEmpty().WithMessage(MustHaveFileName.FailMessage)

                    // file name must have valid extension
                    .MustHaveAllowedFileExtension(AgreementFileConstraints.AllowedFileExtensions)
                ;

                RuleFor(x => x.FileData.Content)
                    // content cannot be null or zero length
                    .NotNull().WithMessage(MustHaveFileContent.FailMessage)
                    .Must(x => x.Length > 0).WithMessage(MustHaveFileContent.FailMessage)

                    // uploaded file not be too large
                    .MustNotExceedFileSize(25, FileSizeUnitName.Megabyte, x => x.FileData.FileName)
                ;
            });

            // when neither upload id or file data is present
            const string noFileContentMessage = "Both UploadGuid and FileData are null. Exactly one of these must be provided for this command.";
            When(x => !x.UploadGuid.HasValue && x.FileData == null, () =>
            {
                RuleFor(x => x.FileData).Must(x => false).WithMessage(noFileContentMessage);
                RuleFor(x => x.UploadGuid).Must(x => false).WithMessage(noFileContentMessage);
            });
        }
    }

    public class HandleCreateFileCommand : IHandleCommands<CreateFile>
    {
        //private readonly ICommandEntities _entities;
        //private readonly IUnitOfWork _unitOfWork;
        //private readonly IStoreBinaryData _binaryData;

        //public HandleCreateFileCommand(ICommandEntities entities
        //    , IUnitOfWork unitOfWork
        //    , IStoreBinaryData binaryData
        //)
        //{
        //    _entities = entities;
        //    _unitOfWork = unitOfWork;
        //    _binaryData = binaryData;
        //}

        public void Handle(CreateFile command)
        {
            command.CreatedFileId = 1;
        }
    }
}
