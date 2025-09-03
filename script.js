function handleUsername(event) {
    event.preventDefault();
    generateLinks();
}

async function generateLinks() {
    const username = document.getElementById('username').value.trim();
    const list = document.getElementById('links');
    list.innerHTML = '';

    if (!username) return list.innerHTML = '<p style="color: red">Please enter a valid username.</p>';

    const categories = await (await fetch('links.json')).json();

    categories.forEach((category) => {
        const h2 = document.createElement('h2');
        h2.textContent = category.title;
        list.appendChild(h2);

        category.links.forEach((link) => {
            const li = document.createElement('li');
            const url = link.url.replace('${username}', username);
            li.innerHTML = `<a href="${url}" target="_blank">${link.label}</a>`;
            list.appendChild(li);
        });
    });
}