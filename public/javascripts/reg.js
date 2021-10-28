var DEF_DEBUG = false;
var GLOBAL_url = "/users/login";
/*require.config({
    paths: { "bcrypt": "../javascripts/bcrypt.js-master/dist/bcrypt" }
});*/

document.getElementById('upload_img_using_logo').addEventListener('click', function () {
    if (document.getElementById('disp_mod').innerText === "1") { //login
        //empty
    } else {
        console.log('upload via logo');
        document.getElementById('fileinput').click();
    }
});

function login_button_click() {
    function play() {
        document.getElementById("window_clearInterval_timeoutID").innerText = setInterval(function () {
            $("#login_button").animate({ 'opacity': 0.5 }, 450, function () {
                $("#login_button").animate({ 'opacity': 1 }, 450)
            })
        }, 450);
    }
    //play();
    if (document.getElementById('disp_mod').innerText === "1") { //login
        var is_this_a_login_Q = true;
        var inputs = document.getElementsByTagName("input");
        var usrn = "";
        var acct = "";
        var pasw = "";
        var pasc = "";
        for (let inputs_index = 0; inputs_index < inputs.length; inputs_index++) {
            const inputs_element = inputs[inputs_index];
            if (DEF_DEBUG) {
                console.log(inputs_element.type);
                console.log(inputs_element.name);
            }
            if (String(inputs_element.type) === "text" || String(inputs_element.type) === "password") {
                if (String(inputs_element.name) === "user_name") {
                    usrn = inputs_element.value;
                    if (DEF_DEBUG) {
                        console.log(usrn);
                    }
                } else if (String(inputs_element.name) === "account") {
                    acct = inputs_element.value;
                    if (DEF_DEBUG) {
                        console.log(acct);
                    }
                } else if (String(inputs_element.name) === "password") {
                    pasw = inputs_element.value;
                    if (DEF_DEBUG) {
                        console.log(pasw);
                    }
                } else if (String(inputs_element.name) === "password_confirm") {
                    pasc = inputs_element.value;
                    if (DEF_DEBUG) {
                        console.log(pasc);
                    }
                }
            }
        }

        //require(["bcrypt"], function(bcrypt) {
        //bcrypt.hash(pasw, JSON.parse("\"$2a$10$ebwnNDwkFyRNPa5Zpgc0h.\""), function(err, hash) {
        if (!usrn) {
            if (DEF_DEBUG) {
                console.log("!usrn");
            }
            is_this_a_login_Q = true;
        }
        if (!acct) {
            if (DEF_DEBUG) {
                console.log("!acct");
            }
            is_this_a_login_Q = false;
        }
        if (!pasw) {
            if (DEF_DEBUG) {
                console.log("!pasw");
            }
            is_this_a_login_Q = false;
        }
        if (!pasc) {
            if (DEF_DEBUG) {
                console.log("!pasc");
            }
            is_this_a_login_Q = true;
        }
        if (is_this_a_login_Q) {
            $.post(GLOBAL_url, {
                username: acct,
                password: pasw
            }, (objects_returned_by_the_server) => {
                if (DEF_DEBUG) {
                    console.log(objects_returned_by_the_server);
                }
                var re = /\/users\/login/gi;
                var newstr = window.location.href.replace(re, objects_returned_by_the_server);

                var whether_the_account_password_is_wrong = true;
                //101->
                const regex = /\n|\r|<|\t/gm;
                const str = newstr;
                let m;

                while ((m = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }

                    // The result can be accessed through the `m`-variable.
                    m.forEach((match, groupIndex) => {
                        //alert(`Found match, group ${groupIndex}: ${match}`);
                        whether_the_account_password_is_wrong = false;
                    });
                }
                //<-101

                if (whether_the_account_password_is_wrong)/*try*/ { // statements to try

                    window.location.href = newstr;
                } /*catch (e)*/else {
                    //console.log(e);
                    $("#waiting_block").css('display', "none")
                    document.getElementById("error_msg_gui_word_part_color_1").innerText = "red";
                    document.getElementById("error_msg_gui_word_part_color_2").innerText = "black";
                    document.getElementById("error_msg_gui_text_1").innerText = "錯誤";
                    document.getElementById("error_msg_gui_text_2").innerText = "帳號或密碼錯誤";
                    if (document.getElementById("window_clearInterval_timeoutID").innerText) {
                        clearInterval(document.getElementById("window_clearInterval_timeoutID").innerText);
                    }
                    document.getElementById("error_msg_gui_start").click();
                }
            });
        }
        //});
        //});
    } else {
        document.getElementById('add_an_user2').click();
    }
}

/*function add_an_user() {
    $.post("/user/register", {
        name: "name",
        password: pasw,
        email: "email@email.com",
        username: Date.now().toString(),
        password: "psw",
        password2: "psw"
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(objects_returned_by_the_server);
        }
        var re = /\/users\/login/gi;
        var newstr = window.location.href.replace(re, objects_returned_by_the_server);
        window.location.href = newstr;
    });
}*/

