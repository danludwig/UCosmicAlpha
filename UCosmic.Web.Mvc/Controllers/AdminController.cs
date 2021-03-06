﻿using System.Collections.Generic;
using System.Web.Mvc;
using AttributeRouting.Web.Mvc;

namespace UCosmic.Web.Mvc.Controllers
{
    [RestfulRouteConvention]
    public partial class AdminController : Controller
    {
        [CurrentModuleTab(ModuleTab.Admin)]
        public virtual ActionResult Index()
        {
            return View();
        }

        [ChildActionOnly]
        [Route("admin/tenants")]
        public virtual PartialViewResult TenantLogos(bool includeDefault = true)
        {
            var model = new Dictionary<string, string>
            {
                { "State University of New York", "suny.edu" },
                { "University of Cincinnati", "uc.edu" },
                { "Edinburgh Napier University", "napier.ac.uk" },
                { "Hawaii Pacific University", "hpu.edu" },
                { "Lehigh University", "lehigh.edu" },
                { "University of South Florida System", "usf.edu" },
                { "University of the West Indies", "uwi.edu" },
                { "University of Wisconsin Milwaukee", "uwm.edu" },
                { "Western University", "westernu.ca" },
            };
            if (includeDefault)
                model.Add("The UCosmic Consortium", "_default");
            return PartialView(MVC.Admin.Views._TenantLogos, model);
        }
    }
}
