/*
Deployment script for UCosmicTest

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
--:setvar DatabaseName "UCosmicTest"
--:setvar DefaultFilePrefix "UCosmicTest"
--:setvar DefaultDataPath "c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\"
--:setvar DefaultLogPath "c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\"

--GO
--:on error exit
--GO
--/*
--Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
--To re-enable the script after enabling SQLCMD mode, execute the following:
--SET NOEXEC OFF; 
--*/
--:setvar __IsSqlCmdEnabled "True"
--GO
--IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
--    BEGIN
--        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
--        SET NOEXEC ON;
--    END


--GO
USE [UCosmicTest];


GO
/*
The column [ActivitiesV2].[ActivityDocument].[ProxyImageId] is being dropped, data loss could occur.

The column [ActivitiesV2].[ActivityDocument].[Visible] on table [ActivitiesV2].[ActivityDocument] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [ActivitiesV2].[ActivityDocument])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
/*
The column [Files].[Image].[SourceId] is being dropped, data loss could occur.

The column [Files].[Image].[MimeType] on table [Files].[Image] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.

The column [Files].[Image].[Size] on table [Files].[Image] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [Files].[Image])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
/*
The column [Files].[LoadableFile].[Filename] is being dropped, data loss could occur.
*/

--IF EXISTS (select top 1 1 from [Files].[LoadableFile])
--    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

--GO
PRINT N'Dropping [ActivitiesV2].[ActivityDocument].[IX_ProxyImageId]...';


GO
DROP INDEX [IX_ProxyImageId]
    ON [ActivitiesV2].[ActivityDocument];


GO
PRINT N'Dropping FK_ActivitiesV2.ActivityDocument_ActivitiesV2.ActivityValues_ActivityValuesId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] DROP CONSTRAINT [FK_ActivitiesV2.ActivityDocument_ActivitiesV2.ActivityValues_ActivityValuesId];


GO
PRINT N'Dropping FK_ActivitiesV2.ActivityDocument_Files.Image_ImageId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] DROP CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.Image_ImageId];


GO
PRINT N'Dropping FK_ActivitiesV2.ActivityDocument_Files.Image_ProxyImageId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] DROP CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.Image_ProxyImageId];


GO
PRINT N'Dropping FK_ActivitiesV2.ActivityDocument_Files.LoadableFile_FileId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] DROP CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.LoadableFile_FileId];


GO
PRINT N'Dropping FK_Files.LoadableFileBinary_Files.LoadableFile_Id...';


GO
ALTER TABLE [Files].[LoadableFileBinary] DROP CONSTRAINT [FK_Files.LoadableFileBinary_Files.LoadableFile_Id];


GO
PRINT N'Dropping FK_People.Person_Files.LoadableFile_PhotoId...';


GO
ALTER TABLE [People].[Person] DROP CONSTRAINT [FK_People.Person_Files.LoadableFile_PhotoId];


GO
PRINT N'Dropping FK_InstitutionalAgreements.InstitutionalAgreementFile_InstitutionalAgreements.InstitutionalAgreement_AgreementId...';


GO
ALTER TABLE [InstitutionalAgreements].[InstitutionalAgreementFile] DROP CONSTRAINT [FK_InstitutionalAgreements.InstitutionalAgreementFile_InstitutionalAgreements.InstitutionalAgreement_AgreementId];


