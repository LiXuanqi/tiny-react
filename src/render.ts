interface Element {
  type: string,
  props: any
}

function render(element: Element, parentDom: any): void {
  const { type, props } = element;

  // Create Dom element
  const dom: any = isTextElement(type)
    ? document.createTextNode("")
    : document.createElement(type);

  // events
  Object.keys(props).filter(isListener).forEach((name: string) => {
    const eventType: string = name.toLowerCase().substring(2); // "on"
    dom.addEventListener(eventType, props[name]); 
  });

  // attribute
  Object.keys(props).filter(isAttribute).forEach((name: string) => {
    dom[name] = props[name];
  });

  // others
  const childrenElements: Element[] = props.children || [];
  childrenElements.forEach((childrenElement) => {
    render(childrenElement, dom);
  });
  
  parentDom.appendChild(dom);
}

function isTextElement(type: string): boolean {
  return type === "TEXT ELEMENT";
}

function isListener(name: string): boolean {
  return true;
}

function isAttribute(name: string): boolean {
  return true;
}