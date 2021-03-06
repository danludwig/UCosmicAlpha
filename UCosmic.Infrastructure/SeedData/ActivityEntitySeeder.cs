﻿using System;
using System.IO;
using System.Linq;
using System.Security.Principal;
using UCosmic.Domain.Activities;
using UCosmic.Domain.Employees;
using UCosmic.Domain.People;
using UCosmic.Domain.Places;

namespace UCosmic.SeedData
{
    public class ActivityEntitySeeder : BaseActivityEntitySeeder
    {
        private readonly IProcessQueries _queryProcessor;
        private readonly ICommandEntities _entities;
        private readonly IHandleCommands<CreateActivity> _createActivity;
        private readonly IHandleCommands<CreateActivityPlace> _createActivityPlace;
        private readonly IHandleCommands<CreateActivityValues> _createActivityValues;
        private readonly IHandleCommands<CreateActivityTag> _createActivityTag;
        private readonly IHandleCommands<CreateActivityType> _createActivityType;
        private readonly IUnitOfWork _unitOfWork;

        public ActivityEntitySeeder(IProcessQueries queryProcessor
                                    , ICommandEntities entities
                                    , IHandleCommands<CreateActivity> createActivity
                                    , IHandleCommands<CreateActivityPlace> createActivityPlace
                                    , IHandleCommands<CreateActivityValues> createActivityValues
                                    , IHandleCommands<CreateActivityTag> createActivityTag
                                    , IHandleCommands<CreateActivityType> createActivityType
                                    , IHandleCommands<CreateActivityDocument> createActivityDocument
                                    , IUnitOfWork unitOfWork
        ) : base(entities, createActivityDocument)
        {
            _createActivity = createActivity;
            _createActivityPlace = createActivityPlace;
            _createActivityValues = createActivityValues;
            _createActivityTag = createActivityTag;
            _createActivityType = createActivityType;
            _unitOfWork = unitOfWork;
            _queryProcessor = queryProcessor;
            _entities = entities;
        }

        public override void Seed()
        {
            /* ----- USF People Activities ----- */

            {   // Douglas Corarito
                var person = _entities.Get<Person>().Single(x => x.FirstName == "Douglas" && x.LastName == "Corarito");
                var user = person.User;

                var identity = new GenericIdentity(user.Name);
                var principal = new GenericPrincipal(identity, null);

                var employeeModuleSettings = _queryProcessor.Execute(new EmployeeModuleSettingsByPersonId(person.RevisionId));
                if (employeeModuleSettings == null) throw new Exception("No EmployeeModuleSettings for USF.");

                CreateActivity createActivity;

                #region Activity 1

                var createActivityValuesCommand = new CreateActivityValues(principal)
                {
                    Title =
                        "Understanding Causation of the Permian/Triassic Boundary, Largest Mass Extinction in Earth History",
                    Content =
                        "Permian/Triassic (P/Tr) Boundary Global Events—The P/Tr boundary represents the largest mass extinction in Earth history, yet its causes remain uncertain. I am investigating critical questions related to the extent and intensity of Permo-Triassic deep-ocean anoxia, patterns of upwelling of toxic sulfidic waters onto shallow-marine shelves and platforms, and the relationship of such events to global C-isotopic excursions and the delayed recovery of marine biotas during the Early Triassic. I am working on the P/Tr boundary globally.",
                    StartsOn = new DateTime(2003, 3, 1),
                };

                var activityExists = _entities.Get<Activity>().Any(x => x.PersonId == person.RevisionId && x.Values.Any(y =>
                    createActivityValuesCommand.Title.Equals(y.Title)));
                if (!activityExists)
                {
                    createActivity = new CreateActivity(principal)
                    {
                        Mode = ActivityMode.Draft,
                    };

                    _createActivity.Handle(createActivity);
                    _unitOfWork.SaveChanges();

                    Activity activity = createActivity.CreatedActivity;

                    createActivityValuesCommand = new CreateActivityValues(principal)
                    {
                        ActivityId = activity.RevisionId,
                        Mode = activity.Mode,
                        Title = createActivityValuesCommand.Title,
                        Content = createActivityValuesCommand.Content,
                        StartsOn = createActivityValuesCommand.StartsOn,
                    };

                    _createActivityValues.Handle(createActivityValuesCommand);

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Research")).Id,
                    });

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Teaching")).Id,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "China").RevisionId,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "Canada").RevisionId,
                    });

                    /* ----- Add Tags ----- */

                    _createActivityTag.Handle(new CreateActivityTag(principal, activity.RevisionId)
                    {
                        Text = "Vietnam",
                    });

                    _createActivityTag.Handle(new CreateActivityTag(principal, activity.RevisionId)
                    {
                        Text = "India",
                    });

                    _createActivityTag.Handle(new CreateActivityTag(principal, activity.RevisionId)
                    {
                        Text = "Japan",
                    });

