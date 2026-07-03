document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("commentForm");
    const commentContainer = document.getElementById("commentsContainer");

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("Message2");


    if (!form || !commentContainer) {
        console.log("Form or container not found");
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();


        const name = nameInput.value.trim();
        const message = messageInput.value.trim();


        if(name === "" || message === ""){
            alert("Please fill all required fields!");
            return;
        }


        const now = new Date();

        const date = now.toLocaleDateString("en-US", {
            day:"2-digit",
            month:"long",
            year:"numeric"
        });


        const time = now.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });



        const newComment = document.createElement("div");

        newComment.className = "comments-user";


        newComment.innerHTML = `

            <i class="fa-solid fa-user"></i>

            <div class="comment-to-user">

                <h4 class="name-of-user">${name}</h4>

                <p>${message}</p>

                <h5>
                    ${date}
                    <span>- ${time}</span>
                </h5>

            </div>

        `;


        // Add new comment at top
        commentContainer.insertBefore(
            newComment,
            commentContainer.children[1]
        );


        // Keep only 10 comments
        const allComments = commentContainer.querySelectorAll(".comments-user");


        if(allComments.length > 4){

            allComments[allComments.length - 1].remove();

        }


        // Auto scroll to new comment
        newComment.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });


        form.reset();

    });

});
const treatments = [
    { name: "Headaches", page: "single5.html" },
    { name: "Neck Pain", page: "single2.html" },
    { name: "Shoulder Pain", page: "single1.html" },
    { name: "Elbow Pain", page: "single2.html" },
    {name:"Mid-back Pain ", Page:"single5.html"},
    {name:"Joint Pain ", Page:"single6.html"},
    { name: "Low-Back Pain", page: "single2.html" },
    { name: "Low-Back Pain", page: "single7.html" },
    { name: "Pelvic Pain", page: "single4.html" },
    { name: "Hip Pain", page: "single3.html" },
    { name: "Wrist Pain", page: "single1.html" },
    { name: "Knee's Pain", page: "single1.html" },
    { name: "Knee's Pain", page: "single2.html" },
    { name: "Foot & Ankle Pain", page: "single1.html" },
    { name: "Heel Pain", page: "single1.html" },
    { name: "Rehabilitation", page: "single8.html" },
    { name: "Physiotherapy", page: "single9.html" }
];

const input = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");
const message = document.getElementById("searchMessage");
const searchBtn = document.querySelector(".fa-magnifying-glass");

let selectedPage = "";


input.addEventListener("input", () => {

    const query = input.value.trim().toLowerCase();

    searchList.innerHTML = "";
    message.textContent = "";

    if (!query) return;


    const matches = treatments.filter(item =>
        item.name.toLowerCase().includes(query)
    );


    if (matches.length === 0) {
        message.textContent = "❌ Treatment not found!";
        message.style.color = "red";
        return;
    }


    matches.forEach(item => {

        const li = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = item.name;
        link.href = item.page;


        link.addEventListener("click", (e) => {

            e.preventDefault();

            input.value = item.name;

            selectedPage = item.page;

            searchList.innerHTML = "";

            message.textContent = `✅ You selected "${item.name}"`;
            message.style.color = "green";

        });


        li.appendChild(link);
        searchList.appendChild(li);

    });

});


// Search button click
searchBtn.addEventListener("click", () => {

    if (selectedPage) {
        window.location.href = selectedPage;
    } else {
        message.textContent = "Please select a treatment first";
        message.style.color = "red";
    }

});

// hide list when clicking outside
document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !searchList.contains(e.target)) {
        searchList.innerHTML = "";
    }
});



















