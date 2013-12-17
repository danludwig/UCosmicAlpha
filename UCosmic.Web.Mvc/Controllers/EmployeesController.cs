﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Web.Mvc;
using AttributeRouting.Web.Mvc;
using AutoMapper;
using UCosmic.Domain.Activities;
using UCosmic.Domain.Establishments;
using UCosmic.Web.Mvc.Models;

namespace UCosmic.Web.Mvc.Controllers
{
    [UserVoiceForum(UserVoiceForum.Employees)]
    public partial class EmployeesController : Controller
    {
        private readonly IProcessQueries _queryProcessor;
        private readonly IQueryEntities _queryEntities;

        public EmployeesController(IProcessQueries queryProcessor, IQueryEntities queryEntities)
        {
            _queryProcessor = queryProcessor;
            _queryEntities = queryEntities;
        }

        [GET("employees")]
        public virtual ActionResult Index()
        {
            return View();
        }

        [GET("{domain}/employees")]
        public virtual ActionResult TenantIndex(string domain)
        {
            var establishment = _queryProcessor.Execute(new EstablishmentByDomain(domain));
            if (establishment == null) return HttpNotFound();
            ViewBag.EmployeesDomain = domain;
            ViewBag.EmployeesEstablishmentId = establishment.RevisionId;
            return View();
        }

        [GET("{domain}/employees/table")]
        public virtual ActionResult Table(string domain, ActivitySearchInputModel input)
        {
            var query = new ActivitiesByKeyword
            {
                EstablishmentDomain = domain,
                EagerLoad = ActivitySearchResultProfiler.EntitiyToModel.EagerLoad,
            };
            Mapper.Map(input, query);
            var results = _queryProcessor.Execute(query);

            var model = new ActivitySearchModel
            {
                Input = input,
                Output = Mapper.Map<PageOfActivitySearchResultModel>(results),
            };

            using (var http = new HttpClient())
            {
                Debug.Assert(Request.Url != null);
                var url = Url.RouteUrl(null, new { controller = "Countries", httproute = "", }, Request.Url.Scheme);
                var countries = http.GetAsync(url).Result.Content.ReadAsAsync<IEnumerable<CountryApiModel>>().Result.ToList();
                countries.Add(new CountryApiModel { Name = "[Without country]", Code = "-1" });
                model.CountryOptions = countries.Select(x => new SelectListItem
                {
                    Text = x.Name,
                    Value = x.Code,
                    Selected = x.Code == input.CountryCode,
                });
            }

            return View(model);
        }

    }
}
