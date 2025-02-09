window.onerror = (error) => {
    window.parent.postMessage({
        MessageError: error,
        DataDOM: "iframe",
        MessageType: "error"
    }, "*")
}
