const search = document.getElementById('pack-search')

search.addEventListener('change', () => {
    fetch(`https://api.skypack.dev/v1?q=${search.value}`)
        .then(res => {
            res.json()
        })
        .then(response => {
            console.log(response)
        })
})