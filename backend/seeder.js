import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Artist from './models/artistModel.js'
import Painting from './models/paintingModel.js'
import Exhibition from './models/exhibitionModel.js'
import Feedback from './models/feedbackModel.js'
import Order from './models/orderModel.js'

// Sample data
import users from './data/users.js'
import artists from './data/artists.js'
import paintings from './data/paintings.js'
import exhibitions from './data/exhibitions.js'
import feedback from './data/feedback.js'
import orders from './data/orders.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://hello:hello123@restaurant.8j8yw.mongodb.net/ArtGallery")
  .then(() => {
    console.log('MongoDB Connected'.green.inverse)
    importData()
  })
  .catch(err => {
    console.error(`Error: ${err.message}`.red.inverse)
    process.exit(1)
  })

// Import all data
const importData = async () => {
  try {
    // Clear all collections
    await User.deleteMany()
    await Artist.deleteMany()
    await Painting.deleteMany()
    await Exhibition.deleteMany()
    await Feedback.deleteMany()
    await Order.deleteMany()

    console.log('Data cleared from database'.yellow)

    // Insert users
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    
    console.log('Users created'.green)

    // Insert artists
    const createdArtists = await Artist.insertMany(artists)
    console.log('Artists created'.green)

    // Prepare paintings with artist references
    const paintingsWithArtists = paintings.map((painting, index) => {
      return {
        ...painting,
        artist: createdArtists[index % createdArtists.length]._id
      }
    })
    
    // Insert paintings
    const createdPaintings = await Painting.insertMany(paintingsWithArtists)
    console.log('Paintings created'.green)

    // Prepare exhibitions with artist and painting references
    const exhibitionsWithRefs = exhibitions.map((exhibition, index) => {
      // Assign a subset of artists and paintings to each exhibition
      const startArtistIdx = index % createdArtists.length
      const artistIds = [
        createdArtists[startArtistIdx]._id,
        createdArtists[(startArtistIdx + 1) % createdArtists.length]._id
      ]

      const startPaintingIdx = index % createdPaintings.length
      const paintingIds = [
        createdPaintings[startPaintingIdx]._id,
        createdPaintings[(startPaintingIdx + 1) % createdPaintings.length]._id,
        createdPaintings[(startPaintingIdx + 2) % createdPaintings.length]._id
      ]

      return {
        ...exhibition,
        artists: artistIds,
        paintings: paintingIds
      }
    })

    // Insert exhibitions
    await Exhibition.insertMany(exhibitionsWithRefs)
    console.log('Exhibitions created'.green)

    // Insert feedback
    await Feedback.insertMany(feedback)
    console.log('Feedback created'.green)

    // Prepare orders with user and painting references
    const ordersWithRefs = orders.map((order, index) => {
      const userId = createdUsers[index % createdUsers.length]._id
      const orderItems = order.orderItems.map((item, idx) => {
        return {
          ...item,
          painting: createdPaintings[(index + idx) % createdPaintings.length]._id
        }
      })

      return {
        ...order,
        user: userId,
        orderItems
      }
    })

    // Insert orders
    await Order.insertMany(ordersWithRefs)
    console.log('Orders created'.green)

    console.log('Data Import Successful!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}