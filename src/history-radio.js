export class Radio {
  container = document.createElement('ul')
  values = []
  selectedValue = undefined

  constructor(values) {
    this.values = values
    this.selectedValue = values[0]
    this.container.id = 'github-history-radio'
  }

  render() {
    this.container.innerHTML = this.values.reduce((acc, cur) => acc + `
    <li class='${this.selectedValue === cur && 'selected'}'>${cur}</li>
    `, '')

    return this.container.outerHTML
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
}