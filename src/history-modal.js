import { filterItem } from "./history-item";
import { Radio } from "./history-radio";

class Modal {
  radio = new Radio(['All', 'Issue', 'PR', 'Code', 'Discussions'])
  data = []
  keyword = ''

  constructor(fetchData) {
    this.fetchData = fetchData
    this.init
  }

  init() {
    this.modal = document.createElement("div");
    this.modal.id = "github-history-modal";
    this.modal.className = 'hide'
    this.modal.innerHTML = `
      <div id='github-history-modal-body'>
        <div id='github-history-header'>
          <input id='github-history-search' type='text' placeholder="type keyword" autofocus>
        </div>
        <ul id='github-history-result'>
          
        </ul>
        <div id='github-history-footer'>
        <span class='results'></span>
        </div>
      </div>
      <div id='github-history-modal-mask'></div>
    `;
  }

  mount() {
    this.init()
    document.body.append(this.modal)
    this.radio.mount(document.getElementById('github-history-footer'))
    document.getElementById('github-history-modal-mask').addEventListener('click', () => this.toggle())
    document.getElementById('github-history-search').addEventListener('input', e => {
      this.keyword = e.target.value
      this.render()
    })
    document.getElementById('github-history-result').addEventListener('click', () => this.toggle())
    this.radio.onClick(() => this.render())
  }

  render() {
    let resultDom = document.getElementById('github-history-result')
    if (!resultDom) {
      this.mount()
      resultDom = document.getElementById('github-history-result')
    }

    const data = filterItem(this.data, { type: this.radio.selectedValue, keyword: this.keyword })

    const footerDom = document.getElementById('github-history-footer')
    document.getElementById('github-history-search').focus()

    resultDom.innerHTML = data.reduce((acc, cur) =>
      acc + `<a class='github-history-link' href=${cur.url}><li>
      <img src='https://github.githubassets.com/favicons/favicon.png' >
      <span class='title'>${cur.title}</span>
      </li></a>`
      , '');
    footerDom.childNodes[1].innerHTML = `
    <span>Search ${this.keyword && `'${this.keyword}'`}</span>
    <span>Results: </span>
    <span>${data.length}</span>
    `
  }

  toggle() {
    if (this.modal.className.indexOf('hide') > -1) {
      this.fetchData().then(data => {
        this.data = data
        this.modal.className = 'show'
        this.render()
      })
    } else {
      this.clear()
      this.modal.className = 'hide'
    }
  }

  contains(node) {
    return this.modal.contains(node)
  }

  visible() {
    return this.modal.className.indexOf('show') > -1
  }

  clear() {
    this.keyword = ''
    document.getElementById('github-history-search').value = ''
    this.radio.change('All')
  }
}

export { Modal };