jQuery(function dom_ready(dom_ready_params) {
    document.getElementById("login_button").addEventListener("click", login_button_click);
    //document.getElementById("add_an_user").addEventListener("click", add_an_user);
    /*require(["bcrypt"], function (bcrypt) {
        bcrypt.genSalt(10, function (err, salt) {
            console.log(salt);
        });
    });*/
    document.getElementById("disp_mod").addEventListener("click", () => {
        for (let index = 0; index < document.getElementsByClassName("disp_for_mod").length; index++) {
            const element = document.getElementsByClassName("disp_for_mod")[index];
            element.style.display = "none";
        }
        //$("#gray_block").height("18vh");
        $("#gray_block").show().animate({ 'height': "18vh" }, 1000);
    });
    //The code below and the code above must maintain the current sequence
    document.getElementById("cre_acc_log_fk_bton_inner_txt").addEventListener("click", () => {
        console.log(`document.getElementById("cre_acc_log_fk_bton_inner_txt").addEventListener("click", () => {`);
        if (document.getElementById("disp_mod").innerText === "1") {
            $("#waiting_block").css('display', "none")
            $("#gray_block").show().animate({ 'height': "30vh" }, 1000);
            setTimeout(() => {
                document.getElementById("login_button_txt_fix").innerText = "註冊";
                document.getElementById("cre_acc_log_fk_bton_inner_txt").innerText = "點我登入";
                document.getElementById("disp_mod").innerText = "0";
                for (let index = 0; index < document.getElementsByClassName("disp_for_mod").length; index++) {
                    const element = document.getElementsByClassName("disp_for_mod")[index];
                    element.style.display = "block";
                }
                //$("#gray_block").height("30vh");
            }, 500);
        } else /* if (document.getElementById("disp_mod").innerText === "0") */ {
            $("#waiting_block").css('display', "none")
            document.getElementById("disp_mod").innerText = "1";
            document.getElementById("login_button_txt_fix").innerText = "登入";
            document.getElementById("cre_acc_log_fk_bton_inner_txt").innerText = "點我註冊";
            document.getElementById("disp_mod").click();
        }
        /* else {
                    console.error("This is a serious error, please contact the software developer!");
                }*/
    });
    //The code below and the code above must maintain the current sequence
    if (document.getElementById("disp_mod").innerText === "-1") {
        document.getElementById("cre_acc_log_fk_bton_inner_txt").click();
    }
    /*document.getElementById("test_salt").addEventListener("click", () => {
        require(["bcrypt"], function (bcrypt) {
            bcrypt.genSalt(10, function (err, salt) {
                console.log(JSON.stringify(salt));
            });
        });
    });*/
});

/*document.getElementById("test_err_msg").addEventListener("click", ()=>{
    console.log("document.getElementById(test_err_msg).addEventListener(click, ()=>{");
    document.getElementById("error_msg_gui_group").click();
});*/

document.getElementById("line_login").addEventListener("click", () => {
    document.getElementById("error_msg_gui_word_part_color_1").innerText = "black";
    document.getElementById("error_msg_gui_word_part_color_2").innerText = "black";
    document.getElementById("error_msg_gui_text_1").innerText = "此功能將於日後推出";
    document.getElementById("error_msg_gui_text_2").innerText = "敬請期待喔!";
    document.getElementById("error_msg_gui_group").click();
});

function dataURItoBlob_copy(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function add_new_user_test2() {
    /*document.getElementById('snap_shoot_canvas_tmp').click();

    function checkFlag() {
        if (document.getElementById('snap_shoot_finish').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {*/
    var myCanvas = document.getElementById('justaimg');
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        ctx.drawImage(img, 0, 0); // Or at whatever offset you like
        target_img = document.getElementById('justaimg').toDataURL("image/jpeg", 1.0);
        reg_to_backend(target_img);
    };
    img.src = './../images/o.png';
    /*}
}*/
    //checkFlag();
}

if (document.getElementById("add_an_user")) {
    console.log(`if (document.getElementById("add_an_user")) {`);
    document.getElementById("add_an_user").addEventListener("click", add_new_user_test2);
}

function add_new_user_test3() {
    document.getElementById('btnLoad').click();

    function checkFlag() {
        if (document.getElementById('editor_base64_fin').innerText !== '1') {
            setTimeout(() => {
                checkFlag();
            }, 5);
        } else {
            reg_to_backend(document.getElementById('editor').innerText);
        }
    }
    checkFlag();
}

if (document.getElementById("add_an_user2")) {
    console.log(`if (document.getElementById("add_an_user2")) {`);
    document.getElementById("add_an_user2").addEventListener("click", add_new_user_test3);
}

