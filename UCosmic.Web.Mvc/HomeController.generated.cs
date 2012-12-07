// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591
#region T4MVC

using System;
using System.Diagnostics;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Mvc.Html;
using System.Web.Routing;
using T4MVC;
namespace UCosmic.Web.Mvc.Controllers
{
    public partial class HomeController
    {
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public HomeController() { }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected HomeController(Dummy d) { }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected RedirectToRouteResult RedirectToAction(ActionResult result)
        {
            var callInfo = result.GetT4MVCResult();
            return RedirectToRoute(callInfo.RouteValueDictionary);
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected RedirectToRouteResult RedirectToActionPermanent(ActionResult result)
        {
            var callInfo = result.GetT4MVCResult();
            return RedirectToRoutePermanent(callInfo.RouteValueDictionary);
        }


        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public HomeController Actions { get { return MVC.Home; } }
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Area = "";
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Name = "Home";
        [GeneratedCode("T4MVC", "2.0")]
        public const string NameConst = "Home";

        static readonly ActionNamesClass s_actions = new ActionNamesClass();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionNamesClass ActionNames { get { return s_actions; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNamesClass
        {
            public readonly string Index = "Index";
            public readonly string Employees = "Employees";
            public readonly string Alumni = "Alumni";
            public readonly string Students = "Students";
            public readonly string Representatives = "Representatives";
            public readonly string Travel = "Travel";
            public readonly string CorporateEngagement = "CorporateEngagement";
            public readonly string GlobalPress = "GlobalPress";
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNameConstants
        {
            public const string Index = "Index";
            public const string Employees = "Employees";
            public const string Alumni = "Alumni";
            public const string Students = "Students";
            public const string Representatives = "Representatives";
            public const string Travel = "Travel";
            public const string CorporateEngagement = "CorporateEngagement";
            public const string GlobalPress = "GlobalPress";
        }


        static readonly ViewsClass s_views = new ViewsClass();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ViewsClass Views { get { return s_views; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ViewsClass
        {
            static readonly _ViewNamesClass s_ViewNames = new _ViewNamesClass();
            public _ViewNamesClass ViewNames { get { return s_ViewNames; } }
            public class _ViewNamesClass
            {
                public readonly string Alumni = "Alumni";
                public readonly string CorporateEngagement = "CorporateEngagement";
                public readonly string Employees = "Employees";
                public readonly string GlobalPress = "GlobalPress";
                public readonly string Index = "Index";
                public readonly string Representatives = "Representatives";
                public readonly string Students = "Students";
                public readonly string Travel = "Travel";
            }
            public readonly string Alumni = "~/Views/Home/Alumni.cshtml";
            public readonly string CorporateEngagement = "~/Views/Home/CorporateEngagement.cshtml";
            public readonly string Employees = "~/Views/Home/Employees.cshtml";
            public readonly string GlobalPress = "~/Views/Home/GlobalPress.cshtml";
            public readonly string Index = "~/Views/Home/Index.cshtml";
            public readonly string Representatives = "~/Views/Home/Representatives.cshtml";
            public readonly string Students = "~/Views/Home/Students.cshtml";
            public readonly string Travel = "~/Views/Home/Travel.cshtml";
        }
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public class T4MVC_HomeController : UCosmic.Web.Mvc.Controllers.HomeController
    {
        public T4MVC_HomeController() : base(Dummy.Instance) { }

        public override System.Web.Mvc.ActionResult Index()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Index);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Employees()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Employees);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Alumni()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Alumni);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Students()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Students);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Representatives()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Representatives);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult Travel()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Travel);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult CorporateEngagement()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.CorporateEngagement);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult GlobalPress()
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.GlobalPress);
            return callInfo;
        }

    }
}

#endregion T4MVC
#pragma warning restore 1591