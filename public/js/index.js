$(document).ready(function(){
        $("#slides").slidesjs({
            width: 100,
            height: 100,
            navigation: {
                active: false,
                effect: "slide"
            },
            play: {
                active: false,           
                effect: "slide",         
                interval: 5000,
                auto: true,
                swap: true,
                pauseOnHover: false,
                restartDelay: 70
              }
        })
        $.fn.serializeObject = function() {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function() {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
        function getForm(form){
            var data = $(form).serializeObject();
       
            return data;
          }
        function getDatabase(){
            let data=JSON.parse( localStorage.getItem("userList"))
            data= (data)? data : [];
            return data;
          }
        function setDatabase(data){
            localStorage.setItem("userList", JSON.stringify(data))
          }
        $("#resisterBT").click( function(){
            $("#formResiter").show();
            $("#formLongin").hide();
            $(".message").html(` `);
        })
        $("#longinBT").click( function(){
            $("#formResiter").hide();
            $("#formLongin").show();
            $(".message").html(` `);
        })
        $("#submitLoginBt").click( function(){
            let valid=$("#formLongin").valid();
            if(valid){
            const userList=getDatabase().map(value=> {
               return {
                user: value.user,
                password: value.password,
               } 

            })
            const userLongin = getForm("#formLongin")
            let be=jQuery.inArray(userLongin.user,userList.map( value => value.user));
                if(be <0){
                    $(".message").html(` User ${userLongin.user} không tồn tại, bấn nút Rister để đăng ký !`);
                    return
                }
                if(be >= 0 && userLongin.password != userList[be].password){
                    $(".message").html(`Nhập sai mật khẩu`)
                    return
                }
                $(".message").html(` User ${userLongin.user} đăng nhập thành công`)
               
        } 
        })
        $("#submitResisterBt").click( function(){
            let valid=$("#formResiter").valid();
            if(valid){
                const userList=getDatabase();
                const userLongin = getForm("#formResiter");
                let be=jQuery.inArray(userLongin.user,userList.map( value => value.user));
                if(be <0){
                    userList.push(userLongin);
                    setDatabase(userList);
                    $(".message").html(` bạn vừa thêm User ${userLongin.user} !`)
                } else{
                    $(".message").html(` `);
                    alert("User đã tồn tại");
                }
            }
            
        })
        $("#formLongin").validate({
            rules: {
                name: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Không để trống mục này !"
                },
                password: {
                    required: "Không để trống mục này !"
                }
            }
        })
        $("#formResiter").validate({
            rules: {
                name: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 5,
                    maxlength: 20
                },
                repassword: {
                    required: true,
                    equalTo: '#password'
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Không để trống mục này !",
                },
                password: {
                    required: "Không để trống mục này !",
                    minlength: "Nhập tối thiểu 5 ký tự",
                    maxlength: "Nhập tối đa 20 ký tự"
                },
                repassword: {
                    required: "Không để trống mục này !",
                    equalTo: 'Phải nhập giống với mục password'
                },
                email: {
                    required: "Không để trống mục này !",
                    email: "Nhập đúng định dạng"
                }
            }
        })
  });