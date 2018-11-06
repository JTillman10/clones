echo INSTALLING cli
npm install @angular/cli
cd ./ng-trellone
echo INSTALL DEPENDENCIES
npm install
echo BUILDING FRONTEND FOR PROD
ng build --aot --prod
ls