//this is basically to make a common functions for the fields for filtering , pagination , limits

const advancedResults=(model,populate)=>async(req,res,next)=>{

 let query;
 //copy re.query
 const reqQuery = { ...req.query };

 //exclude fields
 const removeFields = ['select', 'sort', 'page', 'limit'];
 //loop over removeFields and delete them from reqQuery
 removeFields.forEach((param) => delete reqQuery[param]);
 console.log(reqQuery);

 //create query string
 let queryStr = JSON.stringify(reqQuery);

 //gt = greater than , gte=greater than equal to , lt = less than , lte =less than equal to
 queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

 console.log(queryStr);

 //now we will pass this to the find all resources
 query = model.find(JSON.parse(queryStr)).populate('courses');

 //select fields

 if (req.query.select) {
   const fields = req.query.select.split(',').join(' ');
   query = query.select(fields);
 }

 //Sort
 if (req.query.sort) {
   const sortBy = req.query.sort.split(',').join(' ');
   query = query.sort(sortBy);
 } else {
   query = query.sort('-createdAt');
 }
 
 //Pagination

 const page = parseInt(req.query.page, 10) || 1;
 const limit = parseInt(req.query.limit, 10) || 25;
 const startIndex = (page - 1) * limit;
 const endIndex = page * limit;
 const total = await model.countDocuments();

 query = query.skip(startIndex).limit(limit);


 if(populate){
    query=query.populate(populate);
 }

 //executing query
 const results = await query;

 //pagination result

 const pagination = {};

 if (endIndex < total) {
   pagination.next = {
     page: page + 1,
     limit,
   };
 }

 if (startIndex > 0) {
   pagination.prev = {
     page: page - 1,
     limit,
   };
 }

res.advancedResults={
    success:true,
    count:results.length,
    pagination,
    data: results
}
next();

};
module.exports=advancedResults;