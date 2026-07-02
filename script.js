let current = 0;
const heroImage = document.getElementById("heroImage");

heroImage.src = banners[current];

setInterval(() => {
    current = (current + 1) % banners.length;
    heroImage.src = banners[current];
}, 5000); // 5 seconds kazhinju image maarum
