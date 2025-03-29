import Split from 'split-grid'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import '@fontsource/cascadia-code'


window.MonacoEnvironment = {
    getWorker: (_, label) => {
        if (label === 'html') return new HtmlWorker()
        if (label === 'javascript') return new JsWorker()
        if (label === 'css') return new CssWorker()
    }
}


const $ = selector => document.querySelector(selector)

Split({
    columnGutters: [{
        track: 1,
        element: $('.gutter-col-1'),
    }],
    rowGutters: [{
        track: 1,
        element: $('.gutter-row-1'),
    }]
})

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

let $theme = 'vs-dark'
let $font_size = 18
let $font_ligatures = true
let $minimap = false
let $cursor_blinking = 'blink'
let $line_numbers = false

if (localStorage.getItem('theme') !== null) {
    $theme = localStorage.getItem('theme')
} else {
    localStorage.setItem('theme', 'vs-dark')
}

if (localStorage.getItem('font-size') !== null) {
    $font_size = localStorage.getItem('font-size')
} else {
    localStorage.setItem('font-size', 18)
}

if (localStorage.getItem('font-ligatures') !== null) {
    $font_ligatures = localStorage.getItem('font-ligatures')
} else {
    localStorage.setItem('font-ligatures', true)
}

if (localStorage.getItem('minimap') !== null) {
    $minimap = localStorage.getItem('minimap')
} else {
    localStorage.setItem('minimap', false)
}

if (localStorage.getItem('cursor-blinking') !== null) {
    $cursor_blinking = localStorage.getItem('cursor-blinking')
} else {
    localStorage.setItem('cursor-blinking', 'blink')
}

if (localStorage.getItem('line-numbers') !== null) {
    $line_numbers = localStorage.getItem('line-numbers')
} else {
    localStorage.setItem('line-numbers', false)
}

const htmlEditor = monaco.editor.create($html, {
    value: '',
    language: 'html',
    theme: $theme,
    fontSize: $font_size,
    lineNumbers: $line_numbers,
    minimap: { enabled: $minimap },
    fontFamily: 'Cascadia Code',
    fontLigatures: $font_ligatures,
    cursorBlinking: $cursor_blinking,
    cursorSmoothCaretAnimation: 'on'
})

const cssEditor = monaco.editor.create($css, {
    value: '',
    language: 'css',
    theme: $theme,
    fontSize: $font_size,
    lineNumbers: $line_numbers,
    minimap: { enabled: $minimap },
    fontFamily: 'Cascadia Code',
    fontLigatures: true,
    cursorBlinking: $cursor_blinking,
    cursorSmoothCaretAnimation: 'on'
})

const jsEditor = monaco.editor.create($js, {
    value: '',
    language: 'javascript',
    theme: $theme,
    fontSize: $font_size,
    lineNumbers: $line_numbers,
    minimap: { enabled: $minimap },
    fontFamily: 'Cascadia Code',
    fontLigatures: true,
    cursorBlinking: $cursor_blinking,
    cursorSmoothCaretAnimation: 'on'
})

document.querySelector(`#${$theme}`).setAttribute('selected', true)
document.querySelector('#font-size').value = $font_size
document.querySelector(`#font-ligatures-${$font_ligatures}`).setAttribute('selected', true)
document.querySelector(`#${$cursor_blinking}`).setAttribute('selected', true)
document.querySelector(`#line-numbers-${$line_numbers}`).setAttribute('selected', true)

const update = () => {
    const html = createHtml()
    $('iframe').setAttribute('srcdoc', html)
    for (const children of document.querySelector('.console').children) {
        if (children.tagName !== 'H2' && children.tagName !== 'P') {
            children.remove()
        }
    }
}

const createHtml = () => {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
   <style>
      ${css}
   </style>
  </head>
  <body>
  <script>
    window.onerror = (error) => {
    window.parent.postMessage({
        MessageError: error,
        DataDOM: "iframe",
        MessageType: "error"
    }, "*")
}
  </script>
  ${html}
  <script>
  ${js}
  </script>
  </body>
</html>
  `
}

htmlEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)

const updateSettings = () => {
    const theme = document.getElementById('theme').value
    const font_size = document.getElementById('font-size').value
    const cursor_blinking = document.getElementById('cursor-blinking').value
    let line_numbers = document.getElementById('line-numbers').value
    if (line_numbers === 'true') {
        line_numbers = true
    } else {
        line_numbers = false
    }
    let minimap = document.getElementById('minimap').value
    if (minimap === 'true') {
        minimap = true
    } else {
        minimap = false
    }
    let font_ligatures = document.getElementById('font-ligatures').value
    if (font_ligatures === 'true') {
        font_ligatures = true
    } else {
        font_ligatures = false
    }
    htmlEditor.updateOptions({
        theme: theme,
        fontSize: font_size,
        cursorBlinking: cursor_blinking,
        lineNumbers: line_numbers,
        minimap: { enabled: minimap },
        fontLigatures: font_ligatures
    })
    cssEditor.updateOptions({
        theme: theme,
        fontSize: font_size,
        cursorBlinking: cursor_blinking,
        lineNumbers: line_numbers,
        minimap: { enabled: minimap },
        fontLigatures: font_ligatures
    })
    jsEditor.updateOptions({
        theme: theme,
        fontSize: font_size,
        cursorBlinking: cursor_blinking,
        lineNumbers: line_numbers,
        minimap: { enabled: minimap },
        fontLigatures: font_ligatures
    })
    localStorage.setItem('theme', theme)
    localStorage.setItem('font-size', font_size)
    localStorage.setItem('font-ligatures', font_ligatures)
    localStorage.setItem('cursor-blinking', cursor_blinking)
    localStorage.setItem('line-numbers', line_numbers)
    localStorage.setItem('minimap', minimap)
}

$('#theme').addEventListener('change', () => {
    updateSettings()
})

$('#font-size').addEventListener('change', () => {
    updateSettings()
})

$('#cursor-blinking').addEventListener('change', () => {
    updateSettings()
})

$('#line-numbers').addEventListener('change', () => {
    updateSettings()
})

$('#minimap').addEventListener('change', () => {
    updateSettings()
})

$('#font-ligatures').addEventListener('change', () => {
    updateSettings()
})
