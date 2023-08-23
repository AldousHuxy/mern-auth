import { Document, Schema, model } from 'mongoose';

// Setup Game interface
interface IGame extends Document {
    title: string
    release: string
    publisher: string
    developer: string
    genre: string
    description: string
    image: string
    price: number
}

// Create Game schema
const gameSchema = new Schema<IGame>({
    title: { type: String, required: true },
    release: { type: String, required: true },
    publisher: { type: String, required: true },
    developer: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
})

// Export Game model
export const Game = model<IGame>('Game', gameSchema)