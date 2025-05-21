const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export const fetchEntries = async (query) => {
  const entries = await client.getEntries(query);
  if (entries.items) {
    return entries.items
  }
  console.error(`Error getting Entries for ${contentType.name}.`)
}

export const getContentType = async (query) => {
  const entries = await client.getContentTypes(query);
  if (entries.items) {
    return entries.items
  }
  console.error(`Error getting Content for ${query}.`)
}
