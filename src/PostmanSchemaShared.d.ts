
export interface Auth {
  type: 'bearer'
  bearer?: {
    key: string
    value: string
  }[]
}

export interface Variable {
  key: string
  value: string
  disabled: boolean
}

export interface HeaderData {
  description: string
  enabled: boolean
  key: string
  name: string
  type: string
  value: string
}

export interface PathVariableData {
  key: string
  value: string
  description: string
}

export interface QueryParams {
  key: string
  value: string
  description: string
  enabled: boolean
}

export interface Request {
  method: string;
  headerData?: HeaderData[];
  url?: string;
  description?: string;
  name?: string;
  auth?: Auth;
  rawModeData?: string,
  pathVariableData?: PathVariableData[],
  queryParams?: QueryParams[],
}

export interface Collection {
  requests?: Request[]
  variables?: Variable[]
  auth?: Auth
  description?: string
  name: string
}