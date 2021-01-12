// React uses it's own thing for handling events. Since this project only uses
// React for its JSX, it needs to bypass that thing and generate a onclick
// attribute with a string value. This is fine because React passes unknown
// attributes into the generated HTML. However, this probably will never work
// with the Typescript declaration. The hack is to use declaration merging to
// make Typescript happy with the extra property.
// Credit to https://www.eckher.com/c/21g53gqg1g
declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    click?: string;
  }
}
