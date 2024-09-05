import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    let updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to dekete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: "User not Found" });
  }
};

export const getAllUsers = async (req, res) => {
  const id = req.params.id;
  try {
    let users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Getting Profile Data",
      data: { ...rest },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });

    const doctorIds = bookings.map((el) => el.doctor.id);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({ success: true, message: "Getting Appointments", data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
