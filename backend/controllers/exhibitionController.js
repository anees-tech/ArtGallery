import Exhibition from "../models/exhibitionModel.js"

// @desc    Fetch all exhibitions
// @route   GET /api/exhibitions
// @access  Public
export const getExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find({}).populate("artists", "name").populate("paintings", "title imageUrl")
    res.json(exhibitions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single exhibition
// @route   GET /api/exhibitions/:id
// @access  Public
export const getExhibitionById = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id)
      .populate("artists", "name biography imageUrl")
      .populate("paintings", "title imageUrl price artist")

    if (exhibition) {
      res.json(exhibition)
    } else {
      res.status(404)
      throw new Error("Exhibition not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Create an exhibition
// @route   POST /api/exhibitions
// @access  Private/Admin
export const createExhibition = async (req, res) => {
  try {
    const { title, description, startDate, endDate, imageUrl, location, featured, artists, paintings } = req.body

    const exhibition = new Exhibition({
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      location,
      featured: featured || false,
      artists: artists || [],
      paintings: paintings || [],
    })

    const createdExhibition = await exhibition.save()
    res.status(201).json(createdExhibition)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update an exhibition
// @route   PUT /api/exhibitions/:id
// @access  Private/Admin
export const updateExhibition = async (req, res) => {
  try {
    const { title, description, startDate, endDate, imageUrl, location, featured, artists, paintings } = req.body

    const exhibition = await Exhibition.findById(req.params.id)

    if (exhibition) {
      exhibition.title = title || exhibition.title
      exhibition.description = description || exhibition.description
      exhibition.startDate = startDate || exhibition.startDate
      exhibition.endDate = endDate || exhibition.endDate
      exhibition.imageUrl = imageUrl || exhibition.imageUrl
      exhibition.location = location || exhibition.location
      exhibition.featured = featured !== undefined ? featured : exhibition.featured
      exhibition.artists = artists || exhibition.artists
      exhibition.paintings = paintings || exhibition.paintings

      const updatedExhibition = await exhibition.save()
      res.json(updatedExhibition)
    } else {
      res.status(404)
      throw new Error("Exhibition not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// @desc    Delete an exhibition
// @route   DELETE /api/exhibitions/:id
// @access  Private/Admin
export const deleteExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id)

    if (exhibition) {
      await exhibition.remove()
      res.json({ message: "Exhibition removed" })
    } else {
      res.status(404)
      throw new Error("Exhibition not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
