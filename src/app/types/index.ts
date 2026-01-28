/**
 * Type definitions for the Trace of the Tides application
 */

/**
 * Content type for contributions and open calls
 */
export type ContentType = 'Article' | 'Video' | 'Audio' | 'Slide' | 'Document' | 'Image' | 'Other'

/**
 * Open Call status
 */
export type OpenCallStatus = 'Active' | 'Closed' | 'Upcoming'

/**
 * Open Call interface
 */
export interface OpenCall {
  /** Unique identifier */
  id: string
  /** Call title */
  title: string
  /** Description of the call */
  description: string
  /** Category/theme */
  category: string
  /** Creator/author */
  author: string
  /** Accepted content types */
  contentTypes: ContentType[]
  /** Start date */
  startDate: string
  /** End date */
  endDate: string
  /** Status */
  status: OpenCallStatus
  /** Cover image URL */
  coverImage?: string
  /** Number of participants */
  participantCount: number
  /** Number of contributions */
  contributionCount: number
}

/**
 * Open Call Participant
 */
export interface OpenCallParticipant {
  /** Participant ID */
  id?: string
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Email address */
  email: string
  /** Phone number */
  phone: string
  /** Field of expertise */
  expertise: string
  /** Short biography */
  bio: string
  /** Country */
  country: string
  /** City */
  city: string
  /** Uploaded files */
  files?: File[]
  /** Open Call ID they're joining */
  openCallId: string
}

/**
 * Collection interface
 */
export interface Collection {
  /** Unique identifier */
  id: string
  /** Collection title */
  title: string
  /** Description */
  description: string
  /** Theme/category */
  theme: string
  /** Curator/creator */
  curator: string
  /** Cover image URL */
  coverImage?: string
  /** Number of items in collection */
  itemCount: number
  /** Creation date */
  createdDate: string
  /** Last updated date */
  updatedDate: string
  /** Tags */
  tags: string[]
}
