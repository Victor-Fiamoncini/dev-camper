import { Document } from 'mongoose'

export default interface ICourseDTO extends Document {
	title: string
	slug?: string
	description: string
	weeks: string
	tuition: number
	minimumSkill: string
	scholarshipAvailable: boolean
	bootcamp: string
}
