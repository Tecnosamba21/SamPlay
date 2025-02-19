const $search = document.getElementById('github-search')

const searching = () => {
    const language = document.querySelector('#filter-language').value
    const user = document.querySelector('#filter-user').value
    const org = document.querySelector('#filter-org').value
    if (language != '' && user !== '' && org !== '') {
        window.open(`https://github.com/search?q=language%3A${language}+user%3A${user}+org%3A${org}+${$search.value}`)
    } else if (user !== '' && org !== '' && language == '') {
        window.open(`https://github.com/search?q=user%3A${user}+org%3A${org}+${$search.value}`)
    } else if (language != '' && org !== '' && user === '') {
        window.open(`https://github.com/search?q=language%3A${language}+org%3A${org}+${$search.value}`)
    } else if (language != '' && user !== '' && org === '') {
        window.open(`https://github.com/search?q=language%3A${language}+user%3A${user}+${$search.value}`)
    } else if (language != '' && org === '' && user === '') {
        window.open(`https://github.com/search?q=language%3A${language}+${$search.value}`)
    } else if (org !== '' && language == '' && user === '') {
        window.open(`https://github.com/search?q=org%3A${org}+${$search.value}`)
    } else if (user !== '' && language == '' && org === '') {
        window.open(`https://github.com/search?q=user%3A${user}+${$search.value}`)
    } else {
        window.open(`https://github.com/search?q=${$search.value}`)
    }
}

$search.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searching()
    }
})

document.getElementById('filter-user').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searching()
    }
})

document.getElementById('filter-org').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        searching()
    }
})