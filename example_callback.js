// định nghĩa mymap: là một phương thức của array
Array.prototype.mymap = function(callback){ 
    //lọc
    var output = [];
    var length = this.length;
    for(var i =0; i< length; ++i){
        var result = callback(this[i]);
        output.push(result);
    }
    return output;
}

var courses = [
    'HTML',
    'CSS',
    'JS',
    'RJS'
];

var html = courses.mymap(function(course){ //định nghĩa funciton là đối sô của mymap
    return `<h2>${course}</h2>`;
});

console.log(html.join(''));
