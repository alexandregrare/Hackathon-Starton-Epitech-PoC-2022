import './index.css'

interface LoadAnimation extends HTMLDivElement {

}

const LoadAnimation = ({...props}): JSX.Element => {
  return (
    <div className="lds-spinner" {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};

export default LoadAnimation;