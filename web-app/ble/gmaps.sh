cordova platform remove ios
cordova platform add ios
cordova plugin add plugin.google.maps --variable API_KEY_FOR_ANDROID=AIzaSyBdY57uoOyM2yw4zqiScLFF0o9YGUrJDVI --variable API_KEY_FOR_IOS=AIzaSyDSrkyTWrJ4Oev1KYcFstQIfdijqZRmzss
cd platforms/ios/tech_it_d4ys/Plugins/com.googlemaps.ios/GoogleMaps.framework/
cd platforms/ios/ScalaIO/Plugins/com.googlemaps.ios/GoogleMaps.framework/
rm GoogleMaps Headers Resources
cd Versions
rm Current
ln -s A Current
cd ..
ln -s Versions/Current/GoogleMaps GoogleMaps
ln -s Versions/Current/Headers Headers
ln -s Versions/Current/Resources Resources
