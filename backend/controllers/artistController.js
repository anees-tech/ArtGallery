import Artist from "../models/artistModel.js"

// @desc    Fetch all artists
// @route   GET /api/artists
// @access  Public
export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find({})
    res.json(artists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single artist
// @route   GET /api/artists/:id
// @access  Public
export const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)

    if (artist) {
      res.json(artist)
    } else {
      res.status(404)
      throw new Error("Artist not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Create an artist
// @route   POST /api/artists
// @access  Private/Admin
export const createArtist = async (req, res) => {
  try {
    const { name, biography, imageUrl, nationality, birthYear, deathYear, featured } = req.body

    const artist = new Artist({
      name,
      biography,
      imageUrl,
      nationality,
      birthYear,
      deathYear: deathYear || null,
      featured: featured || false,
    })

    const createdArtist = await artist.save()
    res.status(201).json(createdArtist)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update an artist
// @route   PUT /api/artists/:id
// @access  Private/Admin
export const updateArtist = async (req, res) => {
  try {
    const { name, biography, imageUrl, nationality, birthYear, deathYear, featured } = req.body

    const artist = await Artist.findById(req.params.id)

    if (artist) {
      artist.name = name || artist.name
      artist.biography = biography || artist.biography
      artist.imageUrl = imageUrl || artist.imageUrl
      artist.nationality = nationality || artist.nationality
      artist.birthYear = birthYear || artist.birthYear
      artist.deathYear = deathYear !== undefined ? deathYear : artist.deathYear
      artist.featured = featured !== undefined ? featured : artist.featured

      const updatedArtist = await artist.save()
      res.json(updatedArtist)
    } else {
      res.status(404)
      throw new Error("Artist not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Delete an artist
// @route   DELETE /api/artists/:id
// @access  Private/Admin
export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)

    if (artist) {
      await artist.remove()
      res.json({ message: "Artist removed" })
    } else {
      res.status(404)
      throw new Error("Artist not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
