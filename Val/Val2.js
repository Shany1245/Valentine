document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("opening-page")) {
        console.log("Opening Page Loaded!");

        let startButton = document.getElementById("startButton");
        if (startButton) {
            startButton.addEventListener("click", function (event) {
                event.preventDefault();
                document.body.classList.add("fade-out");

                setTimeout(function () {
                    window.location.href = "Pages/Greeting.html";
                }, 500);
            });
        }
    }

    if (document.body.classList.contains("greeting-page")) {
        console.log("Greeting Page Loaded!");

        let envelope = document.getElementById("envelope");
        let clickMeButton = document.getElementById("clickMeButton");

        if (envelope && clickMeButton) {
            envelope.addEventListener("click", function () {
                envelope.classList.add("open");
            });

            clickMeButton.addEventListener("click", function () {
                window.location.href = "FakeQuestion.html";
            });
        }
    }

    if (document.body.classList.contains("beautiful-page")) {
        console.log("Beautiful Page Loaded!");

        let loveHeart = document.getElementById("loveHeart");
        if (loveHeart) {
            loveHeart.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "Question.html";
            });
        }
    }

    if (document.body.classList.contains("question-page")) {
        console.log("Question Page Loaded!");

        let noBtn = document.getElementById("no-btn");
        let yesBtn = document.getElementById("yes-btn");

        if (!noBtn || !yesBtn) return; // Stops execution if buttons are missing

        let moveAttempts = 0;
        let maxMoves = Math.floor(Math.random() * 6) + 15;

        // ✅ DISABLE "NO" BUTTON IF RETURNING FROM PRINCESS PAGE
        const params = new URLSearchParams(window.location.search);
        if (params.get("no-disabled") === "true") {
            noBtn.innerHTML = "No 🙄";
            noBtn.disabled = true;
            noBtn.classList.add("disabled");
        } else {
            let noWrapper = document.getElementById("no-wrapper");
            if (noWrapper) {
                noWrapper.style.position = "relative";
            }

            // 🔥 FIX: Initial position of "No" button
            noBtn.style.position = "absolute";

            function getSafePosition() {
                let btnWidth = noBtn.clientWidth;
                let btnHeight = noBtn.clientHeight;
                let viewportWidth = window.innerWidth;
                let viewportHeight = window.innerHeight;

                let padding = 10;

                let minX = padding;
                let minY = padding;
                let maxX = Math.min(viewportWidth * 0.45, viewportWidth - btnWidth - padding);
                let maxY = Math.min(viewportHeight * 0.45, viewportHeight - btnHeight - padding);

                let x = Math.random() * (maxX - minX) + minX;
                let y = Math.random() * (maxY - minY) + minY;

                return { x, y };
            }

            noBtn.addEventListener("mouseover", function () {
                if (moveAttempts < maxMoves) {
                    let newPosition = getSafePosition();

                    let safeX = Math.max(10, Math.min(newPosition.x, window.innerWidth * 0.5));
                    let safeY = Math.max(10, Math.min(newPosition.y, window.innerHeight * 0.5));

                    console.log(`Attempt ${moveAttempts + 1}: Moving No Button to X: ${safeX}, Y: ${safeY}`);

                    noBtn.style.left = `${safeX}px`;
                    noBtn.style.top = `${safeY}px`;

                    moveAttempts++;
                }
            });

            noBtn.addEventListener("click", function () {
                if (moveAttempts >= maxMoves) {
                    window.location.href = "QuestionPages/No.html";
                }
            });
        }

        yesBtn.addEventListener("click", function () {
            window.location.href = "QuestionPages/Yes.html";
        });
    }
});
