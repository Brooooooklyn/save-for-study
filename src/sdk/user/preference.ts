import { SDK, SDKFetch, CacheStrategy, PreferenceSchema } from 'teambition-sdk'

function getPreferenceFetch (this: SDKFetch) {
  return this.get<PreferenceSchema>('preferences')
}

SDKFetch.prototype.getPreference = getPreferenceFetch

declare module 'teambition-sdk/SDKFetch' {
  interface SDKFetch {
    getPreference: typeof getPreferenceFetch
  }
}

function getPreference (this: SDK) {
  return this.lift<PreferenceSchema>({
    tableName: 'Preference',
    request: this.fetch.getPreference(),
    cacheValidate: CacheStrategy.Request,
    query: { }
  })
}

SDK.prototype.getPreference = getPreference

declare module 'teambition-sdk/SDK' {
  interface SDK {
    getPreference: typeof getPreference
  }
}
