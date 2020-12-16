import {createClient} from 'contentful'

interface ContentfulConfig {
    space: string,
    accessToken: string
}

const config: ContentfulConfig = {
    space: process.env.CTF_SPACE_ID as string,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN as string
}

// https://www.contentful.com/developers/docs/references/content-delivery-api/
export default function () {
    return createClient(config)
}
