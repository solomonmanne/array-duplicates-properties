/*
This method finds any duplicate objects in a given array.
arrayofobjects:     An array of objects.
Returns:            An array of duplicate objects found within the input array.
*/
var findDuplicatesInArray=function(arrayofobjects, IgnoreFieldNameCase=false){
    //Define the array to return.
    var duplicates = new Array();
    for (var i=0; i<(arrayofobjects.length -1); i++){
        //Construct the source object to compare against.
        var _sourceObject = IgnoreFieldNameCase ? (JSON.stringify(arrayofobjects[i])).toLowerCase() : JSON.stringify(arrayofobjects[i]);
        for (var j=(i+1); j<(arrayofobjects.length); j++){
            //Construct the destination object for comparison
            var _destObject = IgnoreFieldNameCase ? (JSON.stringify(arrayofobjects[j])).toLowerCase() : JSON.stringify(arrayofobjects[j]);
            if (Object.is(_sourceObject,_destObject)){
                //Check to see if we already inserted the object in the array.
                var alreadyFound = !IgnoreFieldNameCase ? duplicates.find(a=>(JSON.stringify(a.duplicateRecord))===_sourceObject) : duplicates.find(a=>(JSON.stringify(a.duplicateRecord).toLowerCase())===_sourceObject);
                if (alreadyFound===undefined){
                    //Object not found. Add it to the array.
                    var _finalObject = {duplicateRecord: arrayofobjects[i], indexes: [i,j]};
                    duplicates.push(_finalObject);
                }
                else{
                    //Object is found. add the index to the array.
                    if (alreadyFound.indexes.find(r=>r===j)===undefined)
                    alreadyFound.indexes.push(j);
                }
            }
        }
    }
    return duplicates;
}

/*
This method finds any objects in a given array that share n number of properties.
arrayofobjects:     An array of objects.
arrayofproperties:  An array of properties that the method should look for as shared properties among the objects.
Returns:            An array of duplicate objects found within the input array.
*/
var findObjectsOfSharedProperties=function(arrayofobjects, arrayofproperties){
    //Create the array to return.
    var matchingElementIndexes = new Array();
    for (var i=0; i<(arrayofobjects.length -1); i++){
        //Construct the source object for comparison.
        var _sourceObject =arrayofobjects[i];
        for (var j=(i+1); j<(arrayofobjects.length); j++){       
            //Construct the destination object for comparison. 
            var _destObject = arrayofobjects[j];
                var cnt=0;
                //Loop through the properties to compare.
                for(var t=0; t<arrayofproperties.length; t++){
                    var _prop = arrayofproperties[t];
                    //Check for nested properties.
                    var nestedLevels = _prop.split('.');
                    //If the property is not nested, just compare.
                    if(nestedLevels.length===1){
                        if(_sourceObject[_prop] === _destObject[_prop] && _sourceObject[_prop]!==undefined && _destObject[_prop]!==undefined){
                            cnt++;
                        }
                    }
                    //Here, we need to handle nested cases
                    else{
                        //Construct the objects
                        var _finalObjectX='_sourceObject[nestedLevels[0]]';
                        var _finalObjectY='_destObject[nestedLevels[0]]';
                        for(var v=1; v<nestedLevels.length; v++){
                            _finalObjectX+=`[nestedLevels[${v}]]`;
                            _finalObjectY+=`[nestedLevels[${v}]]`;
                        }

                        //Compare the constructed objects. 
                        try{
                            if(eval(_finalObjectX) == eval(_finalObjectY)){
                              cnt++;  
                            }
                        }
                        //If your array has objects with variable number of properties, javascript will throw an error and 
                        //stop execution. Using this catch we can continue processing the elements with similar properties.
                        catch(e){
                            continue;
                        }

                    }

                }

                //If all the supplied properties are matched, add it to the array.
                if(cnt===arrayofproperties.length){
                    if(matchingElementIndexes.find(o=>o===i)===undefined)
                    matchingElementIndexes.push(i); 
                    if(matchingElementIndexes.find(o=>o===j)===undefined)
                    matchingElementIndexes.push(j);
                }

        }
    }
    return matchingElementIndexes;
}

module.exports.findDuplicatesInArray=findDuplicatesInArray;
module.exports.findObjectsOfSharedProperties=findObjectsOfSharedProperties;