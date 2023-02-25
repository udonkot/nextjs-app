/**
 *
 */
export type redmineUserType = {
  id:string,
  login:string,
  admin:string,
  firstname:string,
  lastname:string,
  mail:string,
  created_on:string,
  updated_on:string,
  last_login_on:string,
  passwd_changed_on:string,
  twofa_scheme:string,
}

/**
 *
 */
export type redmineUserResponseType = {
  limit: number,
  offset: number,
  total_count: number,
  users: redmineUserType[]
}

/**
 *
 */
export type redmineTicketResponseType = {
  limit: number,
  offset: number,
  total_count: number,
  issues: redmineTicketType[]
}

/**
 *
 */
export type redmineTicketParamType = {
  id: number,
  name: string,
  value?: string,
}

export type redmineTicketType = {
    id: number,
    project: redmineTicketParamType,
    tracker: redmineTicketParamType,
    status: redmineTicketParamType,
    priority: redmineTicketParamType,
    author: redmineTicketParamType,
    assigned_to: redmineTicketParamType,
    subject: string,
    description: string,
    start_date: string,
    due_date: string,
    done_ratio: string,
    is_private: string,
    estimated_hours: string,
    custom_fields: redmineTicketParamType[],
    created_on: string,
    updated_on: string,
    closed_on: string,
}