GO
PRINT N'Starting rebuilding table [ActivitiesV2].[ActivityDocument]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [ActivitiesV2].[tmp_ms_xx_ActivityDocument] (
    [RevisionId]         INT              IDENTITY (1, 1) NOT NULL,
    [ActivityValuesId]   INT              NOT NULL,
    [FileId]             INT              NULL,
    [ImageId]            INT              NULL,
    [Mode]               NVARCHAR (20)    NOT NULL,
    [Title]              NVARCHAR (MAX)   NULL,
    [Visible]            BIT              NOT NULL,
    [EntityId]           UNIQUEIDENTIFIER NOT NULL,
    [CreatedOnUtc]       DATETIME         NOT NULL,
    [CreatedByPrincipal] NVARCHAR (256)   NULL,
    [UpdatedOnUtc]       DATETIME         NULL,
    [UpdatedByPrincipal] NVARCHAR (256)   NULL,
    [Version]            ROWVERSION       NOT NULL,
    [IsCurrent]          BIT              NOT NULL,
    [IsArchived]         BIT              NOT NULL,
    [IsDeleted]          BIT              NOT NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_ActivitiesV2.ActivityDocument] PRIMARY KEY CLUSTERED ([RevisionId] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [ActivitiesV2].[ActivityDocument])
    BEGIN
        SET IDENTITY_INSERT [ActivitiesV2].[tmp_ms_xx_ActivityDocument] ON;
        INSERT INTO [ActivitiesV2].[tmp_ms_xx_ActivityDocument] ([RevisionId], [ActivityValuesId], [FileId], [ImageId], [Mode], [EntityId], [CreatedOnUtc], [CreatedByPrincipal], [UpdatedOnUtc], [UpdatedByPrincipal], [IsCurrent], [IsArchived], [IsDeleted])
        SELECT   [RevisionId],
                 [ActivityValuesId],
                 [FileId],
                 [ImageId],
                 [Mode],
                 [EntityId],
                 [CreatedOnUtc],
                 [CreatedByPrincipal],
                 [UpdatedOnUtc],
                 [UpdatedByPrincipal],
                 [IsCurrent],
                 [IsArchived],
                 [IsDeleted]
        FROM     [ActivitiesV2].[ActivityDocument]
        ORDER BY [RevisionId] ASC;
        SET IDENTITY_INSERT [ActivitiesV2].[tmp_ms_xx_ActivityDocument] OFF;
    END

DROP TABLE [ActivitiesV2].[ActivityDocument];

EXECUTE sp_rename N'[ActivitiesV2].[tmp_ms_xx_ActivityDocument]', N'ActivityDocument';

EXECUTE sp_rename N'[ActivitiesV2].[tmp_ms_xx_constraint_PK_ActivitiesV2.ActivityDocument]', N'PK_ActivitiesV2.ActivityDocument', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Creating [ActivitiesV2].[ActivityDocument].[IX_FileId]...';


GO
CREATE NONCLUSTERED INDEX [IX_FileId]
    ON [ActivitiesV2].[ActivityDocument]([FileId] ASC);


GO
PRINT N'Creating [ActivitiesV2].[ActivityDocument].[IX_ImageId]...';


GO
CREATE NONCLUSTERED INDEX [IX_ImageId]
    ON [ActivitiesV2].[ActivityDocument]([ImageId] ASC);


GO
PRINT N'Creating [ActivitiesV2].[ActivityDocument].[IX_ActivityValuesId]...';


GO
CREATE NONCLUSTERED INDEX [IX_ActivityValuesId]
    ON [ActivitiesV2].[ActivityDocument]([ActivityValuesId] ASC);


GO
PRINT N'Altering [Files].[Image]...';


GO
ALTER TABLE [Files].[Image] DROP COLUMN [SourceId];


GO
ALTER TABLE [Files].[Image]
    ADD [Title]     NVARCHAR (64)  NULL,
        [MimeType]  NVARCHAR (256) NOT NULL,
        [Name]      NVARCHAR (MAX) NULL,
        [Extension] NVARCHAR (MAX) NULL,
        [Size]      BIGINT         NOT NULL;


GO
PRINT N'Starting rebuilding table [Files].[LoadableFile]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [Files].[tmp_ms_xx_LoadableFile] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Length]    BIGINT         NOT NULL,
    [MimeType]  NVARCHAR (MAX) NULL,
    [Title]     NVARCHAR (MAX) NULL,
    [Name]      NVARCHAR (MAX) NULL,
    [Extension] NVARCHAR (MAX) NULL,
    [Path]      NVARCHAR (MAX) NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_Files.LoadableFile] PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [Files].[LoadableFile])
    BEGIN
        SET IDENTITY_INSERT [Files].[tmp_ms_xx_LoadableFile] ON;
        INSERT INTO [Files].[tmp_ms_xx_LoadableFile] ([Id], [Length], [MimeType], [Name], [Path])
        SELECT   [Id],
                 [Length],
                 [MimeType],
                 [Name],
                 [Path]
        FROM     [Files].[LoadableFile]
        ORDER BY [Id] ASC;
        SET IDENTITY_INSERT [Files].[tmp_ms_xx_LoadableFile] OFF;
    END

