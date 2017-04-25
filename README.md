# ageRanger


Net core and EF for SqlLite are used for building REST API. 
Front end built using Angular2 via Typescripts. Rely on typescript compiler to transcompile to javascript. 
Uses MSTest instead of XUnit due to compatibilities issue with build servers like Jenkins and code analysis tools like Sonarcube.

Requires nodejs and node package manager. 

Download code and open using Visual Studio 2017 community edition. Might get an "assemblies incompatibility issue", re-build 
and it should be good to go.

Step 1. Please ensure REST component is up and running

Setup CORS to limit accessibility to localhost:3000. 

Step 2. Run front end 

Goto wwwroot directory, and run the following command :-

npm start -> to run UI 

npm test -> to run front end unit testing.



