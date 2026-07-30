export type ProjectCategory = 'mini' | 'midi' | 'maxi'

export interface Project {
  slug: string
  name: string
  category: ProjectCategory
  area: number
  floors: 1 | 2
  bedrooms: number
  garage: boolean
  spa: boolean
  buildTime: string
  priceFrom: number
  images: string[]
  video?: string
  shortDesc: string
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
