import { Property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

const createOrder = async (req, res) => {
    const { amount, propertyId, fromDate, toDate, guests } = req.body;

    const orderId = "order_" + Date.now();

    res.status(200).json({
        success: true,
        message: "Order created successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests
    });
};

const verifyPayment = async (req, res) => {
    const { orderId, bookingDetails, forceStatus } = req.body;

    if (forceStatus === "success") {
        const paymentId = "pay_" + Date.now();

        const newBooking = await Booking.create({
            property: bookingDetails.propertyId,
            user: req.user._id,
            price: bookingDetails.price,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            guests: bookingDetails.guests,
            numberOfNights: bookingDetails.nights,
            paid: true
        });

        const updatedProperty = await Property.findByIdAndUpdate(
            bookingDetails.propertyId,
            {
                $push: {
                    currentBookings: {
                        bookingId: newBooking._id,
                        fromDate: bookingDetails.fromDate,
                        toDate: bookingDetails.toDate,
                        userId: req.user._id
                    }
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Payment verified and booking created successfully",
            paymentId,
            orderId,
            booking: newBooking
        });

    } else {
        res.status(400).json({
            success: false,
            message: "Payment verification failed",
            orderId
        });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userBookings = await Booking.find({
            user: req.user._id
        });

        res.status(200).json({
            status: "success",
            data: {
                bookings: userBookings
            }
        });

    } catch (error) {
        res.status(401).json({
            status: "fail",
            message: error.message
        });
    }
};

const getBookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);

        res.status(200).json({
            status: "success",
            data: {
                booking
            }
        });

    } catch (error) {
        res.status(401).json({
            status: "fail",
            message: error.message
        });
    }
};

export {
    createOrder,
    verifyPayment,
    getUserBookings,
    getBookingDetails
};
