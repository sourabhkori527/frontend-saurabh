/* =====================================================
   HEALTHPLUS - JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE NAVBAR
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("show");

            if (navMenu.classList.contains("show")) {
                menuBtn.innerHTML = "✕";
            } else {
                menuBtn.innerHTML = "☰";
            }
        });

        // Close menu after clicking a link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                menuBtn.innerHTML = "☰";
            });
        });
    }


    /* =================================================
       DOCTOR SEARCH
    ================================================= */

    const searchInput = document.getElementById("doctorSearch");
    const searchBtn = document.getElementById("searchBtn");
    const doctorCards = document.querySelectorAll(".doctor-card-item");

    function searchDoctors() {

        const searchValue = searchInput.value
            .toLowerCase()
            .trim();

        let foundDoctor = false;

        doctorCards.forEach(card => {

            const doctorName =
                card.getAttribute("data-name") || "";

            const speciality =
                card.getAttribute("data-speciality") || "";

            const doctorText =
                card.innerText.toLowerCase();

            if (
                doctorName.includes(searchValue) ||
                speciality.includes(searchValue) ||
                doctorText.includes(searchValue)
            ) {

                card.classList.remove("hidden");
                foundDoctor = true;

            } else {

                card.classList.add("hidden");

            }
        });


        // No result message
        let noResult = document.getElementById("noDoctorResult");

        if (!foundDoctor) {

            if (!noResult) {

                noResult = document.createElement("p");

                noResult.id = "noDoctorResult";

                noResult.innerText =
                    "No doctor found. Try another name or speciality.";

                noResult.style.textAlign = "center";
                noResult.style.color = "#667085";
                noResult.style.gridColumn = "1 / -1";
                noResult.style.padding = "30px";
                noResult.style.fontSize = "14px";

                document
                    .getElementById("doctorGrid")
                    .appendChild(noResult);
            }

        } else {

            if (noResult) {
                noResult.remove();
            }
        }
    }


    if (searchBtn) {
        searchBtn.addEventListener("click", searchDoctors);
    }


    // Search while typing
    if (searchInput) {

        searchInput.addEventListener("input", () => {

            searchDoctors();

        });

        // Enter key
        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                searchDoctors();
            }

        });
    }


    /* =================================================
       DEPARTMENT SELECTION
    ================================================= */

    window.selectDepartment = function(card, department) {

        const departmentCards =
            document.querySelectorAll(".department-card");

        departmentCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");


        // Select department automatically
        const departmentSelect =
            document.getElementById("department");

        if (departmentSelect) {

            const options =
                departmentSelect.options;

            for (let i = 0; i < options.length; i++) {

                if (
                    options[i].text.toLowerCase() ===
                    department.toLowerCase()
                ) {

                    departmentSelect.selectedIndex = i;
                    break;
                }
            }
        }


        // Scroll to appointment
        setTimeout(() => {

            const appointment =
                document.getElementById("appointment");

            if (appointment) {

                appointment.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 200);

    };


    /* =================================================
       BOOK APPOINTMENT FROM DOCTOR CARD
    ================================================= */

    window.openAppointment = function(doctorName) {

        const appointment =
            document.getElementById("appointment");

        if (!appointment) return;

        appointment.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        // Show selected doctor in message
        const message =
            document.getElementById("message");

        if (message) {

            message.value =
                `I would like to book an appointment with ${doctorName}.`;

        }

    };


    /* =================================================
       APPOINTMENT FORM
    ================================================= */

    const appointmentForm =
        document.getElementById("appointmentForm");

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const department =
                document.getElementById("department").value;

            const date =
                document.getElementById("date").value;


            // Basic validation
            if (!name || !phone || !department || !date) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            // Phone validation
            const phonePattern =
                /^[0-9]{10}$/;

            if (!phonePattern.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            // Success message
            alert(
                `Appointment booked successfully!\n\n` +
                `Name: ${name}\n` +
                `Department: ${department}\n` +
                `Date: ${date}`
            );


            // Reset form
            appointmentForm.reset();

        });

    }


    /* =================================================
       ACTIVE NAVIGATION ON SCROLL
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (
                linkTarget === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =================================================
       SET MINIMUM APPOINTMENT DATE
    ================================================= */

    const dateInput =
        document.getElementById("date");

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.setAttribute(
            "min",
            today
        );

    }


    /* =================================================
       SMOOTH SCROLL FOR ALL ANCHOR LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    !document.querySelector(targetId)
                ) {
                    return;
                }

                event.preventDefault();

                const target =
                    document.querySelector(targetId);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =================================================
       CONSOLE MESSAGE
    ================================================= */

    console.log(
        "HealthPlus website loaded successfully! 💙"
    );

});