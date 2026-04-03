export const customTypes = `
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Location {
    address: String
    street: String
    zipcode: String
    borough: String
    cuisine: String
    grade: String
    name: String
    on_wishlist: [String] @cacheControl(maxAge: 60)
    location_id: String
  }
`;