function handleFileSelect() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        //alert('The File APIs are not fully supported in this browser.');
        console.log('The File APIs are not fully supported in this browser.');
        document.getElementById("add_an_user").click();
        return;
    }

    var input = document.getElementById('fileinput');
    if (!input) {
        //alert("Um, couldn't find the fileinput element.");
        console.log("Um, couldn't find the fileinput element.");
        document.getElementById("add_an_user").click();
    } else if (!input.files) {
        //alert("This browser doesn't seem to support the `files` property of file inputs.");
        console.log("This browser doesn't seem to support the `files` property of file inputs.");
        document.getElementById("add_an_user").click();
    } else if (!input.files[0]) {
        //alert("Please select a file before clicking 'Load'");
        console.log("Please select a file before clicking 'Load'");
        document.getElementById("add_an_user").click();
    } else {
        var file = input.files[0];
        var fr = new FileReader();
        fr.onload = function (e) {
            document.getElementById('editor').innerText = fr.result;
            document.getElementById('editor_base64_fin').innerText = "1";
        };
        //fr.readAsText(file);
        //fr.readAsBinaryString(file); //as bit work with base64 for example upload to server
        fr.readAsDataURL(file);
    }
}

function reg_to_backend(pic_base64) {
    var blob_tmp = dataURItoBlob_copy(pic_base64);

    console.log("alert('Ajax request tset');")
    var form = $('form')[0]; // You need to use standard javascript object here
    var formData = new FormData(form);

    ///////////////////////copy/////////////////////////////
    var inputs = document.getElementsByTagName("input");
    var usrn = "";
    var acct = "";
    var pasw = "";
    var pasc = "";
    for (let inputs_index = 0; inputs_index < inputs.length; inputs_index++) {
        const inputs_element = inputs[inputs_index];
        if (String(inputs_element.type) === "text" || String(inputs_element.type) === "password") {
            if (String(inputs_element.name) === "user_name") {
                usrn = inputs_element.value;
            } else if (String(inputs_element.name) === "account") {
                acct = inputs_element.value;
            } else if (String(inputs_element.name) === "password") {
                pasw = inputs_element.value;
            } else if (String(inputs_element.name) === "password_confirm") {
                pasc = inputs_element.value;
            }
        }
    }

    //require(["bcrypt"], function(bcrypt) {
    //bcrypt.hash(pasw, JSON.parse("\"$2a$10$ebwnNDwkFyRNPa5Zpgc0h.\""), function(err, hash) {
    //bcrypt.hash(pasc, JSON.parse("\"$2a$10$ebwnNDwkFyRNPa5Zpgc0h.\""), function(err, hash2) {
    // Store hash in your password DB.
    ///////////////////////copy/////////////////////////////
    formData.append('profileimage', blob_tmp);
    formData.append('name', usrn);
    formData.append('email', "no_email@email.com");
    formData.append('username', acct);
    formData.append('password', pasw);
    formData.append('password2', pasc);
    /*name: "name",
        password: pasw,
        email: "email@email.com",
        username: Date.now().toString(),
        password: "psw",
        password2: "psw"*/

    $.ajax({
        url: "/users/register",
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires $ 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        accepts: {
            text: "text/html"
        },
        beforeSend: function (xhr) {
            //empty
        },
        success: function (xhr) {
            //empty
        },
        error: function (xhr) {
            console.log("alert('Ajax request 發生錯誤');");
        },
        complete: function (xhr) {
            //console.log("alert('Ajax request complete');");
            //console.log(xhr);
            var target_new_html = $.parseHTML(xhr.responseText);
            console.log(target_new_html);
            $.each(target_new_html, function (i, el) {
                //console.log(i);
                if (el.localName === "header") {
                    //console.log(el);
                    $.each(el.childNodes, function (ii, el1) {
                        //console.log(ii);
                        if (el1.id === "error_msg_gui_group") {
                            $("#waiting_block").css('display', "none")
                            console.log(el1.childNodes);
                            $.each(el1.childNodes, function (iii, el2) {
                                //console.log([el2.id,el2.innerText]);
                                if (el2.id && document.getElementById(el2.id)) {
                                    document.getElementById(el2.id).innerText = el2.innerText;
                                }
                            });
                        }
                    });
                }
            });
            $.each(target_new_html, function (i, el) {
                if (el.id === "disp_mod") {
                    if (el.innerText === "-1") {
                        document.getElementById("cre_acc_log_fk_bton_inner_txt").click();
                    }
                }
            });
            if (document.getElementById("window_clearInterval_timeoutID").innerText) {
                clearInterval(document.getElementById("window_clearInterval_timeoutID").innerText);
            }
            document.getElementById('error_msg_gui_init_msg_if_yes').click();
            console.log("debug..................................................");
        },
    });
    //});
    //});
    //});
}
$("#login_button").click(function () {
    if ($("#login_button_txt_fix").text() == "註冊") {
        $("#waiting_block").show().css('z-index', "10")

    }
})
jQuery(function dom_ready(dom_ready_params) {
    $("#fb_login").click(function () {
        $("#waiting_block").show().css('z-index', "10")
        var re = /\/users\/login/gi;
        var newstr = window.location.href.replace(re, "/auth/facebook");
        window.location.href = newstr;
    });
    $("#line_login").click(function () {
        var re = /\/users\/login/gi;
        var newstr = window.location.href.replace(re, "/auth/line");
        window.location.href = newstr;
    });
});