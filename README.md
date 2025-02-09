<style>
    body {
        font-family: 'Cascadia Code'
    }

    .btn {
        background-color: transparent;
        border: 2.5px solid black;
        color: white;
        font-family: 'Cascadia Code';
        width: 20vw;
        height: 6vw;
        font-size: 2.5ch;
        border-radius: 5px;
        cursor: pointer;
    }

    @keyframes hoverBtn {
        from {
            background-color: transparent;
            border: 2.5px solid black;
        }
        to {
            background-color: black;
            border: 2.5px solid black;
        }
    }

    .btn:hover {
        animation: 1s hoverBtn;
        animation-fill-mode: forwards;
    }
    @keyframes notHoverBtn {
        to {
            background-color: transparent;
            border: 2.5px solid black;
        }
        from {
            background-color: black;
            border: 2.5px solid black;
        }
    }

    .btn:not(:hover) {
        animation: .5s notHoverBtn;
        animation-fill-mode: forwards;
    }
</style>



<img src="public/icon.svg" style="width: 20vw; height: auto;">

# SamPlay

<button class="btn btn-primary">🌐 Web</button>

Summary:

1. [What's Samplay?](#whats-samplay)
2. [How to contribute](#how-to-contribute)

### What's SamPlay?
SamPlay is an __Open Source__ code playground for javaScript, html and css.

### How to contribute?

As SamPlay is an open source project, it's open to help. If you want to contribute and help improving the project, follow these steps:

1. Fork the project to your GitHub account
2. Open a pull request
3. Regardless of wether your request is acepted or not, you're contributing to the project ✊

