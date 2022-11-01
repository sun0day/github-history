export class Radio {

  values = []
  selectedValue = undefined

  constructor(values) {
    this.values = values
    this.selectedValue = values[0]
  }

  init() {
    this.container = document.createElement('ul')
    this.container.id = 'github-history-radio'
  }

  mount(parent) {
    this.init()
    this.render()
    parent.appendChild(this.container)
  }

  render() {
    this.container.innerHTML = this.values.reduce((acc, cur) => acc + `
    <li class='${this.selectedValue === cur && 'selected'}'>${cur}</li>
    `, '')
  }

  onClick(cb) {
    const dom = document.getElementById(this.container.id)

    dom.addEventListener('click', e => {
      if (this.values.includes(e.target.innerHTML)) {
        Array.from(dom.getElementsByTagName('li')).forEach(node => {
          node.className = ''
        })
        this.selectedValue = e.target.innerHTML
        e.target.className = 'selected'
        cb && cb(this.selectedValue)
      }
      e.preventDefault()
    }, false)
  }

  change(value) {
    this.selectedValue = value
    this.render()
  }
}