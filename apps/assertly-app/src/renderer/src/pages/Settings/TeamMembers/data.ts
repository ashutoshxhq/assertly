export type TeamMember = {
  sNo: number // handle from FE or remove if overkill
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'OWNER' | 'STAFF'
  status: 'ACTIVE' | 'DISABLED' | 'INVITED'
  lastActive: string // ISO 8601 UTC Datetime
}

export const teamMembers: TeamMember[] = [
  {
    sNo: 1,
    id: '14a5c9cb-2156-4117-ac69-ccfc18742b1a',
    name: 'Rosabel Baudacci',
    email: 'rbaudacci0@topsy.com',
    role: 'OWNER',
    status: 'ACTIVE',
    lastActive: '2024-01-01T21:26:24Z'
  },
  {
    sNo: 2,
    id: '4d1b7d40-19a7-4f3c-98a6-92a9e8d23e27',
    name: 'Lari Gothrup',
    email: 'lgothrup1@geocities.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    lastActive: '2024-05-09T14:35:47Z'
  },
  {
    sNo: 3,
    id: 'b1847ff5-1141-439b-828e-c0fc07b3da16',
    name: 'Annalise Merle',
    email: 'amerle2@instagram.com',
    role: 'STAFF',
    status: 'ACTIVE',
    lastActive: '2024-04-02T05:18:21Z'
  },
  {
    sNo: 4,
    id: 'f106fb9d-ce43-4006-b430-70986dcfc319',
    name: 'Anthiathia Mealham',
    email: 'amealham3@comcast.net',
    role: 'STAFF',
    status: 'ACTIVE',
    lastActive: '2024-04-19T23:18:54Z'
  },
  {
    sNo: 5,
    id: 'd7a86cf6-cf2e-461a-a2b9-a5852c06905b',
    name: 'Brose Reason',
    email: 'breason4@nytimes.com',
    role: 'STAFF',
    status: 'ACTIVE',
    lastActive: '2024-02-07T08:00:43Z'
  },
  {
    sNo: 6,
    id: '8818548b-f49b-4b31-8bad-a5f588256cce',
    name: 'Ailis Ryce',
    email: 'aryce5@google.com.au',
    role: 'STAFF',
    status: 'INVITED',
    lastActive: '2024-05-24T23:17:10Z'
  },
  {
    sNo: 7,
    id: 'd7d2b93d-3cc4-4003-ad19-894ac3346246',
    name: 'Elianore Nisuis',
    email: 'enisuis6@nsw.gov.au',
    role: 'STAFF',
    status: 'DISABLED',
    lastActive: '2023-11-28T22:32:29Z'
  }
]
