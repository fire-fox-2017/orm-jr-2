Student.findAll(dbModel.connection, {limit:2, offset:0}, function(data,err){
  if(!err){
    for(var i=0;i<data.length;i++){
      console.log(data[i]);
    }
  }
  else{
    console.log(err.message);
  }
})

Student.findOrCreate(dbModel.connection, new Student("Windiana", "Krismanuyar", 1))
