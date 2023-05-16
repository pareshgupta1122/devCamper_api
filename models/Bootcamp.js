const mongoose=require('mongoose');
const slugify=require('slugify');
const geocoder=require('../utlis/geocoder');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name cannot be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    unique: true,
    trim: true,
    maxlength: [500, 'desc cannot be more than 500 characters'],
  },

  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please add a valid URl with HTTP or https',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot we more than 20'],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
     
    },
    coordinates: {
      type: [Number],
      
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be atleast 1'],
    max: [10, 'Rating must cannot be greater than 10'],
  },
  averageCost: Number,

  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: String,
    default: 'no-photo.jpg',
  },
  jobGurantee: {
    type: String,
    default: 'no-photo.jpg',
  },
  acceptGi: {
    type: String,
    default: 'no-photo.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}

}
);

BootcampSchema.pre('save',function(next) {
  //console.log('Slugfy ran',this.name);

  this.slug=slugify(this.name,{lower:true});
  next();
  
})
//Geocode and create location field

BootcampSchema.pre('save',async function(next){
const loc =  await geocoder.geocode(this.address);
this.location = {
  type: 'Point',
  coordinates: [loc[0].longitude, loc[0].latitude],
  formattedAddress: loc[0].formattedAddress,
  street: loc[0].streetName,
  city: loc[0].city,
  state: loc[0].state,
  zipcode: loc[0].zipcode,
  country: loc[0].countryCode,
};
//do not save address in DB
this.address=undefined;

next();


});
//Cascade delete courses with the bootcamp of that id is deleted.
BootcampSchema.pre('remove',async function(next){
  console.log(`Courses being removed from bootcamp ${this._id}`);

  await this.model('Course').deleteMany({bootcamp: this._id}); //to use that middleware we have to go to controllers of delete
  next();
});

//Reverse populate with virtuals i.e the bootcamps will have the courses properties in the database as a paramter

BootcampSchema.virtual('courses',{

  ref:'Course',
  localField:'_id',
  foreignField:'bootcamp', //name will be the field name that is in the courses models
  justOne:false,
});



module.exports=mongoose.model('Bootcamp',BootcampSchema);