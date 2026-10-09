import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema=new mongoose.Schema({
    propertyName:{
        type:String,
        required:[true,"Please enter property name"],
    },
    description:{
        type:String,
        required:[true,"Please enter property description"],
    },
    extraInfo:{
        type:String,
        default:"Checkin on time.good services",
    },
    propertyType:{
        type:String,
        enum:["Hotel","Flat","Guest House","House"],
        default:"House"
    },
    roomType:{
        type:String,
        enum:["Anytype","Room","Entire Home"],
        default:"Anytype"
    },
    maximumGuest:{
        type:Number,
        required:[true,"Please enter maximum guest"],
    },
    amenities:[
        {
            name:{
                type:String,
                required:true,
                enum:[
                    "Wifi",
                    "Kitchen",
                    "AC",
                    "TV",
                    "Washing Machine",
                    "Fridge",
                    "Pool",
                    "Gym",
                    "Free Parking"

                ]
            },
            icon:{
                type:String,
                required:true,

            }
        }
    ],
    images: {
    type: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    validate: {
        validator: function(arr) {
            return arr.length >= 6;
        },
        message: "The images must contain at least 6 images"
    }
},
    price:{
        type:Number,
        required:[true,"Please enter property price"],
        default:500
    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:Number,
    },

    currentBookings:[
        {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date,
            },
            toDate:{
                type:Date,
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }

    ],

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    slug:String,
    checkInTime:{
        type:String,
        default:"11.00"
    },
    checkOutTime:{
        type:String,
        default:"13.00"
    }


}

)
propertySchema.pre("save",function(next){
    this.slug=slugify(this.propertyName,{lower:true});
    next();
})

propertySchema.pre("save",function(next){
    this.address.city=this.address.city.toLocaleLowerCase().replaceAll(" ","");
    next();
})

const Property=mongoose.models.Property||mongoose.model("Property",propertySchema);


export {Property};

