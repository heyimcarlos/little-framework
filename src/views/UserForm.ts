export class UserForm {
  constructor(public parent: Element) {}

  public eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseover:h1': this.onHeaderHover,
    };
  }

  public bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const event in eventsMap) {
      const [eventName, selector] = event.split(':');

      fragment.querySelectorAll(selector).forEach((element: Element): void => {
        element.addEventListener(eventName, eventsMap[event]);
      });
    }
  }

  public onHeaderHover(): void {
    console.log('h1 was hovered');
  }

  public onButtonClick(): void {
    console.log('Button clicked');
  }

  template(): string {
    return `
    <div>
      <h1>User Form</h1>
      <input />
      <button>Click me</button>
    </div>`;
  }

  render(): void {
    const templateEle = document.createElement('template');
    templateEle.innerHTML = this.template();
    this.bindEvents(templateEle.content);
    this.parent.append(templateEle.content);
  }
}
