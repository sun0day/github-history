class Modal {
  modal = document.createElement("div");

  constructor(onShow) {
    this.onShow = onShow
    this.modal.id = "github-history-modal";
    this.modal.className = 'hide'
    this.modal.innerHTML = `
      <div id='github-history-modal-body'>
      aaaaaa
      </div>
      <div id='github-history-modal-mask'></div>
    `;
  }

  mount() {
    document.body.append(this.modal)
    document.getElementById('github-history-modal-mask').addEventListener('click', () => this.toggle())
  }

  toggle() {
    if (this.modal.className.indexOf('hide') > -1) {
      this.onShow().then(() => {
        this.modal.className = 'show'
      })
    } else {
      this.modal.className = 'hide'
    }
  }

  contains(node) {
    return this.modal.contains(node)
  }

  visible() {
    return this.modal.className.indexOf('show') > -1
  }
}

export { Modal };
