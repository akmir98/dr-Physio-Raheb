document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("commentForm");
    const commentContainer = document.getElementById("commentsContainer");

    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("Message2");

    if (!form || !commentContainer) {
        console.log("Form or container not found");
        return;
    }

    // Load saved comments
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Display comments
    function displayComments() {

        commentContainer.innerHTML = "";

        comments.forEach(comment => {

            const newComment = document.createElement("div");

            newComment.className = "comments-user";

            newComment.innerHTML = `
                <i class="fa-solid fa-user"></i>

                <div class="comment-to-user">
                    <h4 class="name-of-user">${comment.name}</h4>
                    <p>${comment.message}</p>

                    <h5>
                        ${comment.date}
                        <span>- ${comment.time}</span>
                    </h5>
                </div>
            `;

            commentContainer.appendChild(newComment);

        });

    }
function updateScroll() {

    if (comments.length > 5) {
        commentContainer.style.maxHeight = "500px";
        commentContainer.style.overflowY = "auto";
    } else {
        commentContainer.style.maxHeight = "none";
        commentContainer.style.overflowY = "visible";
    }

}
    // Show saved comments on page load
    displayComments();
    updateScroll()

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name === "" || message === "") {
            alert("Please fill all required fields!");
            return;
        }

        const now = new Date();

        const date = now.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const comment = {
            name,
            message,
            date,
            time
        };

        // Add newest comment first
        comments.unshift(comment);

        // Keep only latest 10 comments
        if (comments.length > 10) {
            comments.pop();
        }

        // Save to localStorage
        localStorage.setItem("comments", JSON.stringify(comments));

        // Refresh comments
        displayComments();

        // Scroll to top (newest comment)
        commentContainer.scrollTop = 0;

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



















