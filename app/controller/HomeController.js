exports.index = (req, res) => {
   res.render('index', {title: 'Tana Trip Booking'});
}

exports.management = (req, res) => {
   res.render('admin/index', {title: 'Tana Trip Booking Mangement'});
}

exports.login = (req, res) => {
   res.render('admin/login', {title: 'Tana Login'});
}