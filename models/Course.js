const mongoose = require('mongoose');

const CourseSchemma = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please enter the title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a description'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarhipAvailable: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});


CourseSchemma.statics.getAverageCost=async function(bootcampId){
  console.log('Calculating average cost...'.blue);

  const obj=await this.aggregate([
{
  $match:{bootcamp:bootcampId}
},
{
  $group:{
    _id:'$bootcamp',
    averageCost:{$avg:'$tuition'}
  }
}

  ]);

 // console.log(obj);  this is to get averagecost in console
 //lets get update the average cost in the db

 try{
  await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{

    averageCost:Math.ceil(obj[0].averageCost/10)*10,
  })
 }catch(err){
  console.error(err);

 }


}

// Call getAverageCost after save
CourseSchemma.post('save',function(){
  this.constructor.getAverageCost(this.bootcamp);

})
// Call getAverageCost before remove
CourseSchemma.pre('remove',function(){
 this.constructor.getAverageCost(this.bootcamp);
})

module.exports=mongoose.model('Course',CourseSchemma);
