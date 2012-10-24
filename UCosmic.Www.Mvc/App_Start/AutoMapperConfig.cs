﻿using System.Reflection;
using AutoAutoMapper;
using AutoMapper;
using UCosmic.Domain;

namespace UCosmic.Www.Mvc
{
    public static class AutoMapperConfig
    {
        public static void RegisterProfiles()
        {
            var assemblies = new[]
            {
                Assembly.GetAssembly(typeof(WebApiApplication)),
                Assembly.GetAssembly(typeof(Entity)),
            };

            AutoProfiler.RegisterProfiles(assemblies);
            Mapper.AssertConfigurationIsValid();
        }
    }
}