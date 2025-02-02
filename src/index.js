import Split from 'split-grid'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import htmlLogo from '/html.svg'
import cssLogo from '/css.svg'
import jsLogo from '/js.svg'

document.querySelector('#app').innerHTML = `
  <div class="grid">
          <div id="html" class="editor">
            <img src="${htmlLogo}" alt="html logo">
          </div>
          <div class="gutter-col gutter-col-1"></div>
            <div id="js" class="editor">
              <img src="${jsLogo}" alt="js logo">
            </div>
            <div id="css" class="editor">
              <img src="${cssLogo}" alt="css logo">
            </div>
          <div class="gutter-row gutter-row-1"></div>
          <div>
            <iframe srcdoc="" frameborder="0"></iframe>
          </div>
        </div>
      </div>
`

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

const htmlEditor = monaco.editor.create($html, {
    value: '',
    language: 'html',
    theme: 'vs-dark',
    fontSize: 18,
    minimap: { enabled: false },
    lineNumbers: 'off',
    automaticLayout: true,
    fontFamily: 'Cascadia Code',
    fontLigatures: true,
    cursorBlinking: 'expand',
    cursorSmoothCaretAnimation: 'on',
    fontWeight: 'bold'
})

const cssEditor = monaco.editor.create($css, {
    value: '',
    language: 'css',
    theme: 'vs-dark',
    fontSize: 18,
    minimap: { enabled: false },
    lineNumbers: 'off',
    automaticLayout: true,
    fontFamily: 'Cascadia Code',
    fontLigatures: true,
    cursorBlinking: 'expand',
    cursorSmoothCaretAnimation: 'on',
    fontWeight: 'bold'
})

const jsEditor = monaco.editor.create($js, {
    value: '',
    language: 'javascript',
    theme: 'vs-dark',
    fontSize: 18,
    minimap: { enabled: false },
    lineNumbers: 'off',
    automaticLayout: true,
    fontFamily: 'Cascadia Code',
    fontLigatures: true,
    cursorBlinking: 'expand',
    cursorSmoothCaretAnimation: 'on',
    fontWeight: 'bold'
})

const update = () => {
    const html = createHtml()
    $('iframe').setAttribute('srcdoc', html)
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