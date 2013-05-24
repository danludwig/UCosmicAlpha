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
    public partial class MyProfileController
    {
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        protected MyProfileController(Dummy d) { }

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

        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult Index()
        {
            return new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Index);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult ActivityEdit()
        {
            return new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.ActivityEdit);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult DegreeEdit()
        {
            return new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.DegreeEdit);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult GeographicExpertiseEdit()
        {
            return new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.GeographicExpertiseEdit);
        }
        [NonAction]
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public System.Web.Mvc.ActionResult LanguageExpertiseEdit()
        {
            return new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.LanguageExpertiseEdit);
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public MyProfileController Actions { get { return MVC.MyProfile; } }
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Area = "";
        [GeneratedCode("T4MVC", "2.0")]
        public readonly string Name = "MyProfile";
        [GeneratedCode("T4MVC", "2.0")]
        public const string NameConst = "MyProfile";

        static readonly ActionNamesClass s_actions = new ActionNamesClass();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionNamesClass ActionNames { get { return s_actions; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNamesClass
        {
            public readonly string Index = "Index";
            public readonly string ActivityEdit = "ActivityEdit";
            public readonly string DegreeEdit = "DegreeEdit";
            public readonly string GeographicExpertiseEdit = "GeographicExpertiseEdit";
            public readonly string LanguageExpertiseEdit = "LanguageExpertiseEdit";
        }

        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionNameConstants
        {
            public const string Index = "Index";
            public const string ActivityEdit = "ActivityEdit";
            public const string DegreeEdit = "DegreeEdit";
            public const string GeographicExpertiseEdit = "GeographicExpertiseEdit";
            public const string LanguageExpertiseEdit = "LanguageExpertiseEdit";
        }


        static readonly ActionParamsClass_Index s_params_Index = new ActionParamsClass_Index();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_Index IndexParams { get { return s_params_Index; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_Index
        {
            public readonly string tab = "tab";
        }
        static readonly ActionParamsClass_ActivityEdit s_params_ActivityEdit = new ActionParamsClass_ActivityEdit();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_ActivityEdit ActivityEditParams { get { return s_params_ActivityEdit; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_ActivityEdit
        {
            public readonly string activityId = "activityId";
        }
        static readonly ActionParamsClass_DegreeEdit s_params_DegreeEdit = new ActionParamsClass_DegreeEdit();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_DegreeEdit DegreeEditParams { get { return s_params_DegreeEdit; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_DegreeEdit
        {
            public readonly string degreeId = "degreeId";
        }
        static readonly ActionParamsClass_GeographicExpertiseEdit s_params_GeographicExpertiseEdit = new ActionParamsClass_GeographicExpertiseEdit();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_GeographicExpertiseEdit GeographicExpertiseEditParams { get { return s_params_GeographicExpertiseEdit; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_GeographicExpertiseEdit
        {
            public readonly string expertiseId = "expertiseId";
        }
        static readonly ActionParamsClass_LanguageExpertiseEdit s_params_LanguageExpertiseEdit = new ActionParamsClass_LanguageExpertiseEdit();
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public ActionParamsClass_LanguageExpertiseEdit LanguageExpertiseEditParams { get { return s_params_LanguageExpertiseEdit; } }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public class ActionParamsClass_LanguageExpertiseEdit
        {
            public readonly string expertiseId = "expertiseId";
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
                public readonly string _Activities = "_Activities";
                public readonly string _Affiliations = "_Affiliations";
                public readonly string _Degrees = "_Degrees";
                public readonly string _EmailAddresses = "_EmailAddresses";
                public readonly string _GeographicExpertises = "_GeographicExpertises";
                public readonly string _LanguageExpertises = "_LanguageExpertises";
                public readonly string _PersonalInfo = "_PersonalInfo";
                public readonly string ActivityEdit = "ActivityEdit";
                public readonly string DegreeEdit = "DegreeEdit";
                public readonly string GeographicExpertiseEdit = "GeographicExpertiseEdit";
                public readonly string Index = "Index";
                public readonly string LanguageExpertiseEdit = "LanguageExpertiseEdit";
            }
            public readonly string _Activities = "~/Views/MyProfile/_Activities.cshtml";
            public readonly string _Affiliations = "~/Views/MyProfile/_Affiliations.cshtml";
            public readonly string _Degrees = "~/Views/MyProfile/_Degrees.cshtml";
            public readonly string _EmailAddresses = "~/Views/MyProfile/_EmailAddresses.cshtml";
            public readonly string _GeographicExpertises = "~/Views/MyProfile/_GeographicExpertises.cshtml";
            public readonly string _LanguageExpertises = "~/Views/MyProfile/_LanguageExpertises.cshtml";
            public readonly string _PersonalInfo = "~/Views/MyProfile/_PersonalInfo.cshtml";
            public readonly string ActivityEdit = "~/Views/MyProfile/ActivityEdit.cshtml";
            public readonly string DegreeEdit = "~/Views/MyProfile/DegreeEdit.cshtml";
            public readonly string GeographicExpertiseEdit = "~/Views/MyProfile/GeographicExpertiseEdit.cshtml";
            public readonly string Index = "~/Views/MyProfile/Index.cshtml";
            public readonly string LanguageExpertiseEdit = "~/Views/MyProfile/LanguageExpertiseEdit.cshtml";
        }
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public class T4MVC_MyProfileController : UCosmic.Web.Mvc.Controllers.MyProfileController
    {
        public T4MVC_MyProfileController() : base(Dummy.Instance) { }

        public override System.Web.Mvc.ActionResult Index(string tab)
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.Index);
            ModelUnbinderHelpers.AddRouteValues(callInfo.RouteValueDictionary, "tab", tab);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult ActivityEdit(int activityId)
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.ActivityEdit);
            ModelUnbinderHelpers.AddRouteValues(callInfo.RouteValueDictionary, "activityId", activityId);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult DegreeEdit(string degreeId)
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.DegreeEdit);
            ModelUnbinderHelpers.AddRouteValues(callInfo.RouteValueDictionary, "degreeId", degreeId);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult GeographicExpertiseEdit(string expertiseId)
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.GeographicExpertiseEdit);
            ModelUnbinderHelpers.AddRouteValues(callInfo.RouteValueDictionary, "expertiseId", expertiseId);
            return callInfo;
        }

        public override System.Web.Mvc.ActionResult LanguageExpertiseEdit(string expertiseId)
        {
            var callInfo = new T4MVC_System_Web_Mvc_ActionResult(Area, Name, ActionNames.LanguageExpertiseEdit);
            ModelUnbinderHelpers.AddRouteValues(callInfo.RouteValueDictionary, "expertiseId", expertiseId);
            return callInfo;
        }

    }
}

#endregion T4MVC
#pragma warning restore 1591
