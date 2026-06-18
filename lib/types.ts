export type ProjectCategory = 'mini' | 'midi' | 'maxi'
export type ProjectFinish = 'comfort' | 'business'

export interface Project {
  slug: string
  name: string
  category: ProjectCategory
  finish: ProjectFinish[]
  area: number
  floors: number
  buildTime: string
  priceFrom: number
  images: string[]
  video?: string
  shortDesc: string
  comfortDesc: string
  businessDesc: string
  comfortIncludes: string[]
  businessIncludes: string[]
  floorPlan?: string
}

export interface Review {
  name: string
  text: string
  rating: number
  photo?: string
  date: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Step {
  number: number
  title: string
  desc: string
}
