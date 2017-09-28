array-duplicates-properties
===========================
 
This package is intended to find duplicate elements in a given array of objects as well as finding objects that share matching properties.

 
Usage
=====

Instructions for method findDuplicatesInArray()
===============================================

Below is a simple example of how to find duplicate objects in a supplied array. 

	var array_duplicates = required('array-duplicates-properties');
	var arrayOfObjects = new Array();
    var object0 = {Id: 6, Name: 'JDoe', Data: {Age: 30}};
    var object1 = {Id: 1, Name: 'JDoe', Data: {Age: 30}};
    var object2 = {Id: 2, Name: 'JDoe', Data: {Age: 30}};
    var object3 = {Id: 1, Name: 'JDoe', Data: {Age: 30}};

    arrayOfObjects.push(object0,object1,object2,object3);

    var dups = array_duplicates.findDuplicatesInArray(arrayOfObjects);


	This results in the following:

	[ { duplicateRecord: { Id: 1, Name: 'JDoe', Data: [Object] },indexes: [ 1, 3 ] } ]

	The method also provides a way to ignore case sensitive naming in the properties of the comparison objects, the following is an example of such a use case:

	var array_duplicates = required('array-duplicates-properties');
	var arrayOfObjects = new Array();
    var object0 = {Id: 6, Name: 'JDoe', Data: {Age: 30}};
    var object1 = {Id: 1, Name: 'JDoe', Data: {Age: 30}};
    var object2 = {Id: 2, Name: 'JDoe', Data: {Age: 30}};
    var object3 = {id: 1, name: 'JDoe', data: {Age: 30}};

    arrayOfObjects.push(object0,object1,object2,object3);

    var dups = array_duplicates.findDuplicatesInArray(arrayOfObjects, true);

	The result of this would be the following:

	[ { duplicateRecord: { Id: 1, Name: 'JDoe', Data: [Object] },indexes: [ 1, 3 ] } ]

	Note: If you don't pass the 2nd parameter then the method will default to case sensistive.


Voila!


Instructions for method findObjectsOfSharedProperties()
=======================================================

	This method returns the indexes of objects that share the same values for similar properties in the supplied array. 

	Below is an example demostrating the usage of this method:

	var array_dups = require('array-duplicates-properties');

	//Define the array of objects.
	var arrayOfObjects = new Array();
    var object0 = {Id: 6, Name: 'JSmith', Data: {Age: 30}};
    var object1 = {Id: 1, Name: 'JDoe', Data: {Age: 31}};
    var object2 = {Id: 2, Name: 'JSmith', Data: {Age: 30}};
    var object3 = {Id: 1, Name: 'JDoe', Data: {Age: 30}};

    arrayOfObjects.push(object0,object1,object2,object3);

	//Define the array of properties to look for within the arrayOfObjects.
	var arrayOfPropeties = ['Name','Age'];

	var sharedPropertiesObjects = array_dups.findObjectsOfSharedProperties(arrayOfObjects, arrayOfProperties);

	This results in the following:

	[{"matches":[{"element":"Name","val":"JSmith"},{"element":"Data.Age","val":30}],"indexes":[0,2]}]


	Another use case for this method is when you have nested objects and you want to look for matching propeties inside them. 
	The following demonstates such a use case:

	var array_dups = require('array-duplicates-properties');

	//Define the array of objects.
	var arrayOfObjects = new Array();
	var object0 = {Id: 6, Name: 'JSmith', Data: {Age: 30}};
	var object1 = {Id: 1, Name: 'JDoe', Data: {Age: 31, DOB: {Month: 6, Day: 17, Year: 1977}}};
	var object2 = {Id: 2, Name: 'JSmith', Data: {Age: 30}};
	var object3 = {Id: 1, Name: 'JDoe', Data: {Age: 31, DOB: {Month: 6, Day: 17, Year: 1977}}};

	arrayOfObjects.push(object0,object1,object2,object3);

	//Define the array of properties to look for within the arrayOfObjects.
	var arrayOfProperties = ['Name','Data.DOB.Day'];

	var dups = array_dups.findObjectsOfSharedProperties(arrayOfObjects,arrayOfProperties);
    console.log('The dups are: ' + JSON.stringify(dups));

	var sharedPropertiesObjects = array_dups.findObjectsOfSharedProperties(arrayOfObjects, arrayOfProperties);

	This results in the following:

	[{"matches":[{"element":"Name","val":"JDoe"},{"element":"Data.DOB.Day","val":17}],"indexes":[1,3]}]

 
Enjoy! 