DROP TABLE [Files].[LoadableFile];

EXECUTE sp_rename N'[Files].[tmp_ms_xx_LoadableFile]', N'LoadableFile';

EXECUTE sp_rename N'[Files].[tmp_ms_xx_constraint_PK_Files.LoadableFile]', N'PK_Files.LoadableFile', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Starting rebuilding table [InstitutionalAgreements].[InstitutionalAgreementFile]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [InstitutionalAgreements].[tmp_ms_xx_InstitutionalAgreementFile] (
    [RevisionId]         INT              IDENTITY (1, 1) NOT NULL,
    [Content]            VARBINARY (MAX)  NULL,
    [Length]             INT              NOT NULL,
    [MimeType]           NVARCHAR (MAX)   NULL,
    [Name]               NVARCHAR (MAX)   NULL,
    [Path]               NVARCHAR (MAX)   NULL,
    [EntityId]           UNIQUEIDENTIFIER NOT NULL,
    [CreatedOnUtc]       DATETIME         NOT NULL,
    [CreatedByPrincipal] NVARCHAR (256)   NULL,
    [UpdatedOnUtc]       DATETIME         NULL,
    [UpdatedByPrincipal] NVARCHAR (256)   NULL,
    [Version]            ROWVERSION       NOT NULL,
    [IsCurrent]          BIT              NOT NULL,
    [IsArchived]         BIT              NOT NULL,
    [IsDeleted]          BIT              NOT NULL,
    [AgreementId]        INT              NOT NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_InstitutionalAgreements.InstitutionalAgreementFile] PRIMARY KEY CLUSTERED ([RevisionId] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [InstitutionalAgreements].[InstitutionalAgreementFile])
    BEGIN
        SET IDENTITY_INSERT [InstitutionalAgreements].[tmp_ms_xx_InstitutionalAgreementFile] ON;
        INSERT INTO [InstitutionalAgreements].[tmp_ms_xx_InstitutionalAgreementFile] ([RevisionId], [Content], [Length], [MimeType], [Name], [EntityId], [CreatedOnUtc], [CreatedByPrincipal], [UpdatedOnUtc], [UpdatedByPrincipal], [IsCurrent], [IsArchived], [IsDeleted], [AgreementId], [Path])
        SELECT   [RevisionId],
                 [Content],
                 [Length],
                 [MimeType],
                 [Name],
                 [EntityId],
                 [CreatedOnUtc],
                 [CreatedByPrincipal],
                 [UpdatedOnUtc],
                 [UpdatedByPrincipal],
                 [IsCurrent],
                 [IsArchived],
                 [IsDeleted],
                 [AgreementId],
                 [Path]
        FROM     [InstitutionalAgreements].[InstitutionalAgreementFile]
        ORDER BY [RevisionId] ASC;
        SET IDENTITY_INSERT [InstitutionalAgreements].[tmp_ms_xx_InstitutionalAgreementFile] OFF;
    END

DROP TABLE [InstitutionalAgreements].[InstitutionalAgreementFile];

EXECUTE sp_rename N'[InstitutionalAgreements].[tmp_ms_xx_InstitutionalAgreementFile]', N'InstitutionalAgreementFile';

EXECUTE sp_rename N'[InstitutionalAgreements].[tmp_ms_xx_constraint_PK_InstitutionalAgreements.InstitutionalAgreementFile]', N'PK_InstitutionalAgreements.InstitutionalAgreementFile', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Creating [InstitutionalAgreements].[InstitutionalAgreementFile].[IX_AgreementId]...';


