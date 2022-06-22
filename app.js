
courseApi = "http://localhost:3000/courses";


function start(){
    getCourses(renderCouses); //lấy dữ liệu rồi render dữ liệu
    
    handleCreateForm() //Hàm thêm 
}

start(); //khi web chạy thì sẽ chạy hàm này đầu tiên

//function
//1.Hàm get khóa học
function getCourses(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

//4.hàm create khóa học
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(courseApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

//5.Hoàn delete khóa học
function deleteCourses(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(courseApi + "/" + id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            getCourses(renderCouses);                
        });
}

//6.hàm update khóa học
function updateCourse(data,callback,id){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(courseApi + "/" + id, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

//2.Hàm render ra khóa học
function renderCouses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var html = courses.map(function(course){
        return `
        <li>
            <h4>Tên khóa học : ${course.name} (id : ${course.id}) </h4>
            <p>${course.description}</p>
            <button onclick="deleteCourses(${course.id})">Xóa</button>
        </li>
        `;
    }); // Kết thúc sẽ trả về 1 mảng
    listCoursesBlock.innerHTML = html.join('');
}


//CRUD
//3.hàm lấy dữ liệu create và update
function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    
    createBtn.onclick = function(){
        name = document.querySelector('input[name="name"]').value;
        description = document.querySelector('input[name="description"]').value;
        if(name === '' || description === ''){
            alert("Bạn chưa nhập đủ thông tin");
        }
        else{
            formData ={
                name: name,
                description : description
            };
            createCourse(formData, function(){   //thực thi create
                getCourses(renderCouses); // xong rồi get lại dữ liệu và render lại dữ liệu
            });  
        }  
    }

    updateBtn.onclick = function(){
        newname = document.querySelector('input[name="name"]').value;
        newdescription = document.querySelector('input[name="description"]').value;
        id = document.querySelector('input[name="id"]').value;
        if(newname === '' || newdescription === '' || id === ''){
            alert("Bạn chưa nhập đủ thông tin");
        }
        else{
            newformData ={
                name: newname,
                description : newdescription
            };
            updateCourse(newformData, function(){   //thực thi update
                getCourses(renderCouses); // xong rồi get lại dữ liệu và render lại dữ liệu
            },id);  
        }  
    }
}

