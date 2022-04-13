const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export const fetchEntries = async (query) => {
  const entries = await client.getEntries(query);
  console.log("🚀 ~ file: api.js ~ line 11 ~ fetchEntries ~ entries", entries)
  
  if (entries.items) {
    return entries.items
  }
  console.log(`Error getting Entries for ${contentType.name}.`)
}

export const getContentType = async (query) => {
  const entries = await client.getContentTypes(query);
  console.log("🚀 ~ file: api.js ~ line 19 ~ getContentType ~ entries", entries)
  
  if (entries.items) {
    return entries.items
  }
  console.log(`Error getting Content for ${query}.`)
}
