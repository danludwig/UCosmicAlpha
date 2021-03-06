﻿using System;
using System.Threading;

namespace UCosmic.Domain
{
    public abstract class RevisableEntity : Entity, IEquatable<RevisableEntity>
    {
        protected RevisableEntity()
        {
            EntityId = Guid.NewGuid();
            CreatedOnUtc = DateTime.UtcNow;
            CreatedByPrincipal = Thread.CurrentPrincipal.Identity.Name;
            IsCurrent = true;
        }

        public int RevisionId { get; protected internal set; }

        public Guid EntityId { get; protected internal set; }

        public DateTime CreatedOnUtc { get; protected internal set; }

        public string CreatedByPrincipal { get; protected internal set; }

        public DateTime? UpdatedOnUtc { get; protected internal set; }

        public string UpdatedByPrincipal { get; protected internal set; }

        public byte[] Version { get; protected internal set; }

        public bool IsCurrent { get; protected internal set; }

        public bool IsArchived { get; protected internal set; }

        public bool IsDeleted { get; protected internal set; }

        public override int GetHashCode()
        {
            return Equals(RevisionId, default(int)) ? 0 : RevisionId.GetHashCode();
        }

        public override bool Equals(object obj)
        {
            return Equals(obj as RevisableEntity);
        }

        public bool Equals(RevisableEntity other)
        {
            // instance is never equal to null
            if (other == null) return false;

            // when references are equal, they are the same object on the heap
            if (ReferenceEquals(this, other)) return true;

            // when the id's are equal and neither object is transient
            if (!IsTransient(this) && !IsTransient(other) && Equals(RevisionId, other.RevisionId))
            {
                // return true when one unproxied type is assignable to the other's unproxied type
                // because either this entity or the other entity could be generated by a proxy
                var otherType = other.GetUnproxiedType();
                var thisType = GetUnproxiedType();
                return thisType.IsAssignableFrom(otherType) || otherType.IsAssignableFrom(thisType);
            }
            return false;
        }

        private static bool IsTransient(RevisableEntity obj)
        {
            // an object is transient when its id is the default (null for strings or 0 for numbers)
            return Equals(obj.RevisionId, default(int));
        }

        private Type GetUnproxiedType()
        {
            return GetType(); // return the unproxied type of the object
        }
    }
}