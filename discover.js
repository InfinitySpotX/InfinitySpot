// =====================================================
// DISCOVER V2
// Smart Recommendation Engine
// Part 1 - Video Database + Settings
// =====================================================

// Today's Date
const today = new Date();

// Recommendation Settings
const SETTINGS = {

    NEW_VIDEO_DAYS: 7,

    NEW_VIDEO_BONUS: 60,

    RANDOM_BONUS: 25,

    FEATURED_BONUS: 50

};

// =====================================================
// VIDEO DATABASE
// Add Your Videos Here
// =====================================================

const videos = [

{
title:"Infinity",

thumbnail:"Infinity.jpg",

embed:"https://www.youtube.com/embed/VIDEO_ID",

added:"2026-07-08",

featured:true,

category:"Thriller"

},

{
title:"Shadow",

thumbnail:"Shadow.jpg",

embed:"https://www.youtube.com/embed/VIDEO_ID",

added:"2026-07-01",

featured:false,

category:"Drama"

},

{
title:"Echo",

thumbnail:"Echo.jpg",

embed:"https://www.youtube.com/embed/VIDEO_ID",

added:"2026-06-20",

featured:false,

category:"Horror"

},

{
title:"Unknown",

thumbnail:"Unknown.jpg",

embed:"https://www.youtube.com/embed/VIDEO_ID",

added:"2026-07-09",

featured:true,

category:"Mystery"

}

];

// =====================================================
// DAYS CALCULATOR
// =====================================================

function getDays(uploadDate){

const date=new Date(uploadDate);

const diff=today-date;

return Math.floor(diff/(1000*60*60*24));

}
// =====================================================
// PART 2
// SMART RECOMMENDATION ALGORITHM
// =====================================================

videos.forEach(video => {

    // How many days since upload
    video.days = getDays(video.added);

    // Reset score
    video.score = 0;

    // -------------------------
    // New Upload Boost
    // -------------------------

    if(video.days <= SETTINGS.NEW_VIDEO_DAYS){

        video.score += SETTINGS.NEW_VIDEO_BONUS;

    }

    // -------------------------
    // Featured Video Boost
    // -------------------------

    if(video.featured){

        video.score += SETTINGS.FEATURED_BONUS;

    }

    // -------------------------
    // Random Discovery
    // -------------------------

    video.score += Math.floor(
        Math.random() * SETTINGS.RANDOM_BONUS
    );

});


// =====================================================
// SORTING
// =====================================================

// Recommended
const recommended = [...videos]
.sort((a,b)=>b.score-a.score);

// Fresh Discoveries
const fresh = [...videos]
.sort((a,b)=>a.days-b.days);

// Featured Videos
const featured = [...videos]
.filter(video => video.featured);

// Hidden Gems
const hidden = [...videos]
.filter(video => !video.featured)
.sort(()=>Math.random()-0.5);

// =====================================================
// PART 3
// RENDER ENGINE
// =====================================================

function render(sectionId, list){

    const row = document.getElementById(sectionId);

    if(!row) return;

    row.innerHTML = "";

    list.forEach(video=>{

        row.innerHTML += `

        <div class="movie-card"
        onclick="playVideo('${video.embed}')">

            <img src="${video.thumbnail}"
            alt="${video.title}">

            <div class="movie-info">

                <div class="movie-title">
                    ${video.title}
                </div>

                <div class="meta">

                    <span>📅 ${video.days} Days Ago</span>

                    <span>⭐ ${video.score}</span>

                </div>

                ${
                    video.featured
                    ? `<span class="tag">FEATURED</span>`
                    : `<span class="tag">DISCOVER</span>`
                }

            </div>

        </div>

        `;

    });

}

// =====================================================
// PLAYER
// =====================================================

function playVideo(embed){

    localStorage.setItem(
        "selectedVideo",
        embed
    );

    window.location.href="player.html";

}

// =====================================================
// PART 4
// FINAL INITIALIZATION
// =====================================================

// Load all sections
render("recommendedRow", recommended);

render("freshRow", fresh);

render("featuredRow", featured);

render("hiddenRow", hidden);


// =====================================================
// AUTO SHUFFLE
// =====================================================

setInterval(() => {

    hidden.sort(() => Math.random() - 0.5);

    render("hiddenRow", hidden);

}, 30000);


// =====================================================
// DAILY DISCOVERY
// =====================================================

const todayKey = new Date().toDateString();

const savedKey = localStorage.getItem("discoverDay");

if(savedKey !== todayKey){

    recommended.sort(() => Math.random() - 0.5);

    localStorage.setItem(
        "discoverDay",
        todayKey
    );

}


// =====================================================
// END
// =====================================================

console.log("Discover V2 Loaded Successfully");
