exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.sample = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.edition = function(req, res){
  res.render('index', { title: 'Edition' });
};