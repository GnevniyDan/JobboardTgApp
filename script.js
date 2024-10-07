document.addEventListener('DOMContentLoaded', function() {
    let isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    const AUTH_TOKEN = '123'; 
    if (isAuthorized) {
        document.getElementById('publishJob').style.display = 'inline-block';
        document.getElementById('loginButton').textContent = 'Выйти';
    } else {
        document.getElementById('publishJob').style.display = 'none';
        document.getElementById('loginButton').textContent = 'Войти';
    }

    document.getElementById('findJob').addEventListener('click', function() {
        document.getElementById('findJob').style.display = 'none';

        fetch('http://127.0.0.1:5000/api/jobs')
            .then(response => response.json())
            .then(data => {
                const jobCardsContainer = document.getElementById('jobCards');
                jobCardsContainer.innerHTML = '';
                jobCardsContainer.style.display = 'flex';
                jobCardsContainer.style.flexDirection = 'column';
                jobCardsContainer.style.alignItems = 'center';

                data.forEach((job) => {
                    const card = document.createElement('div');
                    card.classList.add('job-card');
                    card.style.margin = '10px auto';

                    const title = document.createElement('h3');
                    title.textContent = job.title;
                    card.appendChild(title);

                    const description = document.createElement('p');
                    description.textContent = job.description;
                    card.appendChild(description);

                    const moreButton = document.createElement('button');
                    moreButton.classList.add('more-button');
                    moreButton.textContent = 'Подробнее';
                    moreButton.onclick = () => {
                        window.open(job.link, '_blank');
                    };
                    card.appendChild(moreButton);

                    if (isAuthorized) {
                        const deleteButton = document.createElement('button');
                        deleteButton.classList.add('delete-button');
                        deleteButton.textContent = 'Удалить';
                        deleteButton.onclick = () => {
                            fetch(`http://127.0.0.1:5000/api/jobs/${job.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': AUTH_TOKEN 
                                }
                            }).then(() => {
                                card.remove();
                            });
                        };
                        card.appendChild(deleteButton);
                    }

                    jobCardsContainer.appendChild(card);
                });

                setTimeout(() => {
                    jobCardsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            });
    });

    document.getElementById('publishJob').addEventListener('click', function() {
        if (isAuthorized) {
            document.getElementById('addJobForm').style.display = 'block';
        } else {
            alert('Вы должны авторизоваться, чтобы добавить вакансию.');
        }
    });

    document.getElementById('submitJob').addEventListener('click', function() {
        const jobTitle = document.getElementById('jobTitle').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const jobLink = document.getElementById('jobLink').value;

        const newJob = {
            title: jobTitle,
            description: jobDescription,
            link: jobLink
        };

        fetch('http://127.0.0.1:5000/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN 
            },
            body: JSON.stringify(newJob)
        })
        .then(response => response.json())
        .then(data => {
            alert('Вакансия добавлена успешно!');
            location.reload();
        });
    });

    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('loginButton').addEventListener('click', function() {
        if (isAuthorized) {
            isAuthorized = false;
            localStorage.setItem('isAuthorized', 'false');
            document.getElementById('publishJob').style.display = 'none';
            document.getElementById('loginButton').textContent = 'Войти';
            alert('Вы вышли из системы.');
            location.reload();
        } else {
            const password = prompt('Введите ключ-пароль для авторизации:');
            if (password === AUTH_TOKEN) { 
                isAuthorized = true;
                localStorage.setItem('isAuthorized', 'true');
                document.getElementById('publishJob').style.display = 'inline-block';
                document.getElementById('loginButton').textContent = 'Выйти';
                alert('Вы успешно авторизовались!');
                location.reload();
            } else {
                alert('Неверный ключ-пароль. Попробуйте снова.');
            }
        }
    });
});