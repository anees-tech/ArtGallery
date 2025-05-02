import Feedback from "../models/feedbackModel.js"

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
export const createFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body

    const feedback = new Feedback({
      name,
      email,
      message,
      rating,
    })

    const createdFeedback = await feedback.save()
    res.status(201).json(createdFeedback)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private/Admin
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({}).sort({ createdAt: -1 })
    res.json(feedback)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)

    if (feedback) {
      await feedback.remove()
      res.json({ message: "Feedback removed" })
    } else {
      res.status(404)
      throw new Error("Feedback not found")
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