                    /* ----- Add Documents ----- */

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "02E6D488-B3FA-4D79-848F-303779A53ABE.docx",
                        MimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        Title = "Dissertation Excerpt",
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "10EC87BD-3A95-439D-807A-0F57C3F89C8A.xls",
                        MimeType = "application/vnd.ms-excel",
                        Title = "Research Funding Breakdown"
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "1322FF22-E863-435E-929E-765EB95FB460.ppt",
                        MimeType = "application/vnd.ms-powerpoint",
                        Title = "Conference Presentation"
                    });

                    _unitOfWork.SaveChanges();
                }

                #endregion
                #region Activity 2

                createActivityValuesCommand = new CreateActivityValues(principal)
                {
                    Title = "Professional Development Program for Teachers of English at Shandong University",
                    Content = "In Summer 2008, the Teaching English as a Second Language (TESL) Program delivered a professional development program for teachers of English at Shandong University in Jinan, China. Program instructors included two TESL doctoral students and one colleague living in the Czech Republic. Three courses were offered: Theory to Practice; Research in Second Language Acquisition; and Instructional Technology in English Language Teaching. 48 Chinese teachers completed the program. ",
                    StartsOn = new DateTime(2003, 6, 1)
                };

                activityExists = _entities.Get<Activity>().Any(x => x.PersonId == person.RevisionId && x.Values.Any(y =>
                    createActivityValuesCommand.Title.Equals(y.Title)));
                if (!activityExists)
                {
                    createActivity = new CreateActivity(principal)
                    {
                        Mode = ActivityMode.Draft,
                    };

                    _createActivity.Handle(createActivity);
                    _unitOfWork.SaveChanges();

                    Activity activity = createActivity.CreatedActivity;

                    createActivityValuesCommand = new CreateActivityValues(principal)
                    {
                        ActivityId = activity.RevisionId,
                        Mode = activity.Mode,
                        Title = createActivityValuesCommand.Title,
                        Content = createActivityValuesCommand.Content,
                        StartsOn = createActivityValuesCommand.StartsOn,
                    };

                    _createActivityValues.Handle(createActivityValuesCommand);
                    _unitOfWork.SaveChanges();

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Service")).Id,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "China").RevisionId,
                    });

                    _unitOfWork.SaveChanges();
                }

                #endregion
                #region Activity 3

                createActivityValuesCommand = new CreateActivityValues(principal)
                {
                    Title = "Workshop Preparation: Air pollution and Chinese Historic Site",
                    Content = "Drs. Tim Keener and Mingming Lu went to China in Oct. of 2006 to plan for an air quality workshop on the impact of air pollution and the Chinese historic sites, to be held in Xi’an, China in the fall of 2008. They have visited Tsinghua Univ., the XISU and discussed the details of the workshop plan with Prof. Wu, Associate Dean in the School of Tourism. they have visted Shanxi Archeology Research Institute, and Chinese Acedemy of Science in Xian, to meet potentail workshop participants. Drs. Lu and Keener is developing a proposal to NSF for the workshop.",
                    StartsOn = new DateTime(2006, 10, 9),
                    EndsOn = new DateTime(2006, 10, 10)
                };

                activityExists = _entities.Get<Activity>().Any(x => x.PersonId == person.RevisionId && x.Values.Any(y =>
                    createActivityValuesCommand.Title.Equals(y.Title)));
                if (!activityExists)
                {
                    createActivity = new CreateActivity(principal)
                    {
                        Mode = ActivityMode.Draft,
                    };

                    _createActivity.Handle(createActivity);
                    _unitOfWork.SaveChanges();

                    Activity activity = createActivity.CreatedActivity;

                    createActivityValuesCommand = new CreateActivityValues(principal)
                    {
                        ActivityId = activity.RevisionId,
                        Mode = activity.Mode,
                        Title = createActivityValuesCommand.Title,
                        Content = createActivityValuesCommand.Content,
                        StartsOn = createActivityValuesCommand.StartsOn,
                        EndsOn = createActivityValuesCommand.EndsOn,
                    };

                    _createActivityValues.Handle(createActivityValuesCommand);
                    _unitOfWork.SaveChanges();

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Conference")).Id,
                    });

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Teaching")).Id,
                    });

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Honor")).Id,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "China").RevisionId,
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "817DB81E-53FC-47E1-A1DE-B8C108C7ACD6.pdf",
                        MimeType = "application/pdf",
                        Title = "Make a contribution form"
                    });

                    _unitOfWork.SaveChanges();
                }

                #endregion
                #region Activity 4

                createActivityValuesCommand = new CreateActivityValues(principal)
                {
                    Title = "Guest performer and teacher, China Saxophone Festival, Dalian, China",
                    Content = "Adj Professor, Professor EmeritusJazz Studies, Saxophone Studies, Ensembles & Conducting College Conservatory of Music"
                };

                activityExists = _entities.Get<Activity>().Any(x => x.PersonId == person.RevisionId && x.Values.Any(y =>
                    createActivityValuesCommand.Title.Equals(y.Title)));
                if (!activityExists)
                {
                    createActivity = new CreateActivity(principal)
                    {
                        Mode = ActivityMode.Draft,
                    };

                    _createActivity.Handle(createActivity);
                    _unitOfWork.SaveChanges();

                    Activity activity = createActivity.CreatedActivity;

                    createActivityValuesCommand = new CreateActivityValues(principal)
                    {
                        ActivityId = activity.RevisionId,
                        Mode = activity.Mode,
                        Title = createActivityValuesCommand.Title,
                        Content = createActivityValuesCommand.Content,
                    };

                    _createActivityValues.Handle(createActivityValuesCommand);
                    _unitOfWork.SaveChanges();

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Creative")).Id,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "China").RevisionId,
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "5C62D74E-E8EE-4B9A-95F3-B2ABB1F6F912.gif",
                        MimeType = "image/gif",
                        Title = "Photo of the site"
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "A44FAB3B-DEBA-4F14-8965-E379569066A9.png",
                        MimeType = "image/png",
                        Title = "Grads working hard"
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "C0DA4900-762B-4B26-AE03-843CBB7C0E7B.bmp",
                        MimeType = "image/bmp",
                        Title = "Map of the incident"
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "E4E53300-08D3-47C0-954C-BF15EF54F0A3.tif",
                        MimeType = "image/tiff",
                        Title = "Sunrise over the delta"
                    });

                    Seed(new CreateActivityDocument(principal, activity.RevisionId)
                    {
                        FileName = "EE23D741-C50D-40D5-8214-C18DF68CC6D3.jpg",
                        MimeType = "image/jpg",
                        Title = "Me"
                    });

                    _unitOfWork.SaveChanges();
                }

                #endregion
                #region Activity 5

                createActivityValuesCommand = new CreateActivityValues(principal)
                {
                    Title = "Fulbright Scholar Award to Research and Teach at Zhejiang University",
                    Content = "I will be conducting research and teaching two courses to medical and public health students at Zhejiang University in Hangzhou China. I will also be working closely with Dr. Tingzhong Yang who directs an institute that studies tobacco related problems in China. Further I wish to explore differences in health knowledge, attitudes and behaviors between Chinese and US college students."
                };

                activityExists = _entities.Get<Activity>().Any(x => x.PersonId == person.RevisionId && x.Values.Any(y =>
                    createActivityValuesCommand.Title.Equals(y.Title)));
                if (!activityExists)
                {
                    createActivity = new CreateActivity(principal)
                    {
                        Mode = ActivityMode.Draft,
                    };

                    _createActivity.Handle(createActivity);
                    _unitOfWork.SaveChanges();

                    Activity activity = createActivity.CreatedActivity;

                    createActivityValuesCommand = new CreateActivityValues(principal)
                    {
                        ActivityId = activity.RevisionId,
                        Mode = activity.Mode,
                        Title = createActivityValuesCommand.Title,
                        Content = createActivityValuesCommand.Content,
                    };

                    _createActivityValues.Handle(createActivityValuesCommand);
                    _unitOfWork.SaveChanges();

                    _createActivityType.Handle(new CreateActivityType(principal, activity.RevisionId)
                    {
                        ActivityTypeId = employeeModuleSettings.ActivityTypes.Single(x => x.Type.Contains("Award")).Id,
                    });

                    _createActivityPlace.Handle(new CreateActivityPlace(principal, activity.RevisionId)
                    {
                        PlaceId = _entities.Get<Place>().Single(x => x.OfficialName == "China").RevisionId,
                    });

                    _unitOfWork.SaveChanges();
                }

                #endregion

            }
        }
    }

    public abstract class BaseActivityEntitySeeder : ISeedData
    {
        private readonly ICommandEntities _entities;
        private readonly IHandleCommands<CreateActivityDocument> _createDocument;
        private static readonly string BasePath = AppDomain.CurrentDomain.BaseDirectory +
                          @"..\UCosmic.Infrastructure\SeedData\SeedMediaFiles\";

        protected BaseActivityEntitySeeder(ICommandEntities entities
            , IHandleCommands<CreateActivityDocument> createDocument
        )
        {
            _entities = entities;
            _createDocument = createDocument;
        }

        public abstract void Seed();

        protected ActivityDocument Seed(CreateActivityDocument command)
        {
            var existingEntity = _entities.Get<ActivityDocument>()
                .SingleOrDefault(x => x.ActivityValues.ActivityId == command.ActivityId && x.FileName == command.FileName);
            if (existingEntity == null)
            {
                using (var fileStream = File.OpenRead(string.Format("{0}{1}", BasePath, command.FileName)))
                {
                    command.Content = fileStream.ReadFully();
                    _createDocument.Handle(command);
                    return command.CreatedActivityDocument;
                }
            }
            return existingEntity;
        }
    }
}