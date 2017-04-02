<!doctype html>
<html>
    <body>
        <header ng-app="MakeApplesHeader">
            <div ng-controller="HeaderController">
                {{ appName }}
            </div>
        </header>
        <div>
            <label>Name:</label>
            <input type="text" ng-model="yourName" placeholder="Enter a name here">
            <h1>Hello {{yourName}}!</h1>
        </div>
        <div ng-app="MakeApplesScene" ng-controller="EditController">
            <h1>{{ name }}</h1>
        </div>
        <script src="js/bundle1.js"></script>
    </body>
</html>