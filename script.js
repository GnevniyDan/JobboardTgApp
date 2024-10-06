document.addEventListener('DOMContentLoaded', function() {
    let isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    const AUTH_TOKEN = '123'; // Токен авторизации

    // Показать кнопку "Найти работу" при загрузке страницы
    document.getElementById('findJob').style.display = 'inline-block';

    // Настроить видимость кнопки "Опубликовать вакансию" и "Войти/Выйти" в зависимости от авторизации
    if (isAuthorized) {
        document.getElementById('publishJob').style.display = 'inline-block';
        document.getElementById('loginButton').textContent = 'Выйти';
    } else {
        document.getElementById('publishJob').style.display = 'none';
        document.getElementById('loginButton').textContent = 'Войти';
    }

    // Add test jobs when the "findJob" button is clicked
    document.getElementById('findJob').addEventListener('click', function() {
        fetch('http://127.0.0.1:5000/api/jobs')
            .then(response => response.json())
            .then(data => {
                const jobCardsContainer = document.getElementById('jobCards');
                jobCardsContainer.innerHTML = '';

                data.forEach(job => {
                    const card = document.createElement('div');
                    card.classList.add('job-card');

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
                                    'Authorization': AUTH_TOKEN // Добавляем токен авторизации
                                }
                            }).then(() => {
                                card.remove();
                            });
                        };
                        card.appendChild(deleteButton);
                    }

                    jobCardsContainer.appendChild(card);
                });
            });
    });

    // Show form to add a job
    document.getElementById('publishJob').addEventListener('click', function() {
        if (isAuthorized) {
            document.getElementById('addJobForm').style.display = 'block';
        } else {
            alert('Вы должны авторизоваться, чтобы добавить вакансию.');
        }
    });

    // Submit new job
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
                'Authorization': AUTH_TOKEN // Добавляем токен авторизации
            },
            body: JSON.stringify(newJob)
        })
        .then(response => response.json())
        .then(data => {
            alert('Вакансия добавлена успешно!');
            location.reload();
        });
    });

    // Login and logout functionality
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('loginButton').addEventListener('click', function() {
        if (isAuthorized) {
            // Logout
            isAuthorized = false;
            localStorage.setItem('isAuthorized', 'false');
            document.getElementById('publishJob').style.display = 'none';
            document.getElementById('loginButton').textContent = 'Войти';
            alert('Вы вышли из системы.');
        } else {
            // Login
            const password = prompt('Введите ключ-пароль для авторизации:');
            if (password === AUTH_TOKEN) { // Используем токен авторизации
                isAuthorized = true;
                localStorage.setItem('isAuthorized', 'true');
                document.getElementById('publishJob').style.display = 'inline-block';
                document.getElementById('loginButton').textContent = 'Выйти';
                alert('Вы успешно авторизовались!');
            } else {
                alert('Неверный ключ-пароль. Попробуйте снова.');
            }
        }
    });
});