// TODO: test or remove

interface NavigationDmProps {
  pathname: string;
}

export class NavigationDm {

  private props: NavigationDmProps;

  constructor (props: NavigationDmProps) {
    this.props = props
  }

  get pathname () {
    return this.props.pathname;
  }
}
