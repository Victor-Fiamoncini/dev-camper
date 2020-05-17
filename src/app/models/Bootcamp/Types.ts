import { Document } from 'mongoose'

export default interface IBootcamp extends Document {
	name: string
	slug?: string
	description: string
	website?: string
	phone: string
	email: string
	address: string
	location: {
		type: string
		coordinates: number[]
		formattedAddress?: String
		street?: String
		city?: String
		state?: String
		zipcode?: String
		country?: String
	}
	careers: string[]
	averageRating?: number
	averageCost?: number
	photo?: string
	housing?: boolean
	jobAssistance?: boolean
	jobGuarantee?: boolean
	acceptGi?: boolean
}
