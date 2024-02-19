export default function FloatingBox({posX, posY,mouseLeaveProp,text}) {
    return (
        <div id='hoverBox' style={{ left: posX, top: posY}} onMouseLeave={mouseLeaveProp}>
           {text}
        </div>
    )
}
