﻿using System.Web.Mvc;
using AttributeRouting.Web.Mvc;

namespace UCosmic.Web.Mvc.Controllers
{
    public partial class PeopleController : Controller
    {
        private readonly IProcessQueries _queryProcessor;

        public PeopleController(IProcessQueries queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [Authorize] // only signed-on users should be able to access this page
        [GET("my/info")]
        public virtual ActionResult Index()
        {
            //Person person = _queryProcessor.Execute(new MyPerson(User));
            ViewBag.PersonId = Request.Tenancy().PersonId;
            return View();
        }

        [Authorize]
        [GET("my/info2")]
        public virtual ActionResult Index2()
        {
            ViewBag.PersonId = Request.Tenancy().PersonId;
            return View();
        }

        //
        // GET: /EmployeePersonalInfo/Details/5

        public virtual ActionResult Details(int id)
        {
            //return View();
            return null;
        }

        //
        // GET: /EmployeePersonalInfo/Create

        public virtual ActionResult Create()
        {
            //return View();
            return null;
        }

        //
        // POST: /EmployeePersonalInfo/Create

        [HttpPost]
        public virtual ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                //return View();
                return null;
            }
        }

        //
        // GET: /EmployeePersonalInfo/Edit/5

        public virtual ActionResult Edit(int id)
        {
            //return View();
            return null;
        }

        //
        // POST: /EmployeePersonalInfo/Edit/5

        [HttpPost]
        public virtual ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                //return View();
                return null;
            }
        }

        //
        // GET: /EmployeePersonalInfo/Delete/5

        public virtual ActionResult Delete(int id)
        {
            //return View();
            return null;
        }

        //
        // POST: /EmployeePersonalInfo/Delete/5

        [HttpPost]
        public virtual ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                //return View();
                return null;
            }
        }
    }
}