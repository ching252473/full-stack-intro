

function attachProjectClickListeners() {
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach(item => {
        item.addEventListener("click", function() {
            const url = this.getAttribute("data-url");
            if (url) {
                window.open(url, "_blank");
            }
        });
    });
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item a");

function updateActiveNav() {
    let currentSection = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        // 如果畫面捲動位置在這個 section 的範圍內
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute("id");
        }
    });
    
    // 更新 nav 連結的 active 狀態
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// Typewriter effect
const typewriterElement = document.querySelector(".typewriter");
const texts = ["Art . Nature . Life . Music", "Computer Science", "Sleeping", "born in autumn", "I N F J"];
let textIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;
    
    if (!isDeleting) {
    // typing phase
    let charIndex = 0;
    typewriterElement.textContent = '';
    
    const typingInterval = setInterval(() => {
        typewriterElement.textContent += currentText[charIndex];
        charIndex++;
        
        if (charIndex === currentText.length) { // finished typing
        clearInterval(typingInterval);
        // pause after typing, then start deleting
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, pauseAfterTyping);
        }
    }, typingSpeed);
    
    } else {
    // deleting phase
    let charIndex = currentText.length;
    
    const deletingInterval = setInterval(() => {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
        clearInterval(deletingInterval);
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        
        setTimeout(() => {
            typeWriter();
        }, pauseAfterDeleting);
        }
    }, deletingSpeed);
    }
}

// Start the typewriter effect
typeWriter();

const projects = [
    {
        "title": "歲月的斑駁",
        "description": "創作理念：在外婆家工具室的黑暗角落,放置著一把把歷史悠久、充滿著歲月痕跡的鐮刀,木牆上掛置著一捆捆的麻繩以及各式各樣的農具,旁邊身長著一顆頑強且韌性的木瓜樹苗,在這個角落處處都可以察覺時光流逝的烙印,那些破舊不堪的工具也訴說著外公外婆辛苦工作的點點滴滴。",
        "date": "2022",
        "url": "https://github.com/NYCU-SDC/full-stack-intro-frontend",
        //"image":"歲月的斑駁.jpg"
    },
    {
        "title": "酣然午後",
        "description": "創作理念：正值暖暖的午後十分,我愜意的漫步在巷子中,無意間瞥見了這一幕,一隻玳瑁貓靜靜地沐浴陽光,凝望著那株垂下的石蓮花,另一隻貓咪微微閉雙眼,享受陽光所帶來的溫暖,一切是如此的平靜且美好,我陷入了片刻的恍惚,在喧囂的城市中,這個角落顯得更加彌足珍貴。",
        "date": "2023",
        "url": "https://github.com/NYCU-SDC/full-stack-advanced-frontend",
        //"image":"酣然午後.jpg"
    },
    {
        "title": "盼",
        "description": "創作理念：此作品使用橡膠版進行凸版印刷。《盼》這幅版畫以暖色調為基調,透過紅色與橘黃色構成的廟宇,營造出一種溫暖而充滿力量的氛圍,貓咪的米白色身影靜靜佇立在窗台,望向窗外的神聖景象,彷彿訴說著一種靜默中的等待與渴望。深褐色的窗框在畫面上清晰地勾勒出主題,窗內貓咪的柔和身影與窗外廟宇的古樸莊嚴形成了強烈的對比,將寧靜中的等待與生命中的期盼巧妙融合,表達了對遠方某種未來的盼望與對平靜生活的深深嚮往。",
        "date": "2024",
        "url": "https://github.com/NYCU-SDC/core-system-frontend",
        //"image":"盼.jpg"
    }
]
const projectsList = document.querySelector(".project-list");

function renderProjects(list) {
    projectsList.innerHTML = list
        .map(p => {
            return `
            <div class="project-item" data-url="${p.url}" target="_blank">
                <h3 class-"title">${p.title}</h3>
                <div class="content">
                    <p>${p.description.replace(/\n/g, "<br>")}</p>
                    <p class="meta">Created on ${p.date}</p>
                </div>
                <div class="project-img" style="background-image: url('${p.image}')"></div>
            </div>
            `;
        })
        .join("");
    attachProjectClickListeners();
}
// first time load all projects
renderProjects(projects);

// Search functionality
const searchInput = document.getElementById("project-search-input");
const searchBtn = document.getElementById("project-search-btn");

function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
}

searchBtn.addEventListener("click", searchProjects);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchProjects();
    }
});


const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    });
});

/* Fade-in & out */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

const fadeInSections = document.querySelectorAll(".fade-in-section");
fadeInSections.forEach(section => {
    sectionObserver.observe(section);
});

//
const projectitems = document.querySelectorAll('.project-list .project-item');
const imageItems = document.querySelectorAll('.p-container .p-item');

projectitems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        imageItems.forEach((img, i) => {
            if (i === index) {
                img.classList.add('spotlight');
                img.classList.remove('fade');
            } else {
                img.classList.add('fade');
                img.classList.remove('spotlight');
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        imageItems.forEach(img => {
            img.classList.remove('spotlight', 'fade');
        });
    });
});
