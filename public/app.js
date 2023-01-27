console.log(firebase.auth())

var email1 = document.getElementById("email")
var password1 = document.getElementById("password")
var name1 = document.getElementById("name1")
var signup = document.getElementById("signup")
var signin = document.getElementById("signin")
var role = document.getElementsByName("user")
var getrole = ""

signup.addEventListener("click", function () {
    console.log(name1.value)
    console.log(password1.value)
    console.log(email1.value)
    for ( var i = 0; i < role.length; i++) {
        if (role[i].checked){
            getrole = role[i].value
            break
        }
        
    }
    if (getrole == "") {
        alert("select role")
    }
    else {
        console.log(getrole)
        firebase.auth().createUserWithEmailAndPassword(email1.value, password1.value)
        .then(async (userdata) => {
            console.log(userdata.user.uid)
            
            console.log(getrole)
            

            var obj = {
                username: name1.value,
                email: email1.value,
                password: password1.value,
                role: getrole,
                USER_UID: userdata.user.uid
            }

            await firebase.database().ref(`${getrole}/`).child(userdata.user.uid).set(obj)
            alert("user reg")
        })
        // .catch((err) => {
        //     // console.log(err)
        //     alert(err.)
        // })
    }

   
})


signin.addEventListener("click", function () {
    console.log(email.value)
    console.log(password.value)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userdata) => {
            console.log(userdata.user.uid)
            firebase.database().ref("admin/").child(userdata.user.uid)
                .once("value", (snap) => {
                    console.log(snap.toJSON())

                    if (snap.toJSON() == null) {
                        firebase.database().ref("user/").child(userdata.user.uid)
                            .once("value", (snap) => {
                                console.log(snap.toJSON())
                                window.location.replace("user_panal.html")
                            })
                        }
        else{
            console.log("Admin panel")
            window.location.replace("admin_panal.html")

        }
    })
        })
        .catch((err) => {
            // console.log(err)
            alert(err)
        })
    })