GO
CREATE NONCLUSTERED INDEX [IX_AgreementId]
    ON [InstitutionalAgreements].[InstitutionalAgreementFile]([AgreementId] ASC);


GO
PRINT N'Creating [Files].[ProxyImageMimeTypeXRef]...';


GO
CREATE TABLE [Files].[ProxyImageMimeTypeXRef] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [MimeType] NVARCHAR (MAX) NULL,
    [ImageId]  INT            NOT NULL,
    CONSTRAINT [PK_Files.ProxyImageMimeTypeXRef] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating FK_ActivitiesV2.ActivityDocument_ActivitiesV2.ActivityValues_ActivityValuesId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH NOCHECK
    ADD CONSTRAINT [FK_ActivitiesV2.ActivityDocument_ActivitiesV2.ActivityValues_ActivityValuesId] FOREIGN KEY ([ActivityValuesId]) REFERENCES [ActivitiesV2].[ActivityValues] ([RevisionId]) ON DELETE CASCADE;


GO
PRINT N'Creating FK_ActivitiesV2.ActivityDocument_Files.Image_ImageId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH NOCHECK
    ADD CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.Image_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Files].[Image] ([Id]);


GO
PRINT N'Creating FK_ActivitiesV2.ActivityDocument_Files.LoadableFile_FileId...';


GO
ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH NOCHECK
    ADD CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.LoadableFile_FileId] FOREIGN KEY ([FileId]) REFERENCES [Files].[LoadableFile] ([Id]);


GO
PRINT N'Creating FK_Files.LoadableFileBinary_Files.LoadableFile_Id...';


GO
ALTER TABLE [Files].[LoadableFileBinary] WITH NOCHECK
    ADD CONSTRAINT [FK_Files.LoadableFileBinary_Files.LoadableFile_Id] FOREIGN KEY ([Id]) REFERENCES [Files].[LoadableFile] ([Id]) ON DELETE CASCADE;


GO
PRINT N'Creating FK_People.Person_Files.LoadableFile_PhotoId...';


GO
ALTER TABLE [People].[Person] WITH NOCHECK
    ADD CONSTRAINT [FK_People.Person_Files.LoadableFile_PhotoId] FOREIGN KEY ([PhotoId]) REFERENCES [Files].[LoadableFile] ([Id]);


GO
PRINT N'Creating FK_InstitutionalAgreements.InstitutionalAgreementFile_InstitutionalAgreements.InstitutionalAgreement_AgreementId...';


GO
ALTER TABLE [InstitutionalAgreements].[InstitutionalAgreementFile] WITH NOCHECK
    ADD CONSTRAINT [FK_InstitutionalAgreements.InstitutionalAgreementFile_InstitutionalAgreements.InstitutionalAgreement_AgreementId] FOREIGN KEY ([AgreementId]) REFERENCES [InstitutionalAgreements].[InstitutionalAgreement] ([RevisionId]) ON DELETE CASCADE;


GO
PRINT N'Checking existing data against newly created constraints';


GO

ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH CHECK CHECK CONSTRAINT [FK_ActivitiesV2.ActivityDocument_ActivitiesV2.ActivityValues_ActivityValuesId];

ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH CHECK CHECK CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.Image_ImageId];

ALTER TABLE [ActivitiesV2].[ActivityDocument] WITH CHECK CHECK CONSTRAINT [FK_ActivitiesV2.ActivityDocument_Files.LoadableFile_FileId];

ALTER TABLE [Files].[LoadableFileBinary] WITH CHECK CHECK CONSTRAINT [FK_Files.LoadableFileBinary_Files.LoadableFile_Id];

ALTER TABLE [People].[Person] WITH CHECK CHECK CONSTRAINT [FK_People.Person_Files.LoadableFile_PhotoId];

ALTER TABLE [InstitutionalAgreements].[InstitutionalAgreementFile] WITH CHECK CHECK CONSTRAINT [FK_InstitutionalAgreements.InstitutionalAgreementFile_InstitutionalAgreements.InstitutionalAgreement_AgreementId];


GO
PRINT N'Update complete.';


GO
