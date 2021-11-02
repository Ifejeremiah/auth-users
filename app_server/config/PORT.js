module.exports = (app) => {   // Set PORT for application to listen to
  if (app.get('port')) {
    return app.get('port');
  } else {
    return '4500';    //Set PORT default value
  }
}