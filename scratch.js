Student.findAll(dbModel.connection, function(data, err) {
  if(!err) {
    for(var i=0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})


Student.where(dbModel.connection, "firstname = 'David'", function(data,err) {
  if(!err) {
    for(var i = 0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})


// cohort

Cohort.findAll(dbModel.connection, function(data, err) {
  if(!err) {
    for(var i=0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})

Cohort.where(dbModel.connection, "name = 'Cool'", function(data,err) {
  if(!err) {
    for(var i = 0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})

// ORM 2
// -------------------------
Student.findAll(dbModel.connection, {limit:2 , offset: 0},function(data, err) {
  if(!err) {
    for(var i=0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})



Cohort.findAll(dbModel.connection, {limit:2 , offset: 1},function(data, err) {
  if(!err) {
    for(var i=0 ; i < data.length ; i++) {
      console.log(data[i]);
    }
  } else {
    console.log('Error');
  }
})





//
