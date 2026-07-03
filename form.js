
const contactForm = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = contactForm.querySelector("button");

if(contactForm){
console.log("Contact form loaded");

contactForm.addEventListener("submit", async(e)=>{


e.preventDefault();

console.log("Form submitted");

const formData = new FormData(contactForm);



const data = {

name: formData.get("name"),

email: formData.get("email"),

phone: formData.get("phone"),

subject: formData.get("subject"),

message: formData.get("message")

};

submitBtn.disabled = true;
submitBtn.textContent = "Sending...";

try{

    const response = await fetch("/contact-message",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
    );

    const result = await response.json();

    if(response.ok){

        statusBox.className = "form-status success";
        statusBox.textContent = "✅ Your message has been sent successfully!";

        contactForm.reset();

    }else{

        statusBox.className = "form-status error";
        statusBox.textContent = result.message;

    }

}catch(error){

    statusBox.className = "form-status error";
    statusBox.textContent = "❌ Server error. Please try again.";

}

submitBtn.disabled = false;
submitBtn.textContent = "Send Message";


});


}