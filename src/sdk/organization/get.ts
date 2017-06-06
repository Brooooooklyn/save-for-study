import { SDK, SDKFetch, OrganizationSchema, CacheStrategy } from 'teambition-sdk'

function getOrganizationsFetch (this: SDKFetch) {
  return this.get<OrganizationSchema[]>(`organizations`)
}

SDKFetch.prototype.getOrganizations = getOrganizationsFetch

declare module 'teambition-sdk/SDKFetch' {
  interface SDKFetch {
    getOrganizations: typeof getOrganizationsFetch
  }
}

function getOrganizations (this: SDK) {
  return this.lift<OrganizationSchema>({
    tableName: 'Organization',
    request: this.fetch.getOrganizations(),
    cacheValidate: CacheStrategy.Request,
    query: {
      where: {
       $or: [
         {
           isArchived: null
         },
         {
           isArchived: false
         }
       ]
      }
    }
  })
}

SDK.prototype.getOrganizations = getOrganizations

declare module 'teambition-sdk/SDK' {
  interface SDK {
    getOrganizations: typeof getOrganizations
  }
}
