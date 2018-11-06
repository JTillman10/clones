cd ./ng-trellone
# echo INSTALLING cli
# npm install @angular/cli
echo INSTALL DEPENDENCIES
npm install
echo BUILDING FRONTEND FOR PROD
ng build --aot --prod
cp -a  ./ng-trellone/dist/. ./dist/client