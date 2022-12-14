import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import MinusIcon from 'mdi-react/MinusIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

export default class AccordionCollapseComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    header: PropTypes.element.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
    className: '',
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
      status: 'closed',
      icon: <PlusIcon />,
    };
  }

  onEntering = () => {
    this.setState({ status: 'opening', icon: <MinusIcon /> });
  };

  onEntered = () => {
    this.setState({ status: 'opened', icon: <MinusIcon /> });
  };

  onExiting = () => {
    this.setState({ status: 'closing', icon: <PlusIcon /> });
  };

  onExited = () => {
    this.setState({ status: 'closed', icon: <PlusIcon /> });
  };

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
    this.props.toggle();
  };

  render() {
    const { className, title, children , header, activeId,selfId} = this.props;
    const { icon,  status } = this.state;
    let collapse = false;

    if(activeId == selfId){
      collapse = true;
    }else{
      collapse = false;
    }

    return (
      <div className={`collapse__wrapper ${status} ${className}`} dir="ltr">
        <button onClick={this.toggle} className="collapse__title" type="button">
          {icon}
          {/*<p>{title}<ChevronDownIcon /></p>*/}
          {
            header
          }
        </button>
        <Collapse
          isOpen={collapse}
          className="collapse__content"
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <div>
            {children}
          </div>
        </Collapse>
      </div>
    );
  }